import { readFile } from "node:fs/promises"
import path from "node:path"
import { gzipSync } from "node:zlib"
import { build } from "esbuild"
import { solidPlugin } from "esbuild-plugin-solid"

async function main() {
  const args = process.argv.slice(2)
  const get = (flag) => {
    const i = args.indexOf(flag)
    return i >= 0 ? args[i + 1] : undefined
  }
  const dir = get("--dir") || args[0]
  if (!dir) {
    console.error("Usage: node scripts/build.mjs --dir <component-dir>")
    process.exit(1)
  }
  const absDir = path.resolve(dir)
  const entry = path.join(absDir, "src", "index.ts")
  const outfile = path.join(absDir, "dist", "index.js")
  await build({
    entryPoints: [entry],
    outfile,
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
    external: ["solid-js", "@lokat/solid", "lucide-solid"],
  })
  console.log("esbuild: dist/index.js written")
  try {
    const data = await readFile(outfile)
    const bytes = data.byteLength ?? data.length
    const gz = gzipSync(data)
    console.log(`artifact: ${outfile}`)
    console.log(`bytes: ${bytes}`)
    console.log(`gzBytes: ${gz.byteLength}`)
  } catch (e) {
    console.warn("could not read outfile for size: ", e)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
