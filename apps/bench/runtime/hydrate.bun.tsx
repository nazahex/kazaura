import { Window } from "happy-dom"
import { generateHydrationScript } from "solid-js/web"
import { writeReport } from "../tools/report.js"

const component = process.argv[2]
if (!component) {
  console.error("Usage: bun runtime/hydrate.bun.tsx <component>")
  process.exit(1)
}

const { renderStatic, renderSections } = await import(`../.cache/${component}/harness/ssr.js`)
const { hydrateStatic, hydrateSections } = await import(`../.cache/${component}/hydrate/dom.js`)

const win = new Window()
// @ts-expect-error assign globals for hydration
globalThis.window = win
// @ts-expect-error assign globals for hydration
globalThis.document = win.document
// @ts-expect-error assign globals for hydration
globalThis.navigator = win.navigator
// @ts-expect-error assign globals for hydration
globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
  setTimeout(() => cb(performance.now()), 16)

// Initialize Solid hydration globals
const hydrationTag = generateHydrationScript()
const startScript = hydrationTag.indexOf("<script")
const startJs = hydrationTag.indexOf(">", startScript) + 1
const endJs = hydrationTag.lastIndexOf("</script>")
const hydrationJs = hydrationTag.slice(startJs, endJs)
// @ts-expect-error initialize hydration global
globalThis._$HY = globalThis._$HY || {}
// biome-ignore lint/security/noGlobalEval: only used for benchmarking
eval(hydrationJs)

function setupContainer(html: string): HTMLElement {
  const container = document.createElement("div")
  container.innerHTML = html
  document.body.appendChild(container)
  return container
}
function teardownContainer(container: HTMLElement) {
  document.body.removeChild(container)
}

function measure(fn: () => void) {
  const start = performance.now()
  fn()
  return performance.now() - start
}

const N = 50
const results = { static: [] as number[], s5: [] as number[], s20: [] as number[] }

for (let i = 0; i < N; i++) {
  const c = setupContainer(renderStatic())
  results.static.push(
    measure(() => {
      hydrateStatic(c)
    }),
  )
  teardownContainer(c)
}
for (let i = 0; i < N; i++) {
  const c = setupContainer(renderSections(5))
  results.s5.push(
    measure(() => {
      hydrateSections(c, 5)
    }),
  )
  teardownContainer(c)
}
for (let i = 0; i < N; i++) {
  const c = setupContainer(renderSections(20))
  results.s20.push(
    measure(() => {
      hydrateSections(c, 20)
    }),
  )
  teardownContainer(c)
}

function summarize(arr: number[]) {
  const total = arr.reduce((a, b) => a + b, 0)
  const mean = total / arr.length
  const min = Math.min(...arr)
  const max = Math.max(...arr)
  return { samples: arr.length, mean, min, max }
}

const report = {
  N,
  static: summarize(results.static),
  s5: summarize(results.s5),
  s20: summarize(results.s20),
}
console.log(JSON.stringify(report, null, 2))
await writeReport(
  { component, name: "hydrate.runtime", format: "hydrate" },
  "hydrate.runtime.json",
  report,
)
