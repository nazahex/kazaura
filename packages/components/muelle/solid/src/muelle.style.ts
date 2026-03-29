import type * as CSS from "csstype"
import type { PlumetCanvas, PlumetConfig } from "plumet"

export interface MuelleStyleToken {
  MuelleZIndex?: CSS.Property.ZIndex
  MuelleFontSize?: CSS.Property.FontSize
  MuelleMaxWidth?: CSS.Property.MaxWidth
  MuelleShipMargin?: CSS.Property.Margin
  MuellePadding?: CSS.Property.Padding
  MuelleHeadPadding?: CSS.Property.Padding
  MuelleH2Fs?: CSS.Property.FontSize
  MuelleBannerPadding?: CSS.Property.Padding
  MuelleSloganPadding?: CSS.Property.Padding
  MuelleSocialsPadding?: CSS.Property.Padding
  MuelleSocialLinkGap?: CSS.Property.MarginRight
  MuelleGridGap?: CSS.Property.Gap
  MuelleGridMin?: CSS.Property.MinWidth
  MuelleSectionPadding?: CSS.Property.Padding
  MuelleSectionLiPadding?: CSS.Property.Padding
  MuelleSocialIconSize?: CSS.Property.Width | CSS.Property.Height
  MuelleIconFill?: CSS.Property.Fill
  MuelleClMain?: CSS.Property.Color
  MuelleClText?: CSS.Property.Color
  MuelleClLink?: CSS.Property.Color
  MuelleClLinkHov?: CSS.Property.Color
  MuelleClBorder?: CSS.Property.Border
  MuelleClH3?: CSS.Property.Color
  MuelleClSlogan?: CSS.Property.Color
  MuelleSectionsPadding?: CSS.Property.Padding
  MuelleSocketPadding?: CSS.Property.Padding
  MuelleSocketFontSize?: CSS.Property.FontSize
  MuelleSocketAlign?: CSS.Property.TextAlign
}

export default function createMuellePlumet(
  config: PlumetConfig,
  token: MuelleStyleToken,
): PlumetCanvas {
  return {
    config,
    style: {
      "#muelle": {
        $: {
          position: "relative",
          zIndex: token.MuelleZIndex ?? 5,
          fontSize: token.MuelleFontSize ?? "1em",
          borderTop: `1px solid ${token.MuelleClBorder ?? "var(--cl-border, #8883)"}`,
        },

        ul: {
          $: {
            margin: 0,
            padding: 0,
            listStyleType: "none",
          },
        },

        a: {
          $: {
            textDecoration: "none",
          },
        },

        h2: {
          $: {
            margin: 0,
            padding: token.MuelleHeadPadding ?? "1rem 0",
            color: token.MuelleClMain ?? "var(--cl-main)",
            fontSize: token.MuelleH2Fs ?? "2.25rem",
          },
        },

        h3: {
          $: {
            margin: 0,
            padding: token.MuelleHeadPadding ?? "1rem 0",
            color: token.MuelleClH3 ?? "var(--cl-3)",
          },
        },

        ".ship": {
          $: {
            display: "flex",
            flexWrap: "wrap",
            margin: token.MuelleShipMargin ?? "0 auto",
            padding: token.MuellePadding ?? "3rem 0",
            width: "100%",
            maxWidth: token.MuelleMaxWidth ?? "1200px",
          },
        },

        ".banner": {
          $: {
            flex: "2 1 200px",
            padding: token.MuelleBannerPadding ?? "0 3rem",
          },
          ".slogan": {
            $: {
              padding: token.MuelleSloganPadding ?? "1rem 0",
              color: token.MuelleClSlogan ?? "var(--cl-3)",
              width: "100%",
            },
          },
        },

        ".socials": {
          $: {
            display: "flex",
            padding: token.MuelleSocialsPadding ?? "1.5rem 0",
          },
          a: {
            $: {
              marginRight: token.MuelleSocialLinkGap ?? "1rem",
            },
          },
          svg: {
            $: {
              width: token.MuelleSocialIconSize ?? "1.5rem",
              height: token.MuelleSocialIconSize ?? "1.5rem",
              fill: token.MuelleIconFill ?? "var(--cl-0)",
            },
          },
        },

        ".sections": {
          $: {
            display: "grid",
            gridTemplateColumns: `repeat(auto-fit, minmax(${token.MuelleGridMin ?? "10rem"}, 1fr))`,
            flex: "5 1 350px",
            gap: token.MuelleGridGap ?? "1rem",
            padding: token.MuelleSectionsPadding ?? "0 2rem",
          },

          li: {
            $: {
              padding: token.MuelleSectionLiPadding ?? "0.25rem 0",
            },
          },

          a: {
            $: {},
            ":link, :visited": {
              $: {
                color: token.MuelleClLink ?? "var(--cl-link)",
              },
            },
            ":hover": {
              $: {
                color: token.MuelleClLinkHov ?? "var(--cl-link-hov)",
                textDecoration: "underline",
              },
            },
          },

          ".section": {
            $: {
              padding: token.MuelleSectionPadding ?? "0 1rem",
            },
          },
        },

        ".socket": {
          $: {
            borderTop: `1px solid ${token.MuelleClBorder ?? "var(--cl-border, #8883)"}`,
            padding: token.MuelleSocketPadding ?? "2rem 0",
            color: token.MuelleClText ?? "var(--cl-3)",
            fontSize: token.MuelleSocketFontSize ?? ".9rem",
            textAlign: token.MuelleSocketAlign ?? "center",
          },
        },
      },
    },
  }
}
