/**
 * @public
 * Fundamental types for the `harbor` organ-level UI component (header).
 *
 * @remarks
 * Design goals:
 * - Lokat-first: the host app injects a `@lokat/solid` instance.
 * - Pure renderer: no fetching, no timers, no global reads, no context creation.
 * - Runtime-agnostic: deterministic rendering, safe on SSR/Edge/Workers.
 * - Tree-shakeable: optional panels are split into separate, side-effect-free modules.
 * - Styling: id-fixed as `harbor`; all theming lives in the host CSS.
 *
 * Composition model:
 * - The default `Harbor` renders only the banner panel.
 * - Optional panels (`HarborBasinPanel`, `HarborUtilPanel`, `HarborAuthButtons`, `HarborHatchPanel`)
 *   can be composed via `HarborShell` in the required order: banner → basin → util → auth → hatch.
 */
import type { SolidLokatInstance } from "@lokat/solid"
import type { JSX } from "solid-js"

/**
 * Menu key for Harbor ephemeral UI state.
 *
 * @remarks
 * - `basin`: main navigation panel
 * - `cross`: language/utilities overlay
 * - `hatch`: user menu
 * - `none`: all panels closed
 */
export type HarborMenu = null | "basin" | "cross" | "hatch"

/**
 * Branding block shown in the banner panel.
 *
 * @public
 */
export interface HarborBrand {
  /** Brand title text; falls back to `lokat.t('brand')` when omitted. */
  title?: string
  /** Optional subtitle text shown below the title. */
  subtitle?: string
  /** Optional link destination for brand anchor. */
  href?: string
  /** Optional logo slot (e.g., SVG). */
  logoSlot?: () => JSX.Element
}

/**
 * Single navigation item for the basin (main menu).
 *
 * @public
 */
export interface HarborNavItem {
  /** Visible label and aria-label. */
  label: string
  /** Destination href. */
  href: string
  /** Optional icon slot. */
  iconSlot?: () => JSX.Element
}

/**
 * Language switch contract for an opt-in util button.
 *
 * @remarks
 * Used by `HarborLangSwitchButton`. The application owns the behavior and
 * dictionary switching; the UI kit only invokes `onClick`.
 *
 * @public
 */
export interface HarborLangSwitch {
  /** Button label used for text and a11y. */
  label: string
  /** Click handler owned by the app. */
  onClick: () => void
  /** Optional icon slot. */
  iconSlot?: () => JSX.Element
}

/**
 * Theme switch contract for an opt-in util component.
 *
 * @remarks
 * Used by `HarborThemeSwitch`. Theme is app-owned; the UI kit does not read
 * or mutate global theme state and only calls the provided handlers.
 *
 * @public
 */
export interface HarborAmbience {
  /** Switch to light mode. */
  onLight: () => void
  /** Switch to dark mode. */
  onDark: () => void
  /** Optional light-mode icon slot. */
  lightIconSlot?: () => JSX.Element
  /** Optional dark-mode icon slot. */
  darkIconSlot?: () => JSX.Element
}

/**
 * User block contract for the hatch panel and dashboard link.
 *
 * @remarks
 * - `dashboardHref` enables an optional dashboard anchor in the banner panel
 *   when `isLoggedIn` is true.
 * - `avatarSlot` is rendered inside the hatch toggle button.
 *
 * @public
 */
export interface HarborUser {
  /** Whether the user is authenticated. */
  isLoggedIn: boolean
  /** Premium badge hint. */
  isPremium?: boolean
  /** Optional avatar slot. */
  avatarSlot?: () => JSX.Element
  /** Optional dashboard link. */
  dashboardHref?: string
  /** Optional callback when hatch is explicitly opened. */
  onOpenHatch?: () => void
}

/**
 * Auth link pair for unauthenticated state.
 *
 * @remarks
 * Used by `HarborAuthButtons`. Either (or both) `signup` and `login` can be provided.
 *
 * @public
 */
export interface HarborAuthLinks {
  /** Optional signup link. */
  signup?: { label: string; href: string }
  /** Optional login link. */
  login?: { label: string; href: string }
}

/**
 * Props for the `Harbor` component (banner-only default view).
 *
 * @typeParam L - Locale dictionary type for the injected Lokat instance.
 * @public
 *
 * @example
 * Basic banner-only usage
 * ```tsx
 * import { Harbor } from "@kazaura/harbor-solid"
 * import { createSolidLokat } from "@lokat/solid"
 *
 * const loc = createSolidLokat({ initialLocale: "en", initialDict: { brand: "Kazaura" } })
 *
 * <Harbor lokat={loc} brand={{ title: loc.t("brand") }} />
 * ```
 *
 * @example
 * Composed with `HarborShell` and optional panels
 * ```tsx
 * import {
 *   HarborShell, HarborBanner, HarborBasinPanel, HarborUtilPanel,
 *   HarborAuthButtons, HarborHatchPanel,
 * } from "@kazaura/harbor-solid"
 *
 * <HarborShell
 *   banner={<HarborBanner brand={{ title: "Kazaura" }} />}
 *   basin={<HarborBasinPanel nav={[{ label: "Docs", href: "/docs" }]} />}
 *   util={
 *     <HarborUtilPanel>
 *       {utilButtons}
 *     </HarborUtilPanel>
 *   }
 *   auth={<HarborAuthButtons authLinks={{ login: { label: "Login", href: "/login" } }} />}
 *   hatch={<HarborHatchPanel user={{ isLoggedIn: true }} />}
 * />
 * ```
 */
export interface HarborProps<L = unknown> {
  /** App-owned Lokat instance for translation. */
  lokat: SolidLokatInstance<L>
  /** Optional extra class name(s) applied to the root `#harbor`. */
  className?: string
  /** Branding block configuration. */
  brand: HarborBrand
  /** Optional basin items (used by `HarborBasinPanel`). */
  nav?: HarborNavItem[]
  /** Optional language switch contract (used by `HarborLangSwitchButton`). */
  langSwitch?: HarborLangSwitch
  /** Optional ambience contract (used by `HarborThemeSwitch`). */
  ambience?: HarborAmbience
  /** Optional user state for hatch/dashboard. */
  user?: HarborUser
  /** Optional auth links for unauthenticated state. */
  authLinks?: HarborAuthLinks
  /** Optional high-level state. */
  state?: "loading" | "ready" | "error"
  /** Controlled active menu (used by basin/cross/hatch panels). */
  activeMenu?: HarborMenu
  /** Callback when active menu changes. */
  onActiveMenuChange?: (next: HarborMenu) => void
}
