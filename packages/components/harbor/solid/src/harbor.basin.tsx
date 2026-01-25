/** @jsxImportSource solid-js */

import { createSignal, For, type JSX, Show } from "solid-js"
import { useActiveHarborMenu } from "./harbor.logic"
import type { HarborBasinProps } from "./harbor.types"

/**
 * Renders the basin (main menu) panel and its toggle.
 *
 * @remarks
 * Controlled/uncontrolled via `activeHarborMenu` + `onActiveHarborMenuChange`. When no
 * `nav` is provided, nothing is rendered.
 */
export default function HarborBasinPanel<M>(props: HarborBasinProps<M>): JSX.Element {
  const [activeHarborMenu, setActiveHarborMenu] = useActiveHarborMenu(props)
  const [activeBasinMenu, setBasinMenu] = createSignal<M | null>(null)
  const openBasin = () => setActiveHarborMenu(activeHarborMenu() === "basin" ? null : "basin")

  return (
    <Show when={props.nav && props.nav.length > 0}>
      <div id="basin-panel">
        <div class="links">
          <For each={props.nav ?? []}>
            {(item) => (
              <a href={item.href} class="nav-item" aria-label={item.label}>
                {item.iconSlot?.()}
              </a>
            )}
          </For>
        </div>
        <div class="toggles">
          <For each={props.toggle}>
            {(toggle) => (
              <button
                type="button"
                onClick={() => {
                  toggle.onToggle?.()
                  openBasin()
                  setBasinMenu(() =>
                    activeBasinMenu() === toggle.basinMenu ? null : toggle.basinMenu,
                  )
                }}
                classList={{ active: activeBasinMenu() === toggle.basinMenu }}
                aria-expanded={activeBasinMenu() === toggle.basinMenu}
                aria-controls="basin"
                aria-label={toggle.label}>
                <span>{toggle.label}</span>
                {toggle.chevronIconSlot?.()}
              </button>
            )}
          </For>
        </div>
      </div>
    </Show>
  )
}
