# Screen blueprint: Job History Detail (Team)

Route: `/team/history/:jobId`
Purpose: View details of a completed job, feedback, payment status.
Layout: **list-detail**

## Required regions
- **header**: Job title, status, and quick actions — components: JobTitle, JobStatusBadge, BackToHistoryAction
- **main**: Detailed job info, uploads, payment, and feedback — components: JobDetailPanel, CompletionUploadsGallery, PaymentReceiptPanel, FeedbackPanel, JobTimeline, ChatLink

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