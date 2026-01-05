/** @jsxImportSource solid-js */

import { createSolidLokat } from "@lokat/solid"
import { renderToString } from "solid-js/web"
import Harbor, {
  HarborAuthButtons,
  HarborBanner,
  HarborBasinPanel,
  HarborHatchPanel,
  HarborLangSwitchButton,
  HarborShell,
  HarborThemeSwitch,
  HarborUtilPanel,
} from "/home/kaizansultan/Project/nazahex/kazaura/packages/components/harbor/solid/src"

const lokat = createSolidLokat({
  initialLocale: "en",
  initialDict: { brand: "Kazaura" },
  loadLocale: async () => ({ brand: "Kazaura" }),
})

function makeNav(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    label: `Link ${i + 1}`,
    href: "#",
  }))
}

export function renderStatic(): string {
  return renderToString(() => (
    <Harbor lokat={lokat} brand={{ title: lokat.t("brand") }} state="ready" />
  ))
}

// For Harbor, treat "sections" as an alias for many nav items
export function renderSections(n: number): string {
  return renderToString(() => (
    <HarborShell>
      <HarborBanner brand={{ title: lokat.t("brand") }} />
      <HarborBasinPanel nav={makeNav(n)} />
    </HarborShell>
  ))
}

// Full composition using all panels (banner, basin, util, auth, hatch)
export function renderFull(): string {
  return renderToString(() => (
    <HarborShell>
      <HarborBanner brand={{}} lokat={lokat} />
      <HarborBasinPanel nav={makeNav(10)} lokat={lokat} />
      <HarborUtilPanel>
        <HarborLangSwitchButton lang={{ label: "Language", onClick: () => {} }} lokat={lokat} />
        <HarborThemeSwitch ambience={{ onDark: () => {}, onLight: () => {} }} lokat={lokat} />
      </HarborUtilPanel>
      <HarborAuthButtons
        authLinks={{
          signup: { label: "Sign Up", href: "#" },
          login: { label: "Login", href: "#" },
        }}
      />
      <HarborHatchPanel
        user={{
          isLoggedIn: true,
          isPremium: true,
          avatarSlot: () => <span class="avatar">U</span>,
          dashboardHref: "#",
        }}
        lokat={lokat}
      />
    </HarborShell>
  ))
}
