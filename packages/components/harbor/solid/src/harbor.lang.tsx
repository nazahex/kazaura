/** @jsxImportSource solid-js */

import { children, type JSX } from "solid-js"
import type { HarborLangSwitch } from "./harbor.types"

export interface HarborLangSwitchButtonProps {
  /** Language switch contract (label + onClick + optional icon). */
  lang: HarborLangSwitch
  /** Optional children to override the visible content. */
  children?: JSX.Element
}

/**
 * Opt-in language switch button.
 *
 * @remarks
 * Place inside `HarborUtilPanel`. The app owns locale switching logic; this
 * component invokes the provided `onClick`.
 */
export default function HarborLangSwitchButton(props: HarborLangSwitchButtonProps): JSX.Element {
  const c = children(() => props.children)
  return (
    <button
      type="button"
      title={props.lang.label}
      onClick={props.lang.onClick}
      aria-label={props.lang.label}>
      {c() ?? props.lang.iconSlot?.() ?? <span class="hide-mobile">{props.lang.label}</span>}
    </button>
  )
}
