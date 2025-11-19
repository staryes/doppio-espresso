import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "地圖與食譜",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "zh-TW",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        # lightMode: {
        #   light: "#faf8f8",
        #   lightgray: "#e5e5e5",
        #   gray: "#b8b8b8",
        #   darkgray: "#4e4e4e",
        #   dark: "#2b2b2b",
        #   secondary: "#284b63",
        #   tertiary: "#84a59d",
        #   highlight: "rgba(143, 159, 169, 0.15)",
        #   textHighlight: "#fff23688",
        # },
        # darkMode: {
        #   light: "#161618",
        #   lightgray: "#393639",
        #   gray: "#646464",
        #   darkgray: "#d4d4d4",
        #   dark: "#ebebec",
        #   secondary: "#7b97aa",
        #   tertiary: "#84a59d",
        #   highlight: "rgba(143, 159, 169, 0.15)",
        #   textHighlight: "#b3aa0288",
        # },
        darkMode: { // Rosé Pine Main
          light: "#191724", // base 
          lightgray: "#1f1d2e", // surface 
          gray: "#6e6a86", // muted
          darkgray: "#e0def4", // text 
          dark: "#ebbcba", // rose 
          secondary: "#9ccfd8", // foam
          tertiary: "#c4a7e7", // iris 
          highlight: "#403d52", // highlight med
          textHighlight: "rgba(235,111,146, 0.53)" // love, 53% opacity 
        }, 
        lightMode: { // Rosé Pine Dawn
          light: "#faf4ed", // base 
          lightgray: "#fffaf3", // surface 
          gray: "#9893a5", // muted 
          darkgray: "#575279", // text 
          dark: "#d7827e", // rose 
          secondary: "#56949f", // foam
          tertiary: "#907aa9", // iris 
          highlight: "#dfdad9", // highlight med
          textHighlight:"rgba(180,99,122, 0.53)", // love, 53% opacity 
        }, 
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter({ delims: "+++", language: "toml" }), // if toml frontmatter
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      // Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.OxHugoFlavouredMarkdown(),          
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
