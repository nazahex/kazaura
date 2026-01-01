import { execSync } from "node:child_process"
import { mkdir, writeFile } from "node:fs/promises"

export type ReportTarget = {
  component: string
  name: string
  format: string
  perma?: boolean
}

function nowStamp() {
  const d = new Date()
  // YYYYMMDD-HHMMSS
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
}

function commitShort() {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim()
  } catch {
    return "unknown"
  }
}

export function makeReportUrl(target: ReportTarget) {
  const base = new URL(`../report/${target.component}/`, import.meta.url)
  const dir = target.perma
    ? new URL(`${commitShort()}/${target.format}/`, base)
    : new URL(`.temp/${target.format}/${nowStamp()}/`, base)
  return dir
}

export async function writeReport(target: ReportTarget, file: string, content: unknown) {
  const dir = makeReportUrl(target)
  await mkdir(dir, { recursive: true })
  await writeFile(new URL(file, dir), JSON.stringify(content, null, 2))
  return new URL(file, dir).pathname
}
