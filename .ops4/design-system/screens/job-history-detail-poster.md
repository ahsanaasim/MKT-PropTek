# Screen blueprint: Job History Detail (Poster)

Route: `/poster/history/:jobId`
Purpose: View details of a posted job, feedback, payment status.
Layout: **list-detail**

## Required regions
- **header**: Display job title, status, and quick actions — components: JobTitle, JobStatusBadge, JobActionMenu
- **main**: Show job details, uploads, timeline, payment, and feedback — components: JobDetailCard, JobTimeline, CompletionUploadsGallery, PaymentReceiptCard, FeedbackAndRatingPanel
- **context-rail**: Show team info, chat shortcut, and job summary — components: TeamInfoCard, ChatShortcutButton, JobSummaryPanel

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