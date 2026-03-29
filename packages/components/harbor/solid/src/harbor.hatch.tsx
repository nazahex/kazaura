/** @jsxImportSource solid-js */

import { type JSX, Show } from "solid-js"
import { useActiveHarborMenu } from "./harbor.logic"
import type { HarborMenu, HarborUser } from "./harbor.types"

export interface HarborHatchPanelProps {
  /** Optional user state; nothing is rendered if not logged in. */
  user?: HarborUser
  /** Controlled active menu key (optional). */
  activeHarborMenu?: HarborMenu
  /** Callback when active menu changes (optional). */
  onActiveHarborMenuChange?: (next: HarborMenu) => void
  /** Required label for the hatch toggle button. */
  toggleLabel: string
}
/**
 * Renders the hatch (user menu) panel and its toggle.
 *
 * @remarks
 * Only renders when `user?.isLoggedIn` is true. Controlled/uncontrolled via
 * `activeHarborMenu` + `onActiveHarborMenuChange`.
 */
export default function HarborHatchPanel(props: HarborHatchPanelProps): JSX.Element {
  const [activeHarborMenu, setActiveHarborMenu] = useActiveHarborMenu(props)
  const open = () => setActiveHarborMenu(activeHarborMenu() === "hatch" ? null : "hatch")

  return (
    <Show when={props.user?.isLoggedIn}>
      <div
        id="hatch-panel"
        classList={{
          active: activeHarborMenu() === "hatch",
          premium: !!props.user?.isPremium,
        }}>
        <button
          id="btn-hatch"
          type="button"
          onClick={open}
          aria-expanded={activeHarborMenu() === "hatch"}
          aria-controls="menu-hatch"
          aria-label={props.toggleLabel}>
          {props.user?.avatarSlot?.()}
          <span class="hide-mobile">{props.toggleLabel}</span>
        </button>
      </div>
    </Show>
  )
}
