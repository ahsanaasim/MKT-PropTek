# Sidebar list-table with filter bar

Screen type: list_table
Primary task: Browse, filter, and manage a list of entities (e.g., events, users, transactions).

### Pattern 1: Sidebar list-table with filter bar
- Screen type: list_table
- Primary task: Browse, filter, and manage a list of entities (e.g., events, users, transactions).
- Composition archetype: sidebar-header-content
- Reading flow: page-header → filter-bar → main-table
- Density: comfortable
- Symmetry: asymmetric
- Primary focal point: main-table
- Secondary focal points: filter-bar, add-new-action
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
- Fonts:
  - Inter · ui · weights 400, 500, 600
- Radii:
  - lg: 12px
  - md: 8px
  - sm: 4px
  - pill: 999px
- Components: summary-metric (secondary)
- Interactions: row-hover-actions, filter-bar, pagination
- Why it works: Sidebar and header separation supports multitasking and orientation. Filter and action bar above the table enables rapid data refinement. Table-first layout prioritizes scannability and bulk management.
- Avoid when: Mobile-only experiences.; Highly visual or card-based content.; Dense inline editing requirements.
- Summary: A desktop list-table pattern with sidebar navigation, filter/action bar, and a dense, scannable table for managing entities. Primary task is browsing, filtering, and acting on large datasets. The sidebar-header-content composition supports multitasking and quick navigation, with clear hierarchy via scale, contrast, and whitespace. Suitable for operational dashboards and admin panels; avoid for mobile-first or highly visual content.

## Application rules
- Apply this composition to matching product screens in the current change (auth/register/login/landing as relevant).
- Keep product brand colors/logo; adapt spacing/type/surface/hierarchy from this pattern.
- Do not ignore this file because a prior layout exists — the change request may intentionally restyle those screens.
