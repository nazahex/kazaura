/** @jsxImportSource solid-js */

import { createSolidLokat } from "@lokat/solid"
import { render } from "solid-js/web"
import Muelle from "../src"

const loc = createSolidLokat({
  initialLocale: "en",
  initialDict: { brand: "nazator" },
  loadLocale: async () => ({}),
})

function App() {
  return <Muelle lokat={loc} brand={{ title: "nazator" }} state="ready" />
}

const root = document.getElementById("root")
if (root) render(() => <App />, root)
