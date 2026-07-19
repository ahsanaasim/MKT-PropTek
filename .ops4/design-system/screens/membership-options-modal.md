# Screen blueprint: Membership Options Modal

Purpose: View and purchase premium membership options.
Layout: **single-column-form**

## Required regions
- **main**: Display membership plans, features, and purchase actions — components: PlanComparisonTable, FeatureList, PriceBadge, PurchaseButton, CurrentPlanBadge

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