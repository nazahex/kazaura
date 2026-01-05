/** @jsxImportSource solid-js */

import type { SolidLokatInstance } from "@lokat/solid"
import { children, type JSX } from "solid-js"
import type { HarborLangSwitch } from "./harbor.types"

export interface HarborLangSwitchButtonProps<L = unknown> {
  /** Language switch contract (label + onClick + optional icon). */
  lang: HarborLangSwitch
  /** Optional children to override the visible content. */
  children?: JSX.Element
  /** Optional Lokat to resolve reactive labels. */
  lokat?: SolidLokatInstance<L>
}

/**
 * Opt-in language switch button.
 *
 * @remarks
 * Place inside `HarborUtilPanel`. The app owns locale switching logic; this
 * component invokes the provided `onClick`.
 */
export default function HarborLangSwitchButton<L = unknown>(
  props: HarborLangSwitchButtonProps<L>,
): JSX.Element {
  const c = children(() => props.children)
  return (
    <button
      type="button"
      title={props.lokat?.t("language") ?? props.lang.label}
      onClick={props.lang.onClick}
      aria-label={props.lokat?.t("language") ?? props.lang.label}>
      {c() ?? props.lang.iconSlot?.() ?? (
        <span class="hide-mobile">{props.lokat?.t("language") ?? props.lang.label}</span>
      )}
    </button>
  )
}
