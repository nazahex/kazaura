/** @jsxImportSource solid-js */
import type { JSX } from "solid-js"
import type { NebulaProps } from "./nebula.types" /**
 * Nebula — minimal organ-level container.
 *
 * @remarks
 * Pure renderer: consumes explicit `theme` and `align` props and renders
 * deterministic markup. No async, no ambient reads, no runtime defaults.
 *
 * - Root element ID is fixed: `nebula`.
 * - Classes applied: `${theme} ${align}` + optional `className`.
 * - Children are rendered inside `$[classContainer]` div.
 */
export default function Nebula<TAlign extends string = string, TTheme extends string = string>(
  props: NebulaProps<TAlign, TTheme>,
): JSX.Element {
  return (
    <main
      id="nebula"
      class={`${props.theme} ${props.align}${props.className ? ` ${props.className}` : ""}`}>
      <div class={`${props.classContainer ?? ""}`}>{props.children}</div>
    </main>
  )
}
