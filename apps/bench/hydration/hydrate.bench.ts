import { Window } from "happy-dom"
import { Bench } from "tinybench"
import { runAndSave } from "../tools/tinybench.js"

const component = process.argv[2]
const perma = process.argv.includes("--perma")
if (!component) {
  console.error("Usage: bun hydration/hydrate.bench.ts <component>")
  process.exit(1)
}

const { renderSections, renderStatic } = await import(`../.cache/${component}/harness/ssr.js`)

// Initialize a DOM-like environment BEFORE importing the hydration harness
const win = new Window()
// @ts-expect-error assign globals for hydration
globalThis.window = win
// @ts-expect-error assign globals for hydration
globalThis.document = win.document
// @ts-expect-error assign globals for hydration
globalThis.navigator = win.navigator
// Provide simple raf fallback
// @ts-expect-error assign globals for hydration
globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
  setTimeout(() => cb(performance.now()), 16)

// Dynamically import the hydration harness after globals are set
const { hydrateStatic, hydrateSections } = await import(`../.cache/${component}/hydrate/dom.js`)

function setupContainer(html: string): HTMLElement {
  const container = document.createElement("div")
  container.innerHTML = html
  document.body.appendChild(container)
  return container
}

function teardownContainer(container: HTMLElement, dispose?: () => void) {
  try {
    dispose?.()
  } catch {}
  document.body.removeChild(container)
}

const bench = new Bench({ time: 1000 })

bench.add("hydrate static", () => {
  const container = setupContainer(renderStatic())
  const dispose = hydrateStatic(container)
  teardownContainer(container, dispose)
})

bench.add("hydrate 5 sections", () => {
  const container = setupContainer(renderSections(5))
  const dispose = hydrateSections(container, 5)
  teardownContainer(container, dispose)
})

bench.add("hydrate 20 sections", () => {
  const container = setupContainer(renderSections(20))
  const dispose = hydrateSections(container, 20)
  teardownContainer(container, dispose)
})

await runAndSave("hydrate", bench, { component, format: "hydrate", perma })
