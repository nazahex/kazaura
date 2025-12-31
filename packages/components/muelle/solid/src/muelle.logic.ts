/**
 * @public
 * Pure helpers for the `muelle` component.
 *
 * @remarks
 * Helpers are deterministic and side-effect free. They operate solely on
 * props passed from the host app.
 */
import type { MuelleProps } from "./muelle.types"

/**
 * Resolves a translation function from the injected Lokat instance.
 *
 * @typeParam L - Locale dictionary type used by the host app.
 * @param props - `Muelle` props containing a Lokat instance
 * @returns A translator `t(key)`; if no instance is provided, returns an
 * identity function that echoes keys.
 *
 * @example
 * ```ts
 * const t = resolveT({ lokat })
 * t("loading") // → translated string
 * ```
 */
export function resolveT<L>(props: MuelleProps<L>): (key: string) => string {
  const t = props.lokat?.t
  return typeof t === "function" ? t : (k: string) => k
}
