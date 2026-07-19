# Design Pattern Brain briefs

Retrieved composition patterns — REQUIRED for matching screen types (esp. auth/register/login). Apply structure/spacing/hierarchy; keep product brand tokens. Do not copy proprietary branding.

- [Horizontal Scroll Journey](./pattern-1-landing.md)
- [Interactive 3D Configurator](./pattern-2-landing.md)
- [Centered authentication card](./pattern-3-authentication.md)
- [Centered authentication card](./pattern-4-authentication.md)
- [multi-section entity creation form](./pattern-5-form.md)
- [Date and Time Picker Inputs with Popover Selection](./pattern-6-form.md)
- [Sidebar dashboard with summary metrics and tabular list](./pattern-7-list-table.md)
- [Sidebar + header + filterable table with pagination](./pattern-8-list-table.md)

## Design Pattern Brain (composition geometry only — keep locked product tokens)
These patterns are approved visual-memory references.
Apply archetype, reading flow, density, hierarchy, spacing rhythm, and surface structure only. DO NOT adopt reference hex colors or font families — use locked designMemory tokens.
KEEP this product's brand tokens (logo, primary brand color, locked Figma/product colors) — do not clone proprietary branding/copy from the reference product.
If a retrieved pattern is a centered auth/register card and the current screen is a heavier multi-panel auth layout, RESHAPE the auth/register screen to match the pattern archetype.

### Pattern 1: Horizontal Scroll Journey
- Screen type: landing
- Primary task: Convert visitor / communicate value
- Composition archetype: Horizontal Scroll Journey
- Reading flow: Intro (Vertical) → The Journey (Horizontal Track) → Detail Reveal → Vertical Footer
- Density: spacious
- Symmetry: symmetric
- Primary focal point: Hero / primary CTA
- Secondary focal points: Features, Social proof
- Surfaces: canvas light marketing page; cards Continuous palette transition. Chapter colors. Progress bar #000000.; borders soft; shadows subtle
- Components: hero (primary), primary_cta (primary), section (secondary)
- Interactions: Floating Sticky CTA or End of Horizontal Track, Scroll-jacking (careful), parallax layers, horizontal slide, progress indicator
- Why it works: Immersive product discovery. High engagement. Keep navigation visible. Immersive product discovery. High engagement. Keep navigation visible.
- Summary: Landing pattern: Horizontal Scroll Journey
horizontal, scroll, journey, gallery, storytelling, panoramic, storytelling-driven
1. Intro (Vertical), 2. The Journey (Horizontal Track), 3. Detail Reveal, 4. Vertical Footer
Floating Sticky CTA or End of Horizontal Track
Continuous palette transition. Chapter colors. Progress bar #000000.
Immersive product discovery. High engagement. Keep navigation visible.
### Pattern 2: Interactive 3D Configurator
- Screen type: landing
- Primary task: Convert visitor / communicate value
- Composition archetype: Interactive 3D Configurator
- Reading flow: Hero (Configurator) → Feature Highlight (synced) → Price/Specs → Purchase
- Density: spacious
- Symmetry: symmetric
- Primary focal point: Hero / primary CTA
- Secondary focal points: Features, Social proof
- Surfaces: canvas light marketing page; cards Neutral studio background. Product: Realistic materials. UI: Minimal overlay.; borders soft; shadows subtle
- Components: hero (primary), primary_cta (primary), section (secondary)
- Interactions: Inside Configurator UI + Sticky Bottom Bar, Real-time rendering, material swap animation, camera rotate/zoom, light reflection
- Why it works: Increases ownership feeling. 360 view reduces return rates. Direct add-to-cart. Increases ownership feeling. 360 view reduces return rates. Direct add-to-cart.
- Summary: Landing pattern: Interactive 3D Configurator
3d, configurator, customizer, interactive, product, interactive product demo
1. Hero (Configurator), 2. Feature Highlight (synced), 3. Price/Specs, 4. Purchase
Inside Configurator UI + Sticky Bottom Bar
Neutral studio background. Product: Realistic materials. UI: Minimal overlay.
Increases ownership feeling. 360 view reduces return rates. Direct add-to-cart.
### Pattern 3: Centered authentication card
- Screen type: authentication
- Primary task: Authenticate with email and password to access the application
- Composition archetype: centered-card
- Reading flow: brand-logo → form-title → form-fields → form-actions → secondary-links
- Density: comfortable
- Symmetry: symmetric
- Primary focal point: form-title and fields
- Secondary focal points: brand-logo, primary action button
- Spacing rhythm: page 32 / section 24 / card 16 / base 4
- Surfaces: canvas neutral; cards primary; borders subtle; shadows minimal
- Components: form-field (secondary), checkbox (secondary), button-primary (secondary), link-secondary (secondary)
- Interactions: form-validation, disabled-primary-action, show-hide-password
- Why it works: Centering and whitespace create a calm, focused entry point for authentication. Single-column, minimal distractions, and clear hierarchy reduce cognitive load and error risk. Card elevation and rounded corners reinforce separation from background and draw attention.
- Avoid when: Multi-step or highly transactional flows; When space is limited and vertical stacking would cause excessive scrolling
- Summary: This pattern is a centered authentication card for desktop SaaS apps, focusing user attention on a single sign-in task. The composition uses a single-column card with generous whitespace, clear hierarchy, and minimal distractions, making it suitable for login, registration, or password reset screens. Works best when authentication is the only task and branding is important. Avoid for multi-step onboarding or dense transactional flows.
### Pattern 4: Centered authentication card
- Screen type: authentication
- Primary task: Create a new user account by entering email and password
- Composition archetype: centered-card
- Reading flow: page-header → primary-region
- Density: comfortable
- Symmetry: symmetric
- Primary focal point: authentication-card
- Secondary focal points: form-fields, primary-action
- Spacing rhythm: page 32 / section 24 / card 16 / base 4
- Surfaces: canvas neutral; cards primary; borders subtle; shadows minimal
- Components: form-field (secondary), primary-action (secondary), secondary-action (secondary)
- Interactions: form-validation, disabled-primary-action, show-hide-password
- Why it works: Centering and card containment reduce cognitive load and focus attention on the authentication task. Single-column layout is optimal for short forms and improves accessibility. Clear separation of primary and secondary actions prevents accidental navigation.
- Avoid when: Multi-step onboarding or marketing-heavy flows; Dense data input requirements
- Summary: A centered authentication card pattern for desktop SaaS apps, optimized for sign-up or sign-in flows. The primary task is account creation, with a single-column card containing form fields and clear primary/secondary actions. The composition uses generous whitespace, strong visual hierarchy, and minimal distractions, making it suitable for focused authentication tasks. Avoid for multi-step onboarding or marketing-heavy screens.
### Pattern 5: multi-section entity creation form
- Screen type: form
- Primary task: create a new entity with structured and descriptive data
- Composition archetype: sidebar-header-content
- Reading flow: page-header → breadcrumb → main-form-card → form-sections → form-actions
- Density: comfortable
- Symmetry: asymmetric
- Primary focal point: main-form-card
- Secondary focal points: sidebar-navigation, form-actions
- Spacing rhythm: page 32 / section 32 / card 16 / base 4
- Surfaces: canvas neutral; cards selective; borders subtle; shadows minimal
- Components: form-section (secondary), sidebar-navigation (secondary), form-actions (secondary)
- Interactions: sticky-form-actions, sectioned-form, row-hover-actions
- Why it works: Logical grouping of fields reduces cognitive load. Sidebar navigation keeps users oriented within the product. Sticky actions improve completion rates for long forms.
- Avoid when: Short forms or modal dialogs; Mobile-only workflows; When inline editing is required
- Summary: This is a multi-section entity creation form pattern for desktop SaaS, supporting operators in creating new records with both structured fields and rich descriptions. The layout uses a sidebar-header-content archetype, with logical form sections, sticky actions, and clear visual hierarchy via whitespace and scale. Best for complex creation flows in admin or operational tools; avoid for short forms or mobile-first experiences.
### Pattern 6: Date and Time Picker Inputs with Popover Selection
- Screen type: form
- Primary task: Select or input specific dates and times for scheduling, filtering, or reporting
- Composition archetype: multi-column-form
- Reading flow: date-picker-single → date-picker-range → time-picker-single → time-picker-range
- Density: comfortable
- Symmetry: symmetric
- Primary focal point: focused input and active popover
- Secondary focal points: input group labels
- Spacing rhythm: page 32 / section 32 / card 16 / base 4
- Surfaces: canvas neutral; cards selective; borders subtle; shadows minimal
- Components: date-picker-input (secondary), time-picker-input (secondary)
- Interactions: popover-on-focus, calendar-date-select, time-scroll-select
- Why it works: Grouping date and time pickers in columns supports quick comparison and entry. Popover pickers keep the main form uncluttered while providing rich selection tools. Consistent sizing and spacing improve scanability and reduce errors.
- Avoid when: Mobile-first workflows where popovers may be hard to use.; When only a single date or time input is needed.
- Summary: A desktop form pattern for selecting dates and times using input fields with popover pickers. Suitable for scheduling, reporting, or filtering workflows where precise temporal input is required. The composition uses clear grouping, comfortable density, and accent color for active states. Best for operational dashboards or forms in B2B SaaS; avoid on mobile or when only a single input is needed.
### Pattern 7: Sidebar dashboard with summary metrics and tabular list
- Screen type: list_table
- Primary task: Review, filter, and act on transactional records with supporting KPIs
- Composition archetype: sidebar-header-content
- Reading flow: sidebar-navigation → page-header → filters-row → summary-metrics-row → main-table
- Density: comfortable
- Symmetry: asymmetric
- Primary focal point: main-table
- Secondary focal points: summary-metrics-row, filters-row
- Spacing rhythm: page 32 / section 32 / card 16 / base 4
- Surfaces: canvas neutral; cards selective; borders subtle; shadows minimal
- Components: summary-metric (secondary), tab (secondary), data-table (secondary), status-badge (secondary), pagination (secondary)
- Interactions: row-hover-actions, tab-switching, filter-dropdowns, pagination
- Why it works: Sidebar and header separation supports multitasking and persistent navigation. Summary metrics contextualize the table, aiding quick decision-making. Tabs and filters reduce page reloads and keep users in flow.
- Avoid when: Mobile-first or single-task flows.; When data is too sparse for tabular presentation.
- Summary: A sidebar dashboard pattern for desktop B2B SaaS, featuring summary metrics and a tabular list as the primary region. Users can filter, scan, and act on transactional records, with persistent navigation and at-a-glance KPIs. The composition uses a sidebar-header-content archetype, with clear visual hierarchy and comfortable density. Best for operational dashboards or admin panels; avoid for mobile-first or single-task flows.
### Pattern 8: Sidebar + header + filterable table with pagination
- Screen type: list_table
- Primary task: Scan, filter, and manage a list of users or entities with row-level actions
- Composition archetype: sidebar-header-content
- Reading flow: sidebar-navigation → page-header → filter-bar → main-table → pagination-controls
- Density: comfortable
- Symmetry: asymmetric
- Primary focal point: main-table
- Secondary focal points: page-header, filter-bar
- Spacing rhythm: page 32 / section 32 / card 16 / base 4
- Surfaces: canvas neutral; cards selective; borders subtle; shadows minimal
- Components: summary-metric (secondary)
- Interactions: row-hover-actions, filter-dropdowns, pagination
- Why it works: Sidebar-header-content composition supports multitasking and persistent navigation. Filter bar above table enables quick segmentation and search. Table with clear row actions and status badges improves operational efficiency.
- Avoid when: Mobile-first or single-column layouts; Highly visual or card-based content; Complex inline editing requirements
- Summary: A desktop list_table pattern for user or entity management, featuring a sidebar for navigation, a prominent page header, filter/search controls, and a paginated table with row-level actions. The composition supports comfortable density, clear hierarchy, and operational efficiency for B2B SaaS admin tasks. Best for moderate to large datasets where filtering and quick actions are needed; avoid for mobile-first or highly visual content.
