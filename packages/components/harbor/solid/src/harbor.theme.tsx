/** @jsxImportSource solid-js */

import type { JSX } from "solid-js"
import type { HarborAmbience } from "./harbor.types"

export interface HarborThemeSwitchProps {
  /** Ambience contract providing the theme toggle handlers and optional icons. */
  ambience: HarborAmbience
}

/**
 * Opt-in theme switch (dark/light) control pair.
 *
 * @remarks
 * Place inside `HarborUtilPanel`. The UI kit does not read/write theme state;
 * it only invokes `onDark`/`onLight`.
 */
export default function HarborThemeSwitch(props: HarborThemeSwitchProps): JSX.Element {
  return (
    <>
      <button
        type="button"
        class="fn-ambience swan"
        title={props.ambience.labelDark}
        aria-label={props.ambience.labelDark}
        onClick={props.ambience.onDark}>
        {props.ambience.darkIconSlot?.()}
      </button>
      <button
        type="button"
        class="fn-ambience wolf"
        title={props.ambience.labelLight}
        aria-label={props.ambience.labelLight}
        onClick={props.ambience.onLight}>
        {props.ambience.lightIconSlot?.()}
      </button>
    </>
  )
}
