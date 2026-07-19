# Screen blueprint: Dispute Modal

Purpose: Initiate in-app dispute process before payment release.
Layout: **single-column-form**

## Required regions
- **header**: Summarize job and completion context for dispute — components: JobSummaryCard, CompletionStatusBadge
- **main**: Collect dispute reason, allow evidence upload, confirm action — components: DisputeReasonField, EvidenceUpload, SubmitDisputeButton, CancelButton, ConfirmationMessage

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