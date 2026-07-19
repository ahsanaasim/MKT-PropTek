# Screen blueprint: Withdraw Bid Modal

Purpose: Withdraw a submitted bid.
Layout: **single-column-form**

## Required regions
- **header**: Modal title and context for withdrawing a bid — components: ModalTitle, JobSummarySnippet
- **main**: Confirmation and warning for bid withdrawal — components: IrreversibleWarningText, BidSummarySnippet, WithdrawBidButton
- **footer**: Withdraw/cancel actions — components: WithdrawBidButton, CancelButton

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