import { createSignal } from "solid-js"
import type { HarborMenu } from "./harbor.types"

/**
 * Minimal contract for controlled menu state.
 *
 * @remarks
 * Accepted by `useActiveHarborMenu` to support controlled/uncontrolled composition
 * across panels without coupling to full component props.
 */
type MenuControl = {
  activeHarborMenu?: HarborMenu
  onActiveHarborMenuChange?: (next: HarborMenu) => void
}

/**
 * Controlled/uncontrolled state hook for Harbor menu panels.
 *
 * @remarks
 * - Controlled when `activeHarborMenu` is provided; emits via `onActiveHarborMenuChange`.
 * - Uncontrolled otherwise; keeps an internal signal and also emits changes.
 */
export function useActiveHarborMenu<T extends MenuControl>(
  props: T,
): readonly [() => HarborMenu, (next: HarborMenu) => void] {
  const [internal, setInternal] = createSignal<HarborMenu>(null)
  const isControlled = () => props.activeHarborMenu !== undefined
  const value = () => (isControlled() ? (props.activeHarborMenu as HarborMenu) : internal())
  const setValue = (next: HarborMenu): void => {
    if (!isControlled()) setInternal(next)
    props.onActiveHarborMenuChange?.(next)
  }
  return [value, setValue] as const
}
