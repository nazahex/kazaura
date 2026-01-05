import { createSignal } from "solid-js"
import type { HarborMenu } from "./harbor.types"

/**
 * Minimal contract for controlled menu state.
 *
 * @remarks
 * Accepted by `useActiveMenu` to support controlled/uncontrolled composition
 * across panels without coupling to full component props.
 */
type MenuControl = {
  activeMenu?: HarborMenu
  onActiveMenuChange?: (next: HarborMenu) => void
}

/**
 * Controlled/uncontrolled state hook for Harbor menu panels.
 *
 * @remarks
 * - Controlled when `activeMenu` is provided; emits via `onActiveMenuChange`.
 * - Uncontrolled otherwise; keeps an internal signal and also emits changes.
 */
export function useActiveMenu<T extends MenuControl>(
  props: T,
): readonly [() => HarborMenu, (next: HarborMenu) => void] {
  const [internal, setInternal] = createSignal<HarborMenu>(null)
  const isControlled = () => props.activeMenu !== undefined
  const value = () => (isControlled() ? (props.activeMenu as HarborMenu) : internal())
  const setValue = (next: HarborMenu): void => {
    if (!isControlled()) setInternal(next)
    props.onActiveMenuChange?.(next)
  }
  return [value, setValue] as const
}
