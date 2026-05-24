/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
// POWERHOP DESIGN SYSTEM — Tailwind Config
// Version 1.0 · March 2026
//
// USAGE
//   Drop this file at the root of every PowerHop app (replace tailwind.config.js).
//   This config extends Tailwind defaults — all standard utilities still work.
//   Use the `ph-*` custom tokens for all brand-specific styling.
//
// APPS COVERED
//   - Shopify Storefront    (light theme, customer-facing)
//   - Customer Webapp       (light theme, customer-facing)
//   - Operations Webapp     (dark theme, internal)
//   - Fleet Intelligence    (dark theme, internal)
//   - PowerHop Backend      (dark theme, internal — admin UI only)
//
// FONTS
//   Import in your global CSS:
//     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
//   Barlow Condensed is for the brand wordmark only — not for UI elements.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],

  // ── Dark mode ──────────────────────────────────────────────────────────────
  // Internal apps: set <html class="dark"> on mount (always dark)
  // Customer apps: omit the class (always light) or allow OS preference
  darkMode: "class",

  theme: {
    extend: {
      // ── Brand color palette ──────────────────────────────────────────────
      colors: {
        // Primary brand green (Nigeria Green)
        // Usage: primary actions, active states, accent elements, links
        brand: {
          DEFAULT: "#008751", // Nigeria Green — primary brand color
          light: "#00A862", // Lighter accent — hover states, highlights
          dark: "#006B40", // Pressed / active states
          muted: "#004D2E", // Subtle green tint on dark backgrounds
          faint: "#001F12", // Barely-there green — dark mode surface tint
          accent: "#E0F3EB", // Use for soft green contrast on buttons or backgrounds
        },

        // Neutral scale — dark theme (internal ops apps)
        // ph-dark-* tokens: use these in Operations Webapp & Fleet Dashboard
        dark: {
          bg: "#0A0A0A", // Page background
          surface: "#111111", // Card / panel background
          elevated: "#1A1A1A", // Elevated surface (modals, dropdowns)
          border: "#2A2A2A", // Default border
          subtle: "#333333", // Subtle dividers, hover backgrounds
          muted: "#666666", // Disabled / muted text
          secondary: "#AAAAAA", // Secondary text
          primary: "#F5F5F5", // Primary text
        },

        // Neutral scale — light theme (customer-facing apps)
        // ph-light-* tokens: use these in Shopify Storefront & Customer Webapp
        light: {
          bg: "#FFFFFF", // Page background
          surface: "#F7F7F7", // Card / panel background
          elevated: "#EFEFEF", // Elevated surface
          border: "#E0E0E0", // Default border
          subtle: "#D0D0D0", // Subtle dividers
          muted: "#999999", // Disabled / muted text
          secondary: "#555555", // Secondary text
          primary: "#0A0A0A", // Primary text
        },

        // ── Semantic / status colors ─────────────────────────────────────
        // CRITICAL: These must be used consistently across ALL five apps.
        // A red alert must look identical in Fleet Dashboard and Customer Webapp.

        status: {
          // Success — resolved cases, full battery, unit online
          success: "#008751", // = brand.DEFAULT (green is success)
          "success-bg": "#001F12", // Dark bg tint
          "success-text": "#00C97A", // Light text on dark surface

          // Warning — degraded, approaching threshold, yellow connectivity tier
          warning: "#D97706",
          "warning-bg": "#1C1200",
          "warning-text": "#FCD34D",

          // Alert — orange connectivity tier (10–60 min offline)
          alert: "#EA580C",
          "alert-bg": "#1F0C00",
          "alert-text": "#FB923C",

          // Critical — red connectivity tier (>1h offline), geofence breach
          critical: "#DC2626",
          "critical-bg": "#1F0000",
          "critical-text": "#F87171",

          // Info — neutral informational, pending states
          info: "#2563EB",
          "info-bg": "#00081F",
          "info-text": "#93C5FD",

          // Offline tiers — Fleet Intelligence Dashboard specific
          // Map directly to the PRD Section 7.2 connectivity classification
          online: "#008751", // ≤ 10 min: normal
          "warn-yellow": "#D97706", // 10–60 min: yellow warning
          "warn-orange": "#EA580C", // 1–24 h: orange alert
          "offline-red": "#DC2626", // > 24 h: red critical
        },

        // ── Case status colors ────────────────────────────────────────────
        // Operations Webapp — support case status badges
        // Maps to the 9 statuses in PRD Section 6.4
        case: {
          open: "#2563EB", // Blue — new, unactioned
          "in-progress": "#D97706", // Amber — actively being worked
          "pending-technician": "#7C3AED", // Purple — in queue
          assigned: "#0891B2", // Cyan — picked up
          "on-site": "#059669", // Teal green — physically present
          escalated: "#DC2626", // Red — stalled
          resolved: "#008751", // Brand green — work complete
          closed: "#555555", // Gray — done
          cancelled: "#374151", // Dark gray — void
        },

        // ── Battery / SoC colors ─────────────────────────────────────────
        // Customer Webapp & Fleet Dashboard — PowerUnit battery display
        battery: {
          full: "#008751", // 80–100%
          good: "#22C55E", // 50–79%
          medium: "#D97706", // 20–49%
          low: "#EA580C", // 10–19%
          critical: "#DC2626", // < 10%
        },
      },

      // ── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        // Primary UI font — ALL platform apps, ALL contexts
        sans: ["Inter", "system-ui", "sans-serif"],

        // Marketing / brand headings only
        // Use on Shopify Storefront hero sections & Customer Webapp landing page
        // DO NOT use inside the operational UI (tables, forms, dashboards)
        display: ["'Barlow Condensed'", "sans-serif"],

        // Brand wordmark — not for UI use
        // Reference only; the wordmark is always a pre-rendered asset
        wordmark: ["'Barlow Condensed'", "sans-serif"],

        // Monospace — telemetry values, SNR codes, firmware versions, raw data
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
      },

      // ── Type scale ────────────────────────────────────────────────────────
      fontSize: {
        // Standard Inter UI scale
        xs: ["11px", { lineHeight: "16px", letterSpacing: "0.01em" }],
        sm: ["12px", { lineHeight: "18px" }],
        base: ["14px", { lineHeight: "20px" }],
        md: ["15px", { lineHeight: "22px" }],
        lg: ["16px", { lineHeight: "24px" }],
        xl: ["18px", { lineHeight: "28px" }],
        "2xl": ["20px", { lineHeight: "30px" }],
        "3xl": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em" }],
        "4xl": ["30px", { lineHeight: "38px", letterSpacing: "-0.02em" }],
        // Marketing scale (Shopify Storefront / Customer Webapp hero)
        hero: ["48px", { lineHeight: "54px", letterSpacing: "-0.02" }],
        huge: ["64px", { lineHeight: "72px", letterSpacing: "0" }],
      },

      // ── Font weights ──────────────────────────────────────────────────────
      fontWeight: {
        normal: "400", // Body text, descriptions
        medium: "500", // Labels, table headers, navigation
        semibold: "600", // Section headings, card titles, CTA buttons
        bold: "700", // 700+ is reserved for marketing display headings only
        extrabold: "800", // Use only in the wordmark, never in UI elements
        black: "900", // Use only in the wordmark, never in UI elements
      },

      // ── Border radius ─────────────────────────────────────────────────────
      borderRadius: {
        none: "0",
        sm: "4px", // Badges, small chips
        DEFAULT: "6px", // Default — inputs, small cards
        md: "8px", // Cards, panels, modals
        lg: "10px", // Large cards, dialogs
        xl: "14px", // Feature cards (marketing only)
        full: "9999px", // Pills, avatar circles
      },

      // ── Spacing ───────────────────────────────────────────────────────────
      // Extend with named semantic spacing tokens
      spacing: {
        18: "72px",
        22: "88px",
        sidebar: "240px", // Standard sidebar width (Operations/Fleet)
        topbar: "56px", // Standard topbar height
      },

      // ── Shadows ───────────────────────────────────────────────────────────
      boxShadow: {
        // Dark theme shadows (internal apps)
        "dark-sm": "0 1px 3px rgba(0,0,0,0.4)",
        "dark-md": "0 4px 12px rgba(0,0,0,0.5)",
        "dark-lg": "0 8px 24px rgba(0,0,0,0.6)",
        // Light theme shadows (customer apps)
        "light-sm": "0 1px 3px rgba(0,0,0,0.08)",
        "light-md": "0 4px 12px rgba(0,0,0,0.10)",
        "light-lg": "0 8px 24px rgba(0,0,0,0.12)",
        // Brand green glow — use sparingly for primary CTAs
        brand: "0 0 0 3px rgba(0,135,81,0.35)",
      },

      // ── Transitions ───────────────────────────────────────────────────────
      transitionDuration: {
        fast: "100ms",
        DEFAULT: "150ms",
        slow: "250ms",
      },

      // ── Z-index scale ─────────────────────────────────────────────────────
      zIndex: {
        sidebar: "40",
        topbar: "50",
        dropdown: "60",
        modal: "70",
        toast: "80",
      },
    },
  },

  plugins: [
    // Add tailwindcss-animate here if this app starts using shadcn/ui animations.
  ],
};
