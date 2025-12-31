/**
 * @public
 * Fundamental types for the `muelle` organ-level UI component.
 *
 * @remarks
 * This package follows a strict Lokat-first contract: the host app owns
 * localization via an injected `@lokat/solid` instance. All props are pure,
 * deterministic inputs; the component performs no I/O, global state access,
 * or implicit side effects.
 *
 * The organ id is fixed as `muelle`. Styling hooks are provided via the
 * `class` prop; the component itself does not attach organ-named classes
 * beyond small, structural ones intended for theming.
 */
import type { SolidLokatInstance } from "@lokat/solid"
import type { JSX } from "solid-js"

/**
 * Represents high-level rendering state of the footer tail.
 *
 * - `ready`: normal content and copyright are shown
 * - `loading`: skeleton placeholder is shown with `aria-busy="true"`
 * - `error`: error message area is shown with `role="alert"`
 */
export type MuelleState = "ready" | "loading" | "error"

/**
 * Branding block shown at the top banner of the footer.
 *
 * @public
 */
export interface MuelleBrand {
  /**
   * Brand title text. When no `logo` is provided, the component renders
   * a `<h2>` with this value. If omitted, the translated key `brand` is used.
   *
   * @defaultValue translation of key `brand`
   */
  title?: string
  /**
   * Optional JSX logo node (e.g., an SVG). When present, it is rendered
   * inside a container element and replaces the default `<h2>` title.
   */
  logo?: JSX.Element
}

/**
 * A single navigational link item.
 *
 * @public
 */
export interface MuelleLinkItem {
  /** Visible label for the link. */
  label: string
  /** Destination href for the link. */
  href: string
}

/**
 * A footer section with a title and a list of link items.
 *
 * @public
 */
export interface MuelleSection {
  /** Section header text. */
  title: string
  /** Readonly list of `MuelleLinkItem` entries. */
  items: ReadonlyArray<MuelleLinkItem>
}

/**
 * Social link item, typically rendered as an icon with accessible label.
 *
 * @public
 */
export interface MuelleSocialItem {
  /** Accessible name used as `aria-label`. */
  name: string
  /** Social destination href. */
  href: string
  /** Optional JSX icon; if absent, the `name` text is shown. */
  icon?: JSX.Element
}

/**
 * Props for the `Muelle` component.
 *
 * @typeParam L - Locale dictionary type used by the injected Lokat instance.
 * @public
 */
export interface MuelleProps<L = unknown> {
  /**
   * Optional additional class name(s) applied to the root `<footer>` element.
   *
   * @remarks
   * The root id is fixed to `muelle`. Pass theme classes here rather than
   * relying on organ-named defaults.
   */
  class?: string
  /** Branding block configuration. */
  brand?: MuelleBrand
  /** Optional slogan rendered alongside the brand. */
  slogan?: string
  /** Optional list of social link items. */
  socials?: ReadonlyArray<MuelleSocialItem>
  /** Optional list of footer sections with links. */
  sections?: ReadonlyArray<MuelleSection>
  /** Tail rendering state; controls skeleton/error/ready display. */
  state?: MuelleState
  /**
   * Application-owned Lokat instance for translation.
   *
   * @remarks
   * The component calls `lokat.t(key)` synchronously; if no translator
   * is present, it falls back to echoing the key.
   */
  lokat: SolidLokatInstance<L>
  /**
   * Controlled bitmask of collapsed sections.
   *
   * @deprecated Footer sections no longer support toggle/collapse in the
   * default `Muelle` component. This prop is retained for backward
   * compatibility but has no effect.
   */
  collapsedMask?: number
  /**
   * Callback when the collapsed bitmask changes.
   *
   * @deprecated No longer emitted because sections are always expanded.
   */
  onCollapsedMaskChange?: (next: number) => void
  /**
   * Callback when a section would have toggled.
   *
   * @param index - Section index
   * @param nextCollapsed - Next collapsed state
   * @deprecated No longer emitted because sections are always expanded.
   */
  onSectionToggle?: (index: number, nextCollapsed: boolean) => void
  /** Copyright text rendered in the tail when `state` is `ready`. */
  copyright?: string
}
