import { writeReport } from "../tools/report.js"

const component = process.argv[2]
if (!component) {
  console.error("Usage: bun memory/ssr.memory.tsx <component>")
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

const baseline = mem()

// Warm-up
for (let i = 0; i < 10; i++) renderStatic()

const cases = [
  { name: "static", run: () => renderStatic() },
  { name: "sections:100", run: () => renderSections(100) },
  { name: "sections:500", run: () => renderSections(500) },
  { name: "sections:1000", run: () => renderSections(1000) },
]

const results: Array<{
  name: string
  bytes: number
  before: Mem
  after: Mem
  delta: ReturnType<typeof delta>
}> = []

for (const c of cases) {
  const before = mem()
  const html = c.run()
  const bytes = Buffer.byteLength(html)
  const after = mem()
  results.push({ name: c.name, bytes, before, after, delta: delta(before, after) })
}

const report = {
  baseline,
  results,
}

console.log(JSON.stringify(report, null, 2))

await writeReport(
  { component, name: "memory.ssr", format: "memory", perma },
  "memory.ssr.json",
  report,
)
