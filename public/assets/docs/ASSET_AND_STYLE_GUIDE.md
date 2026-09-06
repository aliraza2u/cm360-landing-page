# CM360 Landing Page Asset & Style Guide

## Important clarification
The earlier AI-generated landing-page reference is a flattened image, so it did **not** contain exportable Photoshop/Figma layers. The original background, crane, blueprint grid, glows, etc. did not exist as separate source files.

This pack recreates those elements as production-ready SVG assets so Cursor can implement the same visual language instead of guessing it.

## Which files are real implementation assets?

### `assets/hero-gradient-blueprint.svg`
Use as the hero background visual layer. It already contains:
- deep-blue → electric-blue → cyan background
- blueprint grid
- subtle construction-building linework
- crane linework
- controlled light glows

Use it as a background image or absolutely-positioned `<Image>` behind the hero content.
Do **not** put the product screenshot inside this asset. Keep product UI separate so it remains responsive and replaceable.

### `assets/blueprint-grid-overlay.svg`
Transparent overlay only.
Useful on light sections when a section needs a subtle construction/technical texture.
Use at low opacity, usually 0.25–0.45.

### `assets/construction-line-art.svg`
Transparent building + crane line illustration.
Use as a decorative layer on:
- hero edge
- CTA
- selected feature sections

Do not repeat it in every section.

### `assets/section-glow-orbs.svg`
Transparent blue/indigo/cyan glow layer.
Use behind product mockups or feature sections.
Do not use behind body text.

### `assets/cta-gradient-blueprint.svg`
Ready-to-use final CTA background.
Place CTA content over it.

### `assets/problem-scattered-records.svg`
Illustration for the Problem → Solution section.
It represents:
- notebook records
- chat/messages
- spreadsheet records
- movement into one connected system

This avoids using branded WhatsApp/Excel assets while preserving the concept.

Each SVG also has a PNG fallback in the same folder. On the web, prefer SVG.

---

# Product screenshots / device mockups
Do not use AI-generated fake product screenshots as final assets if the Next.js project already contains real or existing dummy CM360 UI screenshots.

Cursor should:
1. locate current desktop dashboard screenshot
2. locate current mobile screenshot
3. locate project/labour/financial screenshots
4. place those inside CSS/browser/device frames

Use CSS for device chrome:
- white or very light browser frame
- 20–24px radius
- subtle 1px blue/gray border
- strong product shadow
- small macOS-style browser dots only if already appropriate

This makes the product screenshots replaceable later without regenerating graphics.

---

# Fonts
Use **Inter** everywhere to stay consistent with the CM360 application.

Preferred:
`Inter Variable`

Weights:
- 400 body
- 500 UI/support
- 600 buttons/small titles
- 700 section headings
- 800 hero/display

Do not introduce a second display font unless the existing Next.js project already has one intentionally.

## Desktop typography
- Hero H1: 64px / 1.02 / 800 / -0.045em
- H2: 44px / 1.08 / 700–800 / -0.035em
- H3: 28px / 1.16 / 700
- Large body: 18px / 1.7 / 400
- Body: 16px / 1.7 / 400
- Small: 14px / 1.55 / 500
- Eyebrow: 12px / 1 / 700 / 0.12em uppercase

## Tablet
- Hero: 52px
- H2: 38px
- H3: 25px
- Body: 15–17px

## Mobile
- Hero: 40px
- H2: 32px
- H3: 23px
- Body: 15–16px

Use `clamp()` where helpful rather than many hard breakpoints.

---

# Core colors
- Deep navy: `#0B2344`
- Navy: `#0D2E5C`
- Main blue: `#1677FF`
- Electric blue: `#2F6BFF`
- Cyan: `#23C7E8`
- Indigo: `#5A4CF2`
- Mint accent: `#44D7B6`
- Warm accent: `#FFAA3B`
- Primary text: `#0A2240`
- Secondary text: `#64748B`
- Main page: `#F7FBFF`
- Light blue surface: `#EDF6FF`
- White: `#FFFFFF`

## Primary gradient
`linear-gradient(135deg,#145CEB 0%,#178BFA 48%,#22C7E8 100%)`

## Hero gradient
`linear-gradient(135deg,#0B3C9D 0%,#1267E9 36%,#168EF7 72%,#22C7E8 100%)`

---

# Spacing / layout
Max content width:
`1240px`

Container horizontal padding:
- desktop: 32px
- tablet: 24px
- mobile: 20px

Section vertical spacing:
- desktop: 112px
- tablet: 88px
- mobile: 68px

Use larger spacing between different stories, smaller spacing within one content group.

Avoid dozens of separate bordered boxes.

---

# Radius
- small controls/chips: 10–12px
- normal surfaces: 16–18px
- major visual surfaces: 24–28px
- avoid pill shapes for everything

# Shadows
Product visual:
`0 28px 80px rgba(8,36,82,.22)`

Normal elevated surface:
`0 16px 50px rgba(11,35,68,.10)`

Floating glass chip:
`0 12px 36px rgba(12,56,128,.18)`

---

# Hero implementation
Desktop:
- 44–48% copy
- 52–56% product visual
- min hero height around 720–800px depending on header
- product screenshot can break slightly beyond normal content grid for drama
- mobile preview overlaps desktop screen

Mobile:
- copy first
- CTAs
- trust points
- product visual below
- do not keep desktop absolute offsets
- avoid product screenshot becoming tiny

Hero background asset should fill the hero but text needs sufficient contrast.
If hero uses dark background, text should be white; muted copy can be `rgba(255,255,255,.78)`.

---

# Section rhythm
Do not keep every section white.

Recommended rhythm:
1. Hero: rich blue gradient
2. Problem: white
3. Connected workflow: soft light blue
4. Product section 1: white
5. Product section 2: soft blue / white blend
6. Product section 3: white
7. Finance: light blue highlighted surface
8. Outcomes: white
9. Multi-device: soft gradient
10. Audience: white
11. Trust: very light blue
12. CTA: vivid gradient
13. Footer: white / pale blue

This alternating rhythm is essential to avoid the current school-project/card-grid look.

---

# Content rules
Use approved CM360 product language:
- Projects
- Clients
- Client Payments
- Project Expenses
- Vendors
- Sub Contractors
- Sub Contractor Payments
- Site Labour
- Attendance
- Payroll
- Temporary Labour
- Employees
- Salary Payments
- Office Expenses
- User Access
- Reports / dashboards

Do not invent features.

Do not use `Team` where the application now uses `User Access`.

---

# Animation
Only subtle:
- hero visual entrance
- slight CTA/button hover
- 2–4px card lift where useful
- subtle floating product chips
- optional slow glow movement

Respect `prefers-reduced-motion`.
