/** @jsxImportSource solid-js */

import { createSolidLokat } from "@lokat/solid"
import { render } from "solid-js/web"
import Muelle from "../src"

const dict = {
  slogan: "Build with rigor",
  service: "Service",
  learn: "Learn",
  r_learn: "/learn",
}

const loc = createSolidLokat({
  initialLocale: "en",
  initialDict: dict,
  loadLocale: async () => dict,
})

function App() {
  return (
    <Muelle
      lokat={loc}
      brand={{ title: "nazator" }}
      slogan={loc.t("slogan")}
      sections={[
        { title: loc.t("service"), items: [{ label: loc.t("learn"), href: loc.t("r_learn") }] },
      ]}
      state="ready"
    />
  )
}

const root = document.getElementById("root")
if (root) render(() => <App />, root)
