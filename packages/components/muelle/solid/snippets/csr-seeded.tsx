/** @jsxImportSource solid-js */

import { createSolidLokat } from "@lokat/solid"
import { render } from "solid-js/web"
import Muelle from "../src"

const loc = createSolidLokat({
  initialLocale: "en",
  initialDict: {
    brand: "nazator",
    slogan: "Build with rigor",
    service: "Service",
    learn: "Learn",
    r_learn: "/learn",
  },
  loadLocale: async (l) => fetch(`/i18n/${l}.json`).then((r) => r.json()),
})

function App() {
  return (
    <Muelle
      lokat={loc}
      brand={{ title: "nazator" }}
      slogan={loc.t("slogan")}
      socials={[{ name: "github", href: "https://github.com/nazator" }]}
      sections={[
        { title: loc.t("service"), items: [{ label: loc.t("learn"), href: loc.t("r_learn") }] },
      ]}
      state="ready"
    />
  )
}

const root = document.getElementById("root")
if (root) render(() => <App />, root)
