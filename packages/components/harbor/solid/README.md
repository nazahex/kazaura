# @kazaura/harbor-solid

Organ-level header component system for Solid.

`@kazaura/harbor-solid` provides a minimal default header plus composable panels
for navigation, utilities, authentication links, and user hatch menu.

## Features

- Pure renderer with explicit props.
- Composable panel architecture for tree-shaking.
- CSS export for direct styling.
- Optional Plumet style export.
- Suitable for SSR and CSR environments.

## Installation

```bash
bun add @kazaura/harbor-solid solid-js
# or
npm install @kazaura/harbor-solid solid-js
```

## Basic Usage

```tsx
import Harbor from "@kazaura/harbor-solid"
import "@kazaura/harbor-solid/css"

export default function App() {
  return <Harbor brand={{ title: "Acme", subtitle: "Build with rigor", href: "/" }} />
}
```

## Composed Usage

```tsx
import {
  HarborAuthButtons,
  HarborBanner,
  HarborBasinPanel,
  HarborHatchPanel,
  HarborLangSwitchButton,
  HarborShell,
  HarborThemeSwitch,
  HarborUtilPanel,
} from "@kazaura/harbor-solid"
import "@kazaura/harbor-solid/css"

export default function Header() {
  return (
    <HarborShell>
      <HarborBanner brand={{ title: "Acme", subtitle: "Platform" }} />
      <HarborBasinPanel
        nav={[{ label: "Docs", href: "/docs" }, { label: "Pricing", href: "/pricing" }]}
        toggle={[
          {
            label: "Menu",
            basinMenu: "main",
          },
        ]}
      />
      <HarborUtilPanel>
        <HarborLangSwitchButton lang={{ label: "Language", onClick: () => {} }} />
        <HarborThemeSwitch
          ambience={{
            labelDark: "Dark",
            labelLight: "Light",
            onDark: () => {},
            onLight: () => {},
          }}
        />
      </HarborUtilPanel>
      <HarborAuthButtons
        authLinks={{
          signup: { label: "Sign up", href: "/signup" },
          login: { label: "Login", href: "/login" },
        }}
      />
      <HarborHatchPanel
        toggleLabel="Account"
        user={{
          isLoggedIn: true,
          avatarSlot: () => <span>U</span>,
          dashboardHref: "/dashboard",
        }}
      />
    </HarborShell>
  )
}
```

## Exports

Main entry:

- `@kazaura/harbor-solid`

Subpath exports:

- `@kazaura/harbor-solid/css`
- `@kazaura/harbor-solid/plumet`

## Styling

Import the prebuilt CSS:

```ts
import "@kazaura/harbor-solid/css"
```

If you use Plumet in your design system, import:

```ts
import createHarborPlumet from "@kazaura/harbor-solid/plumet"
```

## API Notes

- The default export (`Harbor`) renders a banner-only header.
- For full layouts, compose named panels inside `HarborShell`.
- `HarborHatchPanel` requires a `toggleLabel` prop.
- `HarborBasinPanel` expects `toggle` as an array.

## Peer Dependencies

- `solid-js` ^1.9.10
- `plumet` ^0.2.0

## License

MIT
