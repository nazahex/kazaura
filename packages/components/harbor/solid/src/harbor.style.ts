import type * as CSS from "csstype"
import type { PlumetCanvas, PlumetConfig } from "plumet"

export interface HarborStyleToken {
  /**
   * Root background color for the harbor (`#harbor`).
   * SCSS default: `var(--harbor-bg)` (provided by organ-level theme).
   */
  HarborBg?: CSS.Property.BackgroundColor

  /**
   * Root position for the harbor (`#harbor`).
   * SCSS default: `relative`.
   *
   */
  HarborPosition?: CSS.Property.Position
  HarborTop?: CSS.Property.Top
  HarborLeft?: CSS.Property.Left

  /**
   * Root height for the harbor bar.
   * SCSS default: `70px` (from `$harbor-height` fallback in SCSS).
   */
  HarborHeight?: CSS.Property.Height

  /**
   * z-index applied to `#naval`. SCSS default: `null`.
   */
  HarborZIndex?: CSS.Property.ZIndex

  HarborTransition?: CSS.Property.Transition

  HarborActiveBorder?: CSS.Property.Border
  HarborActiveBorderRadius?: CSS.Property.BorderRadius
  HarborActiveBackground?: CSS.Property.Background

  /**
   * Color used for hover states on links and buttons.
   * SCSS default: `var(--cl-0)`.
   */
  HarborClHover?: CSS.Property.Color

  /**
   * Grid template columns for `.ship` inside `#naval`.
   * SCSS default: `min-content auto auto`.
   */
  HarborShipColumns?: string

  /**
   * Color for the banner bold title (`#banner-panel .brand b`).
   * SCSS default: `var(--cl-4)`.
   */
  HarborBannerBCl?: CSS.Property.Color

  /**
   * Font size for the banner bold title. SCSS default: `1.2rem`.
   */
  HarborBannerBFz?: CSS.Property.FontSize

  /**
   * Color for the banner subtitle (`#banner-panel .brand span`).
   * SCSS default: `var(--cl-4)`.
   */
  HarborBannerSpanCl?: CSS.Property.Color

  /**
   * Font size for the banner subtitle. SCSS default: `.8rem`.
   */
  HarborBannerSpanFz?: CSS.Property.FontSize

  /**
   * Fill color used for SVG path inside the banner logo.
   * SCSS default: `var(--cl-4)`.
   */
  HarborBannerSvgFill?: CSS.Property.Color

  HarborBannerBLetterSpacing?: CSS.Property.LetterSpacing
  HarborBannerSpanLetterSpacing?: CSS.Property.LetterSpacing

  /**
   * Color used for basin links and buttons. SCSS default: `var(--cl-4)`.
   */
  HarborBasinCl?: CSS.Property.Color

  /**
   * Letter-spacing for basin links and buttons.
   */
  HarborBasinLetterSpacing?: CSS.Property.LetterSpacing

  /**
   * Top-level socket padding (not used by banner/basin; present for parity).
   */
  HarborSocketPadding?: CSS.Property.Padding

  /**
   * Font-size used for the socket area (footer-like region).
   */
  HarborSocketFontSize?: CSS.Property.FontSize

  /**
   * Text-align for the socket area.
   */
  HarborSocketAlign?: CSS.Property.TextAlign

  /**
   * Padding for the banner anchor element (`#banner-panel a`).
   * SCSS default: `0 1.5rem`.
   */
  HarborBannerPadding?: CSS.Property.Padding

  /**
   * Inner padding for the banner brand container (`#banner-panel a > div`).
   * SCSS default: `.75rem`.
   */
  HarborBannerDivPadding?: CSS.Property.Padding

  /**
   * Font weight for the banner bold title. SCSS default: `800`.
   */
  HarborBannerBFontWeight?: CSS.Property.FontWeight

  /**
   * Font weight for the banner subtitle. SCSS default: `400`.
   */
  HarborBannerSpanFontWeight?: CSS.Property.FontWeight

  /**
   * Stroke width applied to banner SVG paths. SCSS default: `4`.
   */
  HarborBannerSvgStrokeWidth?: CSS.Property.StrokeWidth

  /**
   * Padding for basin buttons (toggle buttons).
   * SCSS default: `0 1rem`.
   */
  HarborBasinButtonPadding?: CSS.Property.Padding

  /**
   * Padding for basin anchor links.
   * SCSS default: `0 1rem`.
   */
  HarborBasinAnchorPadding?: CSS.Property.Padding

  /**
   * Right padding for inline text inside basin items. SCSS default: `.25rem`.
   */
  HarborBasinSpanPaddingRight?: CSS.Property.PaddingRight

  /**
   * Margin-right for the `.links` group inside `#basin-panel`.
   * SCSS default: `2rem`.
   */
  HarborBasinLinksMarginRight?: CSS.Property.MarginRight

  /**
   * Height applied to non-chevron SVG icons in basin items. SCSS default: `1.25em`.
   */
  HarborBasinIconHeight?: CSS.Property.Height

  /**
   * Height applied to the chevron SVG used for toggles. SCSS default: `1em`.
   */
  HarborChevronHeight?: CSS.Property.Height

  HarborBasinActiveBackground?: CSS.Property.Background

  /**
   * Border for the hatch panel root. SCSS default: `1px solid #0000` (transparent).
   */
  HarborHatchBorder?: string

  /**
   * Border applied when hatch panel is active. SCSS default: `1px solid #8885`.
   */
  HarborHatchActiveBorder?: string

  /**
   * Border-radius for active hatch panel. SCSS default: `300px 300px 0 0`.
   */
  HarborHatchActiveBorderRadius?: string

  /**
   * Background for active hatch panel. SCSS default: `#8883`.
   */
  HarborHatchActiveBackground?: CSS.Property.Background

  /**
   * Background for the hatch toggle button. SCSS default: `#8883`.
   */
  HarborBtnHatchBackground?: CSS.Property.Background

  /**
   * Padding for the hatch toggle button. SCSS default: `.25rem`.
   */
  HarborBtnHatchPadding?: CSS.Property.Padding

  /**
   * Height for the hatch toggle button. SCSS default: `45px`.
   */
  HarborBtnHatchHeight?: CSS.Property.Height
}

export default function createHarborPlumet(
  config: PlumetConfig,
  token: HarborStyleToken,
): PlumetCanvas {
  return {
    config,
    style: {
      "#harbor": {
        $: {
          backgroundColor: token.HarborBg,
          height: token.HarborHeight ?? "70px",
          position: token.HarborPosition ?? "relative",
          zIndex: token.HarborZIndex,
          fontSize: "0px",
          whiteSpace: "nowrap",
          width: "100%",
          top: token.HarborTop,
          left: token.HarborLeft,
        },

        button: {
          $: {
            border: "none",
            background: "none",
          },
        },
        a: {
          $: {
            textDecoration: "none",
          },
        },
        ".ship": {
          $: {
            display: "grid",
            gridTemplateRows: token.HarborHeight ?? "70px",
            gridTemplateColumns: token.HarborShipColumns ?? "min-content auto auto",
          },
        },

        "#banner-panel": {
          $: {
            display: "flex",
          },
          a: {
            $: {
              display: "flex",
              alignItems: "center",
              transition: "color .2s",
              padding: token.HarborBannerPadding ?? "0 1.5rem",
              height: "100%",
              fontSize: "1rem",
            },

            "&:link, &:visited": {
              $: {
                color: token.HarborBannerBCl ?? "var(--cl-4)",
              },
            },

            div: {
              $: {
                display: "flex",
                flexWrap: "wrap",
                padding: token.HarborBannerDivPadding ?? ".75rem",
              },
            },

            b: {
              $: {
                width: "100%",
                color: token.HarborBannerBCl ?? "var(--cl-4)",
                fontWeight: token.HarborBannerBFontWeight ?? 800,
                fontSize: token.HarborBannerBFz ?? "1.2rem",
                letterSpacing: token.HarborBannerBLetterSpacing,
              },
            },
            span: {
              $: {
                color: token.HarborBannerSpanCl ?? "var(--cl-4)",
                fontWeight: token.HarborBannerSpanFontWeight ?? 400,
                fontSize: token.HarborBannerSpanFz ?? ".8rem",
                letterSpacing: token.HarborBannerSpanLetterSpacing,
              },
            },

            "&:hover b": {
              $: {
                color: token.HarborClHover ?? "var(--cl-0)",
              },
            },
          },
        },

        "#basin-panel": {
          $: {
            display: "inline-flex",
            alignItems: "center",
            height: "100%",
          },
          button: {
            $: {
              display: "inline-flex",
              alignItems: "center",
              height: "100%",
              fontSize: "1rem",
              transition: token.HarborTransition ?? "all .3s",
              border: "1px #0000 solid",
              background: "#0000",
              letterSpacing: token.HarborBasinLetterSpacing,
              padding: token.HarborBasinButtonPadding ?? "0 1rem",
              color: token.HarborBasinCl ?? "var(--cl-4)",
            },

            "&:hover, &.active": {
              $: {
                color: token.HarborClHover ?? "var(--cl-0)",
                border: token.HarborActiveBorder ?? "1px #8885 solid",
                borderBottom: "none",
                borderRadius: token.HarborActiveBorderRadius ?? "1rem 1rem 0 0",
                background:
                  token.HarborBasinActiveBackground ?? token.HarborActiveBackground ?? "#8882",
              },
            },
          },
          a: {
            $: {
              display: "inline-flex",
              alignItems: "center",
              transition: "color .2s",
              height: "100%",
              fontSize: "1rem", //
              letterSpacing: token.HarborBasinLetterSpacing,
              padding: token.HarborBasinAnchorPadding ?? "0 1rem",
              color: token.HarborBasinCl ?? "var(--cl-4)",
            },

            "&:hover": {
              $: {
                color: token.HarborClHover ?? "var(--cl-0)",
              },
            },
          },
          span: {
            $: {
              paddingRight: token.HarborBasinSpanPaddingRight ?? ".25rem",
            },
          },
          ".links": {
            $: {
              display: "inline-flex",
              alignItems: "center",
              height: "100%",
              marginRight: token.HarborBasinLinksMarginRight ?? "2rem",
            },
          },
          ".toggles": {
            $: {
              display: "inline-flex",
              alignItems: "center",
              height: "100%",
            },
          },
          "svg:not(.chevron)": {
            $: {
              height: token.HarborBasinIconHeight ?? "1.25em",
            },
          },
          "svg.chevron": {
            $: {
              transform: "rotate(0deg)",
              transition: "transform .7s",
              height: token.HarborChevronHeight ?? "1em",
            },
          },
          "button.active svg.chevron": {
            $: {
              transform: "rotate(180deg)",
            },
          },
        },

        "#util-panel": {
          $: {
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 .5rem",
            fontSize: "1rem",
          },
        },
        "#util-menu": {
          $: {
            display: "flex",
            marginRight: "1.25rem",
          },
          button: {
            $: {
              display: "inline-flex",
              alignItems: "center",
              transition: "all .3s",
              border: "none",
              background: "none",
              padding: "0 .25rem",
              height: "100%",
              fontSize: "1rem",
              color: token.HarborBasinCl ?? "var(--cl-4)",
            },

            "&:hover svg": {
              $: {
                stroke: token.HarborClHover ?? "var(--cl-0)",
              },
            },
          },
        },

        "#auth-menu": {
          $: {
            display: "flex",
            alignItems: "center",
            margin: "0 1rem",
            height: "100%",
            fontSize: "1rem",
          },
          a: {
            $: {},
          },
        },

        "#hatch-panel": {
          $: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "all .3s",
            border: token.HarborHatchBorder ?? "1px solid #0000",
            height: "100%",
          },
          "&.active": {
            $: {
              border: token.HarborHatchActiveBorder ?? "1px solid #8885",
              borderRadius: token.HarborHatchActiveBorderRadius ?? "300px 300px 0 0",
              background: token.HarborHatchActiveBackground ?? "#8883",
            },
          },
          "#btn-hatch": {
            $: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              borderRadius: "100%",
              background: token.HarborBtnHatchBackground ?? "#8883",
              padding: token.HarborBtnHatchPadding ?? ".25rem",
              aspectRatio: "1/1",
              height: token.HarborBtnHatchHeight ?? "45px",
            },
          },
        },

        "#btn-hatch": {
          $: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            borderRadius: "100%",
            background: token.HarborBtnHatchBackground ?? "#8883",
            padding: token.HarborBtnHatchPadding ?? ".25rem",
            aspectRatio: "1/1",
            height: token.HarborBtnHatchHeight ?? "45px",
          },
        },

        ".premium-gradient": {
          $: {},
        },
      },
    },
  }
}
