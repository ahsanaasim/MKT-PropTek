# Screen blueprint: Job Post Wizard: Details

Route: `/poster/job/new/details`
Purpose: Step 1: Enter job title, description, address (with GPS), and select location on map.
Layout: **two-column-main-rail**

## Required regions
- **main**: Step 1: Enter job title, description, address (with GPS), and select location on map. — components: PageHeader, PrimaryContent
- **context-rail**: Related context, history, or secondary actions — components: RelatedInfo, ActivityOrMeta

## Forbidden collapses
- Do not implement this screen as a single Card containing only a basic form.
- Do not omit the context-rail when related entities or history exist in the product.

## ASCII wireframe
```
| main | context-rail |
```

## Acceptance
- All required regions are present in the implemented UI.
- Control types match the components listed (no downgrading to simpler widgets).