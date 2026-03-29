/**
 * @public
 * Public types for the `Muelle` organ (footer).
 *
 * Summary for integrators:
 * - `Muelle` is a presentation-only component: pass data via props and the
 *   component renders deterministic markup. It performs no network requests,
 *   navigation, or global side-effects.
 * - The root id is fixed to `muelle` to provide stable selectors for theming.
 *
 * DX notes:
 * - This file exposes small reusable interfaces (e.g. `MuelleSection`) for
 *   composition and reuse, and a single detailed `MuelleProps` interface that
 *   lists prop shapes inline so IDE tooltips show field names and types
 *   without forcing developers to open separate files.
 */
import type { JSX } from "solid-js"

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
export interface MuelleProps {
  /**
   * Optional additional class(es) applied to the root `<footer id="muelle">`.
   */
  class?: string

  /** Branding block — expanded inline for IDE completion. */
  brand?: {
    /** Brand title text (optional). */
    title?: string
    /** Optional JSX logo node (e.g., an SVG). */
    logo?: JSX.Element
  }

  /** Optional slogan rendered alongside the brand. */
  slogan?: string

  /** Social links (inline shape for better IDE tooltips). */
  socials?: ReadonlyArray<{
    name: string
    href: string
    icon?: JSX.Element
  }>

  /** Footer sections with inline link items for quick discovery. */
  sections?: ReadonlyArray<{
    title: string
    items: ReadonlyArray<{ label: string; href: string }>
  }>

  /** Small copyright/governance content rendered in the footer tail. */
  socket?: string | JSX.Element
}
