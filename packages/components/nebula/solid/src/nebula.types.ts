/**
 * @packageDocumentation
 * Nebula Core Type Definitions.
 *
 * Nebula is high-performance void container. It operates
 * deterministically by consuming explicit properties to generate precise markup
 * without interfering with your application's internal lifecycle or state.
 */

import type { ParentProps } from "solid-js"

/**
 * Supported primitive types for theme token values.
 */
export type ThemeValue = string | number | boolean | null

/**
 * Flexible Theme Identity.
 * * @remarks
 * Nebula grants full sovereignty to the application to define its own theme names.
 * By providing no hard-coded defaults, it ensures seamless integration with any
 * existing design system or brand guidelines.
 */
export type NebulaThemeName<T extends string = string> = T

/**
 * Layout Alignment Specification.
 * * @remarks
 * This type allows for custom alignment logic defined by the application.
 * Nebula remains agnostic to specific positioning rules, rendering them as
 * clean, manageable classes.
 */
export type NebulaAlign<T extends string = string> = T

/**
 * Application-Defined Design Tokens.
 * * @remarks
 * Nebula provides this dictionary as a dedicated space for co-locating your
 * design tokens. While Nebula does not manipulate these values at runtime,
 * this structure ensures type safety and organizational clarity for your styles.
 */
export type NebulaThemeTokens<
  TKey extends string = string,
  TValue extends ThemeValue = ThemeValue,
> = Record<TKey, TValue>

/**
 * Configuration Properties for the Nebula Component.
 * * Utilizing a generic-first approach, these props ensure a robust contract
 * between your application's logic and the rendered output.
 *
 * @typeParam TAlign - The union of allowed alignment options (e.g., "start" | "center").
 * @typeParam TTheme - The union of supported visual themes (e.g., "corporate" | "accent").
 * @typeParam TTokenKey - Custom keys for the theme token dictionary.
 * @typeParam TTokenValue - The data type specification for token values.
 */
export interface NebulaProps<
  TAlign extends string = string,
  TTheme extends string = string,
  TTokenKey extends string = string,
  TTokenValue extends ThemeValue = ThemeValue,
> extends ParentProps {
  /**
   * The active visual theme. This is required and is applied as a
   * CSS class to the root element for consistent styling.
   */
  theme: NebulaThemeName<TTheme>

  /**
   * The chosen layout alignment. This is required and is rendered
   * as a functional class on the root element.
   */
  align: NebulaAlign<TAlign>

  /**
   * Optional CSS classes to extend or override the styles of the root element.
   */
  className?: string

  /**
   * An optional dictionary of tokens owned and managed by the application,
   * facilitating centralized design control.
   */
  tokens?: NebulaThemeTokens<TTokenKey, TTokenValue>

  /**
   * Optional CSS classes specifically for the internal container element,
   * allowing for granular layout adjustments.
   */
  classContainer?: string
}
