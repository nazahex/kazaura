/** @jsxImportSource solid-js */
import { children, type JSX } from "solid-js"

export interface HarborShellProps {
  /** Optional class name(s) for the root `#harbor` element. */
  className?: string
  /**
   * Arbitrary panel composition inside `#harbor #naval .ship`.
   *
   * @remarks
   * Client code controls the order (e.g., banner → basin → util → auth → hatch)
   * for maximal flexibility and tree-shaking.
   */
  children?: JSX.Element
}

/**
 * Minimal structural shell providing the required DOM boundary only.
 *
 * @remarks
 * There is no runtime branching or ordering logic here for maximal efficiency.
 * Consumers fully control which panels render and in what order via `children`.
 */
export default function HarborShell(props: HarborShellProps): JSX.Element {
  const c = children(() => props.children)
  return (
    <header id="harbor" class={props.className}>
      <div class="ship">{c()}</div>
    </header>
  )
}
