# Date and Time Picker Inputs with Popover Selection

Screen type: form
Primary task: Select or input specific dates and times for scheduling, filtering, or reporting

### Pattern 1: Date and Time Picker Inputs with Popover Selection
- Screen type: form
- Primary task: Select or input specific dates and times for scheduling, filtering, or reporting
- Composition archetype: multi-column-form
- Reading flow: date-picker-single → date-picker-range → time-picker-single → time-picker-range
- Density: comfortable
- Symmetry: symmetric
- Primary focal point: focused input and active popover
- Secondary focal points: input group labels
- Spacing rhythm: page 32 / section 32 / card 16 / base 4
- Typography:
  - Page title: 20px / weight 600 / lh 28
  - Section title: 16px / weight 500 / lh 24
  - Body: 14px / weight 400 / lh 20
- Surfaces: canvas neutral; cards selective; borders subtle; shadows minimal
- Color roles (adapt roles; keep product brand hues):
  - canvas: #FFFFFF (page background)
  - surface: #FFFFFF (input and popover backgrounds)
  - border: #F4F4F5 (input and popover borders)
  - text-primary: #18181B (input text)
  - text-muted: #71717A (placeholders and meta)
  - accent: #FF6A00 (active/focused states, primary actions)
- Fonts:
  - Onest · ui · weights 400, 500, 600
- Radii:
  - lg: 24px
  - md: 16px
  - sm: 8px
  - pill: 999px
- Components: date-picker-input (secondary), time-picker-input (secondary)
- Interactions: popover-on-focus, calendar-date-select, time-scroll-select
- Why it works: Grouping date and time pickers in columns supports quick comparison and entry. Popover pickers keep the main form uncluttered while providing rich selection tools. Consistent sizing and spacing improve scanability and reduce errors.
- Avoid when: Mobile-first workflows where popovers may be hard to use.; When only a single date or time input is needed.
- Summary: A desktop form pattern for selecting dates and times using input fields with popover pickers. Suitable for scheduling, reporting, or filtering workflows where precise temporal input is required. The composition uses clear grouping, comfortable density, and accent color for active states. Best for operational dashboards or forms in B2B SaaS; avoid on mobile or when only a single input is needed.

## Application rules
- Apply this composition to matching product screens in the current change (auth/register/login/landing as relevant).
- Keep product brand colors/logo; adapt spacing/type/surface/hierarchy from this pattern.
- Do not ignore this file because a prior layout exists — the change request may intentionally restyle those screens.
