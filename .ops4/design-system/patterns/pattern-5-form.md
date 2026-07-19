# multi-section entity creation form

Screen type: form
Primary task: create a new entity with structured and descriptive data

### Pattern 1: multi-section entity creation form
- Screen type: form
- Primary task: create a new entity with structured and descriptive data
- Composition archetype: sidebar-header-content
- Reading flow: page-header → breadcrumb → main-form-card → form-sections → form-actions
- Density: comfortable
- Symmetry: asymmetric
- Primary focal point: main-form-card
- Secondary focal points: sidebar-navigation, form-actions
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
- Components: form-section (secondary), sidebar-navigation (secondary), form-actions (secondary)
- Interactions: sticky-form-actions, sectioned-form, row-hover-actions
- Why it works: Logical grouping of fields reduces cognitive load. Sidebar navigation keeps users oriented within the product. Sticky actions improve completion rates for long forms.
- Avoid when: Short forms or modal dialogs; Mobile-only workflows; When inline editing is required
- Summary: This is a multi-section entity creation form pattern for desktop SaaS, supporting operators in creating new records with both structured fields and rich descriptions. The layout uses a sidebar-header-content archetype, with logical form sections, sticky actions, and clear visual hierarchy via whitespace and scale. Best for complex creation flows in admin or operational tools; avoid for short forms or mobile-first experiences.

## Application rules
- Apply this composition to matching product screens in the current change (auth/register/login/landing as relevant).
- Keep product brand colors/logo; adapt spacing/type/surface/hierarchy from this pattern.
- Do not ignore this file because a prior layout exists — the change request may intentionally restyle those screens.
