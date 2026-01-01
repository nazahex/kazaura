/** @jsxImportSource solid-js */

import { createSolidLokat } from "@lokat/solid"
import { createSignal } from "solid-js"
import { render } from "solid-js/web"
import Muelle from "../src"

const loc = createSolidLokat({
  initialLocale: "en",
  initialDict: { loading: "Loading...", error: "Something went wrong" },
  loadLocale: async () => ({}),
})

function App() {
  const [state, setState] = createSignal<"loading" | "error" | "ready">("loading")
  return (
    <div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button type="button" onClick={() => setState("loading")}>
          Loading
        </button>
        <button type="button" onClick={() => setState("error")}>
          Error
        </button>
        <button type="button" onClick={() => setState("ready")}>
          Ready
        </button>
      </div>
      <Muelle lokat={loc} state={state()} />
    </div>
  )
}

const root = document.getElementById("root")
if (root) render(() => <App />, root)
