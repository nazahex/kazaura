# Kazaura

Framework-agnostic, organ-level UI kit focused on deterministic rendering,
portable architecture, and low runtime overhead.

Kazaura is organized as a monorepo with Solid implementations of reusable
layout components (for example: header and footer) plus tooling for benchmark
and profiling.

## Why Kazaura

- Organ-level components: larger than atoms, smaller than app shells.
- Runtime-agnostic design: safe to use in SSR, CSR, and worker-like contexts.
- Deterministic output: components are pure renderers with explicit props.
- Styling flexibility: CSS output for direct use and optional Plumet style APIs.
- Monorepo workflow: shared tooling, consistent quality checks, faster iteration.

## Package Overview

Published packages:

- `@kazaura/harbor-solid`: Header/navigation organ for Solid.
- `@kazaura/muelle-solid`: Footer organ for Solid.
- `@kazaura/nebula-solid`: Minimal container/void organ for Solid.

Auxiliary/internal packages:

- `apps/bench`: benchmark and profiling suite.
- `packages/components/*/style`: source style packages used by build pipelines.

## Quick Start

Install one of the Solid packages in your app:

```bash
bun add @kazaura/harbor-solid
# or
npm install @kazaura/harbor-solid
```

Use it in a Solid app:

```tsx
import Harbor from "@kazaura/harbor-solid"
import "@kazaura/harbor-solid/css"

export default function App() {
  return <Harbor brand={{ title: "Acme" }} />
}
```

For advanced composition and API details, see each package README.

## Monorepo Development

Requirements:

- Bun >= 1.2.0
- Node >= 18

Install dependencies:

```bash
bun install
```

Common commands:

```bash
# Build all workspaces
bun run build

# Lint and format checks
bun run check

# Apply formatting
bun run format

# Run workspace clean scripts
bun run clean

# Run benchmark aggregate for one component
bun run bench muelle
```

## Benchmarks

The benchmark suite lives in `apps/bench` and supports:

- SSR runtime benchmarks
- Hydration runtime benchmarks
- Memory profiling
- Stress scenarios
- Bundle size reports

See `apps/bench/README.md` for usage and report format details.

## CI and Release

- CI validates check/build/test workflows on pull requests and main branch.
- Releases use Changesets to version and publish public packages.

## Contributing

1. Fork and clone the repository.
2. Install dependencies with Bun.
3. Make your changes in the relevant package.
4. Run `bun run check` and `bun run build` before opening a PR.

If your change affects package behavior, update the package README and include
usage examples.

## License

MIT
