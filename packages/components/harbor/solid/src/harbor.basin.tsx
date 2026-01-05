/** @jsxImportSource solid-js */

import type { SolidLokatInstance } from "@lokat/solid"
import { For, type JSX, Show } from "solid-js"
import { useActiveMenu } from "./harbor.logic"
import type { HarborMenu, HarborNavItem } from "./harbor.types"

export interface HarborBasinProps<L = unknown> {
  /** Navigation items to render as main menu links. */
  nav?: HarborNavItem[]
  /** Controlled active menu key (optional). */
  activeMenu?: HarborMenu
  /** Callback when active menu changes (optional). */
  onActiveMenuChange?: (next: HarborMenu) => void
  /** Optional Lokat to resolve reactive labels. */
  lokat?: SolidLokatInstance<L>
}

/**
 * Renders the basin (main menu) panel and its toggle.
 *
 * @remarks
 * Controlled/uncontrolled via `activeMenu` + `onActiveMenuChange`. When no
 * `nav` is provided, nothing is rendered.
 */
export default function HarborBasinPanel<L = unknown>(props: HarborBasinProps<L>): JSX.Element {
  const [activeMenu, setActiveMenu] = useActiveMenu(props)
  const open = () => setActiveMenu(activeMenu() === "basin" ? null : "basin")

  return (
    <Show when={props.nav && props.nav.length > 0}>
      <div id="basin-panel">
        <For each={props.nav ?? []}>
          {(item) => (
            <a href={item.href} class="nav-item" aria-label={item.label}>
              {item.iconSlot?.()}
            </a>
          )}
        </For>
        <button
          type="button"
          onClick={open}
          classList={{ active: activeMenu() === "basin" }}
          aria-expanded={activeMenu() === "basin"}
          aria-controls="menu-basin"
          aria-label={props.lokat?.t("menu") ?? "menu"}>
          <span>{props.lokat?.t("menu") ?? "menu"}</span>
        </button>
      </div>
    </Show>
  )
}
