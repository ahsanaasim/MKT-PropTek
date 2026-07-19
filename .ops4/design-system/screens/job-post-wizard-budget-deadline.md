# Screen blueprint: Job Post Wizard: Budget & Deadline

Route: `/poster/job/new/budget`
Purpose: Step 2: Enter job budget, deadline, and select urgency.
Layout: **two-column-main-rail**

## Required regions
- **main**: Step 2: Enter job budget, deadline, and select urgency. — components: PageHeader, PrimaryContent
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