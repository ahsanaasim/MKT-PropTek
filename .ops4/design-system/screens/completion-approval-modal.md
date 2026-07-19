# Screen blueprint: Completion Approval Modal

Purpose: Approve or dispute job completion after reviewing uploads.
Layout: **single-column-form**

## Required regions
- **header**: Summarize job and completion submission for context — components: JobSummaryCard, CompletionStatusBadge
- **main**: Display uploaded proof, allow approval or dispute, show irreversible warning — components: MediaGallery, UploadedFilesList, IrreversibleWarning, ApproveButton, DisputeButton

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