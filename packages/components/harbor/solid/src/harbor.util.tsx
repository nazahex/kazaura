/** @jsxImportSource solid-js */
import { children, type JSX } from "solid-js"

export interface HarborUtilPanelProps {
  /** Arbitrary child buttons/controls provided by the host app. */
  children?: JSX.Element
}

/**
 * Generic util container rendering arbitrary children inside `#util-menu`.
 *
 * @remarks
 * This panel is intentionally non-opinionated. Place opt-in controls like
 * `HarborLangSwitchButton` or `HarborThemeSwitch` here.
 */
export default function HarborUtilPanel(props: HarborUtilPanelProps): JSX.Element {
  const c = children(() => props.children)
  return (
    <div id="util-panel">
      <div id="util-menu">{c()}</div>
    </div>
  )
}
