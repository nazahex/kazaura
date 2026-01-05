/** @jsxImportSource solid-js */

import { createSolidLokat } from "@lokat/solid"
import { hydrate } from "solid-js/web"
import Component from "/home/kaizansultan/Project/nazahex/kazaura/packages/components/muelle/solid/src"

const lokat = createSolidLokat({
  initialLocale: "en",
  initialDict: { brand: "Kazaura", slogan: "Build fast" },
  loadLocale: async () => ({ brand: "Kazaura", slogan: "Build fast" }),
})

function makeSections(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    title: `Section ${i + 1}`,
    items: Array.from({ length: 5 }, (_, j) => ({ label: `Link ${j + 1}`, href: "#" })),
  }))
}

export function hydrateStatic(container: Element) {
  return hydrate(
    () => (
      <Component
        lokat={lokat}
        brand={{ title: lokat.t("brand") }}
        slogan={lokat.t("slogan")}
        state="ready"
      />
    ),
    container,
  )
}

export function hydrateSections(container: Element, n: number) {
  return hydrate(
    () => (
      <Component
        lokat={lokat}
        brand={{ title: lokat.t("brand") }}
        slogan={lokat.t("slogan")}
        sections={makeSections(n)}
        state="ready"
      />
    ),
    container,
  )
}
