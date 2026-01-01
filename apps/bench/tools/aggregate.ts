import { execSync } from "node:child_process"
import { readFile, readFile as readFsFile } from "node:fs/promises"
import os from "node:os"
import { gzipSync } from "node:zlib"
import { build } from "esbuild"
import { solidPlugin } from "esbuild-plugin-solid"
import { Window } from "happy-dom"
import { generateHydrationScript } from "solid-js/web"
import { Bench } from "tinybench"
import { writeReport } from "./report.js"

const component = process.argv[2]
const perma = process.argv.includes("--perma")
if (!component) {
  console.error("Usage: bun tools/aggregate.ts <component> [--perma]")
  process.exit(1)
}

function buildHarness() {
  const scriptPath = new URL("./build-harness.ts", import.meta.url).pathname
  const res = execSync(`bun ${scriptPath} ${component}`, { stdio: "pipe" })
  return res.toString().trim()
}

// Build harness first
buildHarness()

// Import SSR harness functions
const { renderStatic, renderSections } = await import(`../.cache/${component}/harness/ssr.js`)
// Import DOM hydration harness lazily later (after DOM shim)

// Micro render via tinybench
const micro = new Bench({ time: 100 })
micro.add("render static", () => {
  renderStatic()
})
micro.add("render 5 sections", () => {
  renderSections(5)
})
micro.add("render 20 sections", () => {
  renderSections(20)
})
await micro.run()
const microSummary = micro.tasks.map((t) => ({
  name: t.name,
  hz: t.result?.hz,
  mean: t.result?.mean,
  min: t.result?.min,
  max: t.result?.max,
  samples: t.result?.samples?.length,
}))

// Stress render
const stress = new Bench({ time: 1000 })
stress.add("sections 1k", () => {
  const html = renderSections(1000)
  if (!html || html.length === 0) throw new Error("empty")
})
stress.add("sections 10k", () => {
  const html = renderSections(10000)
  if (!html || html.length === 0) throw new Error("empty")
})
await stress.run()
const stressSummary = stress.tasks.map((t) => ({
  name: t.name,
  hz: t.result?.hz,
  mean: t.result?.mean,
  min: t.result?.min,
  max: t.result?.max,
  samples: t.result?.samples?.length,
}))

// SSR runtime
const N = 100
let totalBytes = 0
const startSsr = performance.now()
for (let i = 0; i < N; i++) totalBytes += renderStatic().length
const durSsr = performance.now() - startSsr
const ssrRuntime = { renders: N, totalBytes, ms: durSsr, avgMs: durSsr / N }

// Hydration runtime
const win = new Window()
// @ts-expect-error globals
globalThis.window = win
// @ts-expect-error globals
globalThis.document = win.document
// @ts-expect-error globals
globalThis.navigator = win.navigator
// @ts-expect-error globals
globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
  setTimeout(() => cb(performance.now()), 16)

const hydrationTag = generateHydrationScript()
const startScript = hydrationTag.indexOf("<script")
const startJs = hydrationTag.indexOf(">", startScript) + 1
const endJs = hydrationTag.lastIndexOf("</script>")
const hydrationJs = hydrationTag.slice(startJs, endJs)
// @ts-expect-error HY
globalThis._$HY = globalThis._$HY || {}
// biome-ignore lint/security/noGlobalEval: benchmark only
eval(hydrationJs)

const { hydrateStatic, hydrateSections } = await import(`../.cache/${component}/hydrate/dom.js`)

function setupContainer(html: string): HTMLElement {
  const c = document.createElement("div")
  c.innerHTML = html
  document.body.appendChild(c)
  return c
}
function teardownContainer(c: HTMLElement) {
  document.body.removeChild(c)
}
function measure(fn: () => void) {
  const s = performance.now()
  fn()
  return performance.now() - s
}

const M = 50
const hydStatic: number[] = []
const hyd5: number[] = []
const hyd20: number[] = []
for (let i = 0; i < M; i++) {
  const c = setupContainer(renderStatic())
  hydStatic.push(
    measure(() => {
      hydrateStatic(c)
    }),
  )
  teardownContainer(c)
}
for (let i = 0; i < M; i++) {
  const c = setupContainer(renderSections(5))
  hyd5.push(
    measure(() => {
      hydrateSections(c, 5)
    }),
  )
  teardownContainer(c)
}
for (let i = 0; i < M; i++) {
  const c = setupContainer(renderSections(20))
  hyd20.push(
    measure(() => {
      hydrateSections(c, 20)
    }),
  )
  teardownContainer(c)
}

function summarize(arr: number[]) {
  const total = arr.reduce((a, b) => a + b, 0)
  const mean = total / arr.length
  return { samples: arr.length, mean, min: Math.min(...arr), max: Math.max(...arr) }
}
const hydrateRuntime = {
  N: M,
  static: summarize(hydStatic),
  s5: summarize(hyd5),
  s20: summarize(hyd20),
}

// Memory SSR
type Mem = ReturnType<typeof process.memoryUsage>
const mem = () => process.memoryUsage()
const delta = (a: Mem, b: Mem) => ({
  rss: b.rss - a.rss,
  heapTotal: b.heapTotal - a.heapTotal,
  heapUsed: b.heapUsed - a.heapUsed,
  external: b.external ?? 0 - (a.external ?? 0),
  arrayBuffers: b.arrayBuffers ?? 0 - (a.arrayBuffers ?? 0),
})
const baselineSsr = mem()
for (let i = 0; i < 10; i++) renderStatic()
const ssrCases = [
  { name: "static", run: () => renderStatic() },
  { name: "sections:100", run: () => renderSections(100) },
  { name: "sections:500", run: () => renderSections(500) },
  { name: "sections:1000", run: () => renderSections(1000) },
]
const memorySsr = [] as Array<{
  name: string
  bytes: number
  before: Mem
  after: Mem
  delta: ReturnType<typeof delta>
}>
for (const c of ssrCases) {
  const before = mem()
  const html = c.run()
  const bytes = Buffer.byteLength(html)
  const after = mem()
  memorySsr.push({ name: c.name, bytes, before, after, delta: delta(before, after) })
}

// Memory Hydration
const baselineHyd = mem()
const hydCases = [
  { name: "static", html: () => renderStatic(), run: (c: HTMLElement) => hydrateStatic(c) },
  {
    name: "sections:5",
    html: () => renderSections(5),
    run: (c: HTMLElement) => hydrateSections(c, 5),
  },
  {
    name: "sections:20",
    html: () => renderSections(20),
    run: (c: HTMLElement) => hydrateSections(c, 20),
  },
]
const memoryHyd = [] as Array<{
  name: string
  bytes: number
  before: Mem
  after: Mem
  delta: ReturnType<typeof delta>
}>
for (const c of hydCases) {
  const html = c.html()
  const container = setupContainer(html)
  const before = mem()
  c.run(container)
  const after = mem()
  const bytes = Buffer.byteLength(html)
  memoryHyd.push({ name: c.name, bytes, before, after, delta: delta(before, after) })
  teardownContainer(container)
}

// Size tracking (DOM target)
const outdir = new URL("../.cache/size/", import.meta.url)
await build({
  entryPoints: [
    new URL(`../../../packages/components/${component}/solid/src/index.ts`, import.meta.url)
      .pathname,
  ],
  outfile: new URL("component-dom.js", outdir).pathname,
  format: "esm",
  bundle: true,
  minify: true,
  platform: "browser",
  jsx: "automatic",
  jsxImportSource: "solid-js",
  plugins: [solidPlugin({ solid: { generate: "dom" } })],
})
const file = await readFile(new URL("component-dom.js", outdir))
const size = {
  artifact: "component-dom.js",
  bytes: file.byteLength,
  gzBytes: gzipSync(file).byteLength,
}

// Environment metadata
function getGitShort() {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: "pipe" }).toString().trim()
  } catch {
    return null
  }
}

async function getPkgVersions() {
  try {
    const pkg = JSON.parse(
      await readFsFile(new URL("../../../package.json", import.meta.url), "utf8"),
    ) as { devDependencies?: Record<string, string>; dependencies?: Record<string, string> }
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    return {
      "solid-js": deps["solid-js"],
      "@lokat/solid": deps["@lokat/solid"],
      tinybench: deps.tinybench,
      "happy-dom": deps["happy-dom"],
      esbuild: deps.esbuild,
      "esbuild-plugin-solid": deps["esbuild-plugin-solid"],
    }
  } catch {
    return {}
  }
}

const environment = {
  os: {
    platform: os.platform(),
    type: os.type(),
    release: os.release(),
    arch: os.arch(),
  },
  cpu: (() => {
    const cpus = os.cpus() ?? []
    const sample = cpus[0]
    return {
      cores: cpus.length,
      model: sample?.model,
      speedMHz: sample?.speed,
    }
  })(),
  memory: {
    totalBytes: os.totalmem(),
    freeBytes: os.freemem(),
  },
  runtime: {
    bun: typeof Bun !== "undefined" ? Bun.version : undefined,
    node: process.versions.node,
    v8: process.versions.v8,
  },
  env: {
    CI: process.env.CI ?? undefined,
    LANG: process.env.LANG ?? undefined,
    LC_ALL: process.env.LC_ALL ?? undefined,
    TZ: process.env.TZ ?? undefined,
  },
  git: {
    commitShort: getGitShort(),
  },
  packages: await getPkgVersions(),
}

// Aggregate report
const aggregate = {
  component,
  date: new Date().toISOString(),
  environment,
  micro: microSummary,
  stress: stressSummary,
  ssrRuntime,
  hydrateRuntime,
  memory: {
    ssr: { baseline: baselineSsr, results: memorySsr },
    hydrate: { baseline: baselineHyd, results: memoryHyd },
  },
  size,
}

const path = await writeReport(
  { component, name: "consolidated", format: "aggregate", perma },
  "benchmark_report.json",
  aggregate,
)
console.log("Comprehensive benchmark results written:", path)
