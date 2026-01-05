/** @jsxImportSource solid-js */

import type { SolidLokatInstance } from "@lokat/solid"
import type { JSX } from "solid-js"
import type { HarborAmbience } from "./harbor.types"

export interface HarborThemeSwitchProps<L = unknown> {
  /** Ambience contract providing the theme toggle handlers and optional icons. */
  ambience: HarborAmbience
  /** Optional Lokat to resolve reactive labels for dark/light mode. */
  lokat?: SolidLokatInstance<L>
}

/**
 * Opt-in theme switch (dark/light) control pair.
 *
 * @remarks
 * Place inside `HarborUtilPanel`. The UI kit does not read/write theme state;
 * it only invokes `onDark`/`onLight`.
 */
export default function HarborThemeSwitch<L = unknown>(
  props: HarborThemeSwitchProps<L>,
): JSX.Element {
  return (
    <>
      <button
        type="button"
        class="fn-ambience swan"
        title={props.lokat?.t("darkMode") ?? "dark-mode"}
        aria-label={props.lokat?.t("darkMode") ?? "dark-mode"}
        onClick={props.ambience.onDark}>
        {props.ambience.darkIconSlot?.()}
      </button>
      <button
        type="button"
        class="fn-ambience wolf"
        title={props.lokat?.t("lightMode") ?? "light-mode"}
        aria-label={props.lokat?.t("lightMode") ?? "light-mode"}
        onClick={props.ambience.onLight}>
        {props.ambience.lightIconSlot?.()}
      </button>
    </>
  )
}
