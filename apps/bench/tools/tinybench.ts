// Minimal tinybench helper to run and persist results

import type { Bench } from "tinybench"
import { writeReport } from "./report.js"

type SaveOptions = {
  component: string
  format: string
  perma?: boolean
}

export async function runAndSave(name: string, bench: Bench, opts?: SaveOptions) {
  await bench.run()
  const summary = {
    name,
    date: new Date().toISOString(),
    tasks: bench.tasks.map((t) => ({
      name: t.name,
      hz: t.result?.hz,
      mean: t.result?.mean,
      min: t.result?.min,
      max: t.result?.max,
      samples: t.result?.samples?.length,
    })),
  }
  if (opts?.component && opts?.format) {
    await writeReport(
      { component: opts.component, name, format: opts.format, perma: opts.perma },
      `${name}.json`,
      summary,
    )
  } else {
    const path = new URL(`../report/json/${name}.json`, import.meta.url)
    const { mkdir, writeFile } = await import("node:fs/promises")
    await mkdir(new URL("../report/json/", import.meta.url), { recursive: true })
    await writeFile(path, JSON.stringify(summary, null, 2))
  }
  // Also log concise output
  console.table(summary.tasks, ["name", "hz", "mean", "min", "max"])
}
