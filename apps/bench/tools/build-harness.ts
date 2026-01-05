import { mkdir } from "node:fs/promises"
import { build } from "esbuild"
import { solidPlugin } from "esbuild-plugin-solid"

const component = process.env.COMPONENT ?? process.argv[2]
if (!component) {
  console.error(
    "Usage: COMPONENT=<name> bun tools/build-harness.ts | bun tools/build-harness.ts <component>",
  )
  process.exit(1)
}

// Ensure per-component harness sources exist
const harnessSrcDir = new URL(`../harness/${component}/`, import.meta.url)
await mkdir(harnessSrcDir, { recursive: true })

const ssrPath = new URL("ssr.tsx", harnessSrcDir)
const domPath = new URL("dom.tsx", harnessSrcDir)

async function ensureExists(url: URL) {
  try {
    const { access } = await import("node:fs/promises")
    await access(url)
  } catch {
    console.error("Harness source missing:", url.pathname)
    console.error("Please provide per-organ harness at:")
    console.error(" - apps/bench/harness/", component, "/ssr.tsx")
    console.error(" - apps/bench/harness/", component, "/dom.tsx")
    process.exit(1)
  }
}

await ensureExists(ssrPath)
await ensureExists(domPath)

const outdirSsr = new URL(`../.cache/${component}/harness/`, import.meta.url)
await mkdir(outdirSsr, { recursive: true })

await build({
  entryPoints: [ssrPath.pathname],
  outdir: outdirSsr.pathname,
  format: "esm",
  bundle: true,
  platform: "node",
  target: ["node18"],
  jsx: "automatic",
  jsxImportSource: "solid-js",
  plugins: [
    solidPlugin({
      solid: { generate: "ssr" },
    }),
  ],
})

// Build DOM hydration harness per component
const outdirHydrate = new URL(`../.cache/${component}/hydrate/`, import.meta.url)
await mkdir(outdirHydrate, { recursive: true })

await build({
  entryPoints: [domPath.pathname],
  outdir: outdirHydrate.pathname,
  format: "esm",
  bundle: true,
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  jsxImportSource: "solid-js",
  plugins: [
    solidPlugin({
      solid: { generate: "dom" },
    }),
  ],
})

console.log("Harness built to", outdirSsr.pathname, "and", outdirHydrate.pathname)
