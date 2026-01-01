import { Window } from "happy-dom"
import { generateHydrationScript } from "solid-js/web"
import { writeReport } from "../tools/report.js"

const component = process.argv[2]
if (!component) {
  console.error("Usage: bun memory/hydrate.memory.tsx <component>")
  process.exit(1)
}

const { renderSections, renderStatic } = await import(`../.cache/${component}/harness/ssr.js`)
const perma = process.argv.includes("--perma")

type Mem = ReturnType<typeof process.memoryUsage>

function mem(): Mem {
  return process.memoryUsage()
}
function delta(a: Mem, b: Mem) {
  return {
    rss: b.rss - a.rss,
    heapTotal: b.heapTotal - a.heapTotal,
    heapUsed: b.heapUsed - a.heapUsed,
    external: b.external ?? 0 - (a.external ?? 0),
    arrayBuffers: b.arrayBuffers ?? 0 - (a.arrayBuffers ?? 0),
  }
}

// Setup DOM-like env
const win = new Window()
// @ts-expect-error globals for hydration
globalThis.window = win
// @ts-expect-error globals for hydration
globalThis.document = win.document
// @ts-expect-error globals for hydration
globalThis.navigator = win.navigator
// @ts-expect-error globals for hydration
globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
  setTimeout(() => cb(performance.now()), 16)

// Initialize Solid hydration globals
const hydrationTag = generateHydrationScript()
const startScript = hydrationTag.indexOf("<script")
const startJs = hydrationTag.indexOf(">", startScript) + 1
const endJs = hydrationTag.lastIndexOf("</script>")
const hydrationJs = hydrationTag.slice(startJs, endJs)
// @ts-expect-error init
globalThis._$HY = globalThis._$HY || {}
// biome-ignore lint/security/noGlobalEval: only used for benchmarking
eval(hydrationJs)

const { hydrateStatic, hydrateSections } = await import(`../.cache/${component}/hydrate/dom.js`)

function setupContainer(html: string): HTMLElement {
  const container = document.createElement("div")
  container.innerHTML = html
  document.body.appendChild(container)
  return container
}
function teardownContainer(container: HTMLElement) {
  document.body.removeChild(container)
}

const baseline = mem()

const cases = [
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

const results: Array<{
  name: string
  bytes: number
  before: Mem
  after: Mem
  delta: ReturnType<typeof delta>
}> = []

for (const c of cases) {
  const html = c.html()
  const container = setupContainer(html)
  const before = mem()
  c.run(container)
  const after = mem()
  const bytes = Buffer.byteLength(html)
  results.push({ name: c.name, bytes, before, after, delta: delta(before, after) })
  teardownContainer(container)
}

const report = { baseline, results }
console.log(JSON.stringify(report, null, 2))

await writeReport(
  { component, name: "memory.hydrate", format: "memory", perma },
  "memory.hydrate.json",
  report,
)
