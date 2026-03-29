# @kazaura/nebula-solid

Minimal organ-level container for Solid.

`@kazaura/nebula-solid` is a deterministic wrapper component for building
layout areas where the application controls theme and alignment semantics.

## Features

- Extremely small surface area.
- Explicit `theme` and `align` contracts.
- Optional custom class hooks.
- CSS export for default styling.
- Suitable for SSR and CSR.

## Installation

```bash
bun add @kazaura/nebula-solid solid-js
# or
npm install @kazaura/nebula-solid solid-js
```

## Usage

```tsx
import Nebula from "@kazaura/nebula-solid"
import "@kazaura/nebula-solid/css"

export default function Hero() {
  return (
    <Nebula theme="corporate" align="center" className="hero-shell" classContainer="hero-inner">
      <h1>Welcome</h1>
      <p>Deterministic, composable, and portable UI.</p>
    </Nebula>
  )
}
```

## Exports

Main entry:

- `@kazaura/nebula-solid`

Subpath exports:

- `@kazaura/nebula-solid/css`

## Props

Required:

- `theme`: string-like theme identifier.
- `align`: string-like alignment identifier.

Optional:

- `className`: additional class on root element.
- `classContainer`: additional class on inner container.
- `tokens`: app-owned token dictionary for your own integration patterns.
- `children`: content rendered inside the container.

## Peer Dependencies

- `solid-js` ^1.9.10

## License

MIT
