/** @jsxImportSource solid-js */
import { type JSX, Show } from "solid-js"
import type { HarborAuthLinks } from "./harbor.types"

export interface HarborAuthButtonsProps {
  /** Optional auth links; when omitted, renders nothing. */
  authLinks?: HarborAuthLinks
}

/**
 * Renders login/signup buttons for unauthenticated state.
 *
 * @remarks
 * Intended to be used in the `auth` slot of `HarborShell`, typically after
 * the util panel.
 */
export default function HarborAuthButtons(props: HarborAuthButtonsProps): JSX.Element {
  return (
    <>
      <Show when={props.authLinks?.signup}>
        {(s) => (
          <a href={s().href} class="signup">
            {s().label}
          </a>
        )}
      </Show>
      <Show when={props.authLinks?.login}>
        {(l) => (
          <a href={l().href} class="login">
            {l().label}
          </a>
        )}
      </Show>
    </>
  )
}
