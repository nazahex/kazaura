/** @jsxImportSource solid-js */

import type { SolidLokatInstance } from "@lokat/solid"
import { type JSX, Show } from "solid-js"
import { useActiveMenu } from "./harbor.logic"
import type { HarborMenu, HarborUser } from "./harbor.types"

export interface HarborHatchPanelProps<L = unknown> {
  /** Optional user state; nothing is rendered if not logged in. */
  user?: HarborUser
  /** Controlled active menu key (optional). */
  activeMenu?: HarborMenu
  /** Callback when active menu changes (optional). */
  onActiveMenuChange?: (next: HarborMenu) => void
  /** Optional Lokat to resolve reactive labels. */
  lokat?: SolidLokatInstance<L>
}

/**
 * Renders the hatch (user menu) panel and its toggle.
 *
 * @remarks
 * Only renders when `user?.isLoggedIn` is true. Controlled/uncontrolled via
 * `activeMenu` + `onActiveMenuChange`.
 */
export default function HarborHatchPanel<L = unknown>(
  props: HarborHatchPanelProps<L>,
): JSX.Element {
  const [activeMenu, setActiveMenu] = useActiveMenu(props)
  const open = () => setActiveMenu(activeMenu() === "hatch" ? null : "hatch")

  return (
    <Show when={props.user?.isLoggedIn}>
      <div
        id="hatch-panel"
        classList={{
          active: activeMenu() === "hatch",
          premium: !!props.user?.isPremium,
        }}>
        <button
          id="btn-hatch"
          type="button"
          onClick={open}
          aria-expanded={activeMenu() === "hatch"}
          aria-controls="menu-hatch"
          aria-label={props.lokat?.t("userMenu") ?? "user"}>
          {props.user?.avatarSlot?.()}
          <span class="hide-mobile">{props.lokat?.t("userMenu") ?? "user"}</span>
        </button>
      </div>
    </Show>
  )
}
