/**
 * @public
 * `Muelle` — a deterministic, organ-level footer component for Solid.
 *
 * @remarks
 * The component renders a structured footer with brand, optional slogan,
 * socials, sections, and a socket for copyright or governance content.
 *
 * Accessibility:
 * - Social links include `aria-label` derived from their `name`.
 * - Loading skeleton sets `aria-busy="true"`; errors use `role="alert"`.
 * - Section titles are non-interactive headings.
 *
 * Layout and styling are delegated to the host app via the `class` prop.
 */
/** @jsxImportSource solid-js */
import { For, type JSX, Show } from "solid-js"
import type { MuelleProps } from "./muelle.types"

/**
 * Renders the `Muelle` footer.
 *
 * @param props - Component props; see `MuelleProps`
 * @returns A Solid JSX element representing the footer structure
 *
 */
export default function Muelle(props: MuelleProps): JSX.Element {
  return (
    <footer id="muelle" class={props.class}>
      <div class="ship">
        <div class="banner">
          <Show when={props.brand?.logo} fallback={<h2>{props.brand?.title}</h2>}>
            {(logo) => <div class="logo">{logo()}</div>}
          </Show>
          <Show when={props.slogan}>{(s) => <div class="slogan">{s()}</div>}</Show>
          <Show when={(props.socials?.length ?? 0) > 0}>
            <div class="socials">
              <For each={props.socials ?? []}>
                {(s) => (
                  <a href={s.href} aria-label={s.name} rel="noopener noreferrer">
                    <Show when={s.icon} fallback={<span>{s.name}</span>}>
                      {(I) => I()}
                    </Show>
                  </a>
                )}
              </For>
            </div>
          </Show>
        </div>

        <Show when={(props.sections?.length ?? 0) > 0}>
          <div class="sections">
            <For each={props.sections ?? []}>
              {(sec) => (
                <section class="section">
                  <h3 class="section-head">{sec.title}</h3>
                  <ul class="links">
                    <For each={sec.items}>
                      {(it) => (
                        <li>
                          <a href={it.href}>{it.label}</a>
                        </li>
                      )}
                    </For>
                  </ul>
                </section>
              )}
            </For>
          </div>
        </Show>
      </div>

      <div class="socket">{props.socket}</div>
    </footer>
  )
}
