/**
 * @public
 * `Muelle` — a deterministic, organ-level footer component for Solid.
 *
 * @remarks
 * The component renders a structured footer with brand, optional slogan,
 * socials, sections, and a tail area reflecting `state` (ready/loading/error).
 * It is localization-first: translation is provided via an injected
 * `@lokat/solid` instance; the component itself performs no async work.
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
import { resolveT } from "./muelle.logic"
import type { MuelleProps } from "./muelle.types"

/**
 * Renders the `Muelle` footer.
 *
 * @typeParam L - Locale dictionary type for the Lokat instance.
 * @param props - Component props; see `MuelleProps`
 * @returns A Solid JSX element representing the footer structure
 *
 * @example
 * ```tsx
 * import { createLokat } from "@lokat/solid"
 * import Muelle from "@nazahex/muelle/solid"
 *
 * const lokat = createLokat({ initialDict: { loading: "Loading", error: "Error" } })
 *
 * <Muelle
 *   lokat={lokat}
 *   brand={{ title: "Kazaura" }}
 *   slogan="Build fast, ship solid"
 *   socials={[{ name: "GitHub", href: "https://github.com" }]}
 *   sections={[{ title: "Docs", items: [{ label: "Getting Started", href: "/docs" }] }]}
 *   state="ready"
 *   copyright="© 2025 Nazahex"
 * />
 * ```
 */
export default function Muelle<L = unknown>(props: MuelleProps<L>): JSX.Element {
  const t = resolveT(props)

  return (
    <footer id="muelle" class={props.class}>
      <div class="ship">
        <div class="banner">
          <Show when={props.brand?.logo} fallback={<h2>{props.brand?.title ?? t("brand")}</h2>}>
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

      <div class="tail">
        <Show when={props.state === "loading"}>
          <div class="skeleton" aria-busy="true">
            {t("loading")}
          </div>
        </Show>
        <Show when={props.state === "error"}>
          <div class="error" role="alert">
            {t("error")}
          </div>
        </Show>
        <Show when={props.state === "ready" || !props.state}>
          <div class="copyright">{props.copyright}</div>
        </Show>
      </div>
    </footer>
  )
}
