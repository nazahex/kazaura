# @kazaura/muelle-solid

Organ-level footer component for Solid.

`@kazaura/muelle-solid` renders a deterministic footer structure with brand,
slogan, social links, grouped sections, and a socket area for copyright or
governance content.

## Features

- Presentation-only component with explicit props.
- Works with SSR and CSR.
- CSS export for direct style usage.
- Optional Plumet style export.
- Simple API designed for app-owned content and routing.

## Install

```bash
bun add @kazaura/muelle-solid solid-js
# or
npm install @kazaura/muelle-solid solid-js
```

## Basic Usage

```tsx
import Muelle from "@kazaura/muelle-solid"
import "@kazaura/muelle-solid/css"

export default function Footer() {
	return (
		<Muelle
			brand={{ title: "Acme" }}
			slogan="Build with rigor"
			socials={[{ name: "GitHub", href: "https://github.com/acme" }]}
			sections={[
				{
					title: "Product",
					items: [
						{ label: "Features", href: "/features" },
						{ label: "Pricing", href: "/pricing" },
					],
				},
			]}
			socket={<span>Acme © 2026</span>}
		/>
	)
}
```

## Exports

Main entry:

- `@kazaura/muelle-solid`

Subpath exports:

- `@kazaura/muelle-solid/css`
- `@kazaura/muelle-solid/plumet`

## Styling

Import prebuilt CSS:

```ts
import "@kazaura/muelle-solid/css"
```

If you use Plumet in your styling pipeline:

```ts
import createMuellePlumet from "@kazaura/muelle-solid/plumet"
```

## Props Overview

- `class`: additional class on `<footer id="muelle">`.
- `brand`: optional title/logo block.
- `slogan`: optional short text below brand.
- `socials`: optional social link list.
- `sections`: optional grouped links.
- `socket`: optional bottom content (string or JSX).

## Peer Dependency

- `solid-js` ^1.9.10

## License

MIT

## Repository

Monorepo: `https://github.com/nazahex/kazaura`
