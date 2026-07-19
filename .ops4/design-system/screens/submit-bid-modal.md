# Screen blueprint: Submit Bid Modal

Purpose: Submit a new bid for a job.
Layout: **single-column-form**

## Required regions
- **header**: Modal title and context for submitting a bid — components: ModalTitle, JobSummarySnippet
- **main**: Bid submission form fields and actions — components: FormField:BidAmount, FormField:EstimatedCompletionTime, FormField:BidNotes, FileUpload:SupportingFiles, DraftStatusIndicator, SubmitBidButton
- **footer**: Submission action and legal/disclaimer — components: SubmitBidButton, CancelButton, LegalDisclaimerText

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