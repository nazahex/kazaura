/** @jsxImportSource solid-js */

import { createSolidLokat } from "@lokat/solid"
import { createSignal, onCleanup, onMount, Show } from "solid-js"
import { render } from "solid-js/web"
import Muelle from "../../../src"

// Eagerly import all local JSON dictionaries via the bundler. This avoids
// runtime fetches and yields near-zero latency on locale switches.
// biome-ignore lint/suspicious/noExplicitAny: sandbox only
const dicts = (import.meta as any).glob("./i18n/*.json", { eager: true }) as Record<
  string,
  { default: Record<string, string> }
>

const loc = createSolidLokat({
  initialLocale: "en",
  initialDict: dicts["./i18n/en.json"].default,
  loadLocale: async (l) => dicts[`./i18n/${l}.json`].default,
})

function App() {
  // Simple hash router with three routes: /, /docs, /about
  const getRoute = () => (location.hash?.slice(1) || "/") as "/" | "/docs" | "/about"
  const [route, setRoute] = createSignal<"/" | "/docs" | "/about">(getRoute())

  onMount(() => {
    const handler = () => setRoute(getRoute())
    window.addEventListener("hashchange", handler)
    onCleanup(() => window.removeEventListener("hashchange", handler))
  })

  return (
    <div>
      <nav style={{ display: "flex", gap: "12px", "margin-bottom": "12px" }}>
        <a href="#/">Home</a>
        <a href="#/docs">Docs</a>
        <a href="#/about">About</a>
      </nav>

      <div style={{ display: "flex", gap: "8px", "margin-bottom": "16px" }}>
        <button type="button" onClick={() => loc.setLocale("en")}>
          English
        </button>
        <button type="button" onClick={() => loc.setLocale("id")}>
          Indonesia
        </button>
      </div>

      <Show when={route() === "/"}>
        <section>
          <h1>Home</h1>
          <p>{loc.t("slogan")}</p>
        </section>
      </Show>

      <Show when={route() === "/docs"}>
        <section>
          <h1>Docs</h1>
          <p>{loc.t("service")}</p>
        </section>
      </Show>

      <Show when={route() === "/about"}>
        <section>
          <h1>About</h1>
          <p>Demonstration of routing and i18n.</p>
        </section>
      </Show>

      <Muelle
        lokat={loc}
        brand={{ title: loc.t("brand") }}
        slogan={loc.t("slogan")}
        socials={[{ name: "github", href: "https://github.com/nazator" }]}
        sections={[
          {
            title: loc.t("service"),
            items: [
              { label: loc.t("learn"), href: loc.t("r_learn") },
              { label: loc.t("learn"), href: loc.t("r_learn") },
              { label: loc.t("learn"), href: loc.t("r_learn") },
            ],
          },
        ]}
        state="ready"
      />
    </div>
  )
}

const root = document.getElementById("root")
if (root) render(() => <App />, root)
