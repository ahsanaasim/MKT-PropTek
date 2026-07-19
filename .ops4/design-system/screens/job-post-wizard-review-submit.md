# Screen blueprint: Job Post Wizard: Review & Submit

Route: `/poster/job/new/review`
Purpose: Step 4: Review all job details and submit.
Layout: **two-column-main-rail**

## Required regions
- **main**: Step 4: Review all job details and submit. — components: PageHeader, PrimaryContent
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