import { mkdir, readFile, writeFile } from "node:fs/promises"
import { gzipSync } from "node:zlib"
import { build } from "esbuild"
import { solidPlugin } from "esbuild-plugin-solid"

const outdir = new URL("../.cache/size/", import.meta.url)
await mkdir(outdir, { recursive: true })

const component = process.argv[2]
if (!component) {
  console.error("Usage: bun size/size.esbuild.ts <component>")
  process.exit(1)
}

// Build DOM-target bundle for component to approximate client size
await build({
  entryPoints: [
    new URL(`../../../packages/components/${component}/solid/src/index.ts`, import.meta.url)
      .pathname,
  ],
  outfile: new URL("component-dom.js", outdir).pathname,
  format: "esm",
  platform: "browser",
  target: ["es2022"],
  bundle: true,
  sourcemap: "external",
  jsx: "automatic",
  jsxImportSource: "solid-js",
  treeShaking: true,
  minify: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  minifyWhitespace: true,
  plugins: [solidPlugin({ solid: { generate: "dom" } })],
})

const file = await readFile(new URL("component-dom.js", outdir))
const bytes = file.byteLength
const gzBytes = gzipSync(file).byteLength

const report = {
  artifact: "component-dom.js",
  bytes,
  gzBytes,
}

const reportDir = new URL(
  `../report/${component}/.temp/size/${new Date().toISOString().replace(/[:.]/g, "-")}/`,
  import.meta.url,
)
await mkdir(reportDir, { recursive: true })
await writeFile(new URL("size.json", reportDir), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
