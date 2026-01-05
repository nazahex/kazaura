/** @jsxImportSource solid-js */

import type { SolidLokatInstance } from "@lokat/solid"
import { type JSX, Show } from "solid-js"
import type { HarborBrand } from "./harbor.types"

export interface HarborBannerProps<L = unknown> {
  /** Branding configuration for the banner panel. */
  brand: HarborBrand
  /** Optional Lokat instance to resolve reactive brand text when `brand.title` is omitted. */
  lokat?: SolidLokatInstance<L>
}

/**
 * Renders the banner panel with brand anchor and optional logo.
 *
 * @remarks
 * This panel is intended to be used inside `HarborShell` as the first child.
 */
export default function HarborBanner<L = unknown>(props: HarborBannerProps<L>): JSX.Element {
  const title = props.lokat?.t("brand") ?? props.brand?.title ?? ""
  const subtitle = props.lokat?.t("subtitle") ?? props.brand?.subtitle
  return (
    <div id="banner-panel">
      <a class="land" href={props.brand?.href ?? "/"} aria-label={title}>
        {props.brand?.logoSlot?.()}
        <div class="brand">
          <b>{title}</b>
          <Show when={subtitle}>
            <span>{subtitle}</span>
          </Show>
        </div>
      </a>
    </div>
  )
}
