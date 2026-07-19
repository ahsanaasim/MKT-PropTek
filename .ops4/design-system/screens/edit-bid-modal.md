# Screen blueprint: Edit Bid Modal

Purpose: Edit an existing bid.
Layout: **single-column-form**

## Required regions
- **header**: Modal title and context for editing a bid — components: ModalTitle, JobSummarySnippet
- **main**: Bid editing form fields and actions — components: FormField:BidAmount, FormField:EstimatedCompletionTime, FormField:BidNotes, FileUpload:SupportingFiles, DraftStatusIndicator, SaveChangesButton
- **footer**: Save/cancel actions and legal/disclaimer — components: SaveChangesButton, CancelButton, LegalDisclaimerText

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