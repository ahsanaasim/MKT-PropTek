# Sidebar dashboard with summary metrics and tabular list

Screen type: list_table
Primary task: Review, filter, and act on transactional records with supporting KPIs

### Pattern 1: Sidebar dashboard with summary metrics and tabular list
- Screen type: list_table
- Primary task: Review, filter, and act on transactional records with supporting KPIs
- Composition archetype: sidebar-header-content
- Reading flow: sidebar-navigation → page-header → filters-row → summary-metrics-row → main-table
- Density: comfortable
- Symmetry: asymmetric
- Primary focal point: main-table
- Secondary focal points: summary-metrics-row, filters-row
- Spacing rhythm: page 32 / section 32 / card 16 / base 4
- Typography:
  - Page title: 28px / weight 600 / lh 34
  - Section title: 16px / weight 600 / lh 24
  - Body: 14px / weight 400 / lh 20
- Surfaces: canvas neutral; cards selective; borders subtle; shadows minimal
- Color roles (adapt roles; keep product brand hues):
  - canvas: #F8FAFC (page background)
  - surface: #FFFFFF (cards / panels)
  - border: #E2E8F0 (dividers)
  - text-primary: #0F172A (titles / body)
  - text-muted: #64748B (meta / secondary)
  - accent: #2563EB (primary actions)
  - success: #22C55E (paid status badge)
  - warning: #FACC15 (refunded status badge)
- Fonts:
  - Inter · ui · weights 400, 500, 600
- Radii:
  - lg: 12px
  - md: 8px
  - sm: 4px
  - pill: 999px
- Components: summary-metric (secondary), tab (secondary), data-table (secondary), status-badge (secondary), pagination (secondary)
- Interactions: row-hover-actions, tab-switching, filter-dropdowns, pagination
- Why it works: Sidebar and header separation supports multitasking and persistent navigation. Summary metrics contextualize the table, aiding quick decision-making. Tabs and filters reduce page reloads and keep users in flow.
- Avoid when: Mobile-first or single-task flows.; When data is too sparse for tabular presentation.
- Summary: A sidebar dashboard pattern for desktop B2B SaaS, featuring summary metrics and a tabular list as the primary region. Users can filter, scan, and act on transactional records, with persistent navigation and at-a-glance KPIs. The composition uses a sidebar-header-content archetype, with clear visual hierarchy and comfortable density. Best for operational dashboards or admin panels; avoid for mobile-first or single-task flows.

## Application rules
- Apply this composition to matching product screens in the current change (auth/register/login/landing as relevant).
- Keep product brand colors/logo; adapt spacing/type/surface/hierarchy from this pattern.
- Do not ignore this file because a prior layout exists — the change request may intentionally restyle those screens.
