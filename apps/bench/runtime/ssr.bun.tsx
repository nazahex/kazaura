import { writeReport } from "../tools/report.js"

const component = process.argv[2]
if (!component) {
  console.error("Usage: bun runtime/ssr.bun.tsx <component>")
  process.exit(1)
}

const { renderStatic } = await import(`../.cache/${component}/harness/ssr.js`)
const perma = process.argv.includes("--perma")

function once() {
  const html = renderStatic()
  return html.length
}

const N = 100
const start = performance.now()
let total = 0
for (let i = 0; i < N; i++) total += once()
const dur = performance.now() - start

const report = { renders: N, totalBytes: total, ms: dur, avgMs: dur / N }
console.log(JSON.stringify(report, null, 2))

await writeReport({ component, name: "ssr", format: "ssr", perma }, "ssr.json", report)
