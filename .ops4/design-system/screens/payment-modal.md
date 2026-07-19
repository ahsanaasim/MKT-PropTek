# Screen blueprint: Payment Modal

Purpose: Release payment for completed job.
Layout: **single-column-form**

## Required regions
- **header**: Display job and recipient summary — components: JobSummaryCard, RecipientCard
- **main**: Show payment breakdown, method selection, and confirmation action — components: PaymentBreakdown, FeeBadge, PaymentMethodSelector, AddPaymentMethodButton, ConfirmPaymentButton, ErrorBanner, PlanLimitBanner
- **footer**: Display legal, support, and security info — components: SecurePaymentNotice, SupportLink

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