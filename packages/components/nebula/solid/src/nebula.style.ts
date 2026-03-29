import type * as CSS from "csstype"
import type { PlumetCanvas, PlumetConfig } from "plumet"

export interface NebulaStyleToken {
  NebulaDisplay?: CSS.Property.Display
  NebulaJustifyContent?: CSS.Property.JustifyContent
  NebulaAlignItems?: CSS.Property.AlignItems
  NebulaTransition?: CSS.Property.Transition
  NebulaWidth?: CSS.Property.Width
  NebulaMinHeight?: CSS.Property.MinHeight
  NebulaFontSize?: CSS.Property.FontSize
  NebulaHeadMargin?: CSS.Property.Margin
  NebulaHeadPadding?: CSS.Property.Padding
  NebulaH1FontWeight?: CSS.Property.FontWeight
  NebulaH1FontSize?: CSS.Property.FontSize
  NebulaPMargin?: CSS.Property.Margin
  NebulaPMaxWidth?: CSS.Property.MaxWidth
  NebulaPFontSize?: CSS.Property.FontSize
  NebulaPLineHeight?: CSS.Property.LineHeight
}

export default function createNebulaPlumet(
  config: PlumetConfig,
  token: NebulaStyleToken,
): PlumetCanvas {
  return {
    config,
    style: {
      "#nebula": {
        $: {
          display: token.NebulaDisplay ?? "flex",
          justifyContent: token.NebulaJustifyContent ?? "center",
          alignItems: token.NebulaAlignItems ?? "center",
          transition: token.NebulaTransition ?? "all .5s ease-in",
          width: token.NebulaWidth ?? "100%",
          minHeight: token.NebulaMinHeight ?? "100vh",
          fontSize: token.NebulaFontSize ?? "1.3rem",
        },

        "h1, h2, h3": {
          $: {
            margin: token.NebulaHeadMargin ?? 0,
            padding: token.NebulaHeadPadding ?? "0 2rem",
          },
        },

        h1: {
          $: {
            fontWeight: token.NebulaH1FontWeight ?? 300,
            fontSize: token.NebulaH1FontSize ?? "2.5rem",
          },
        },

        p: {
          $: {
            margin: token.NebulaPMargin ?? "1.5rem 0",
            maxWidth: token.NebulaPMaxWidth ?? "700px",
            fontSize: token.NebulaPFontSize ?? "1rem",
            lineHeight: token.NebulaPLineHeight ?? 1.7,
          },
        },
      },
    },
  }
}
