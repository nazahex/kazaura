/** @jsxImportSource solid-js */
import type { JSX } from "solid-js"
import HarborBanner from "./harbor.banner"
import HarborShell from "./harbor.shell"
import type { HarborProps } from "./harbor.types"

/**
 * Renders the `Harbor` header (banner-only default view).
 *
 * @remarks
 * This default export is intentionally minimal to maximize tree-shaking.
 * It renders only the banner panel. Compose additional panels using the
 * named components and `HarborShell` when needed.
 *
 * @example
 * Basic usage
 * ```tsx
 * <Harbor lokat={loc} brand={{ title: loc.t("brand") }} />
 * ```
 */
export default function Harbor<L = unknown>(props: HarborProps<L>): JSX.Element {
  return (
    <HarborShell {...(props.className ? { className: props.className } : {})}>
      <HarborBanner brand={props.brand} lokat={props.lokat} />
    </HarborShell>
  )
}
