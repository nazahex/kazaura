/** @jsxImportSource solid-js */

import { type JSX, Show } from "solid-js"
import type { HarborBrand } from "./harbor.types"

export interface HarborBannerProps {
  /** Branding configuration for the banner panel. */
  brand: HarborBrand
  /** Optional subtitle for the banner. */
  subtitle?: string
}

/**
 * Renders the banner panel with brand anchor and optional logo.
 *
 * @remarks
 * This panel is intended to be used inside `HarborShell` as the first child.
 */
export default function HarborBanner(props: HarborBannerProps): JSX.Element {
  const title = props.brand.title
  const subtitle = props.brand.subtitle
  return (
    <div id="banner-panel">
      <a href={props.brand?.href ?? "/"} aria-label={title}>
        {props.brand?.logoSlot?.()}
        <div>
          <b>{title}</b>
          <Show when={subtitle}>
            <span>{subtitle}</span>
          </Show>
        </div>
      </a>
    </div>
  )
}
