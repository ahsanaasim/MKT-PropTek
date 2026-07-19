# Screen blueprint: Available Job Detail

Route: `/team/job/:jobId`
Purpose: View job details, submit/edit/withdraw bid, chat with poster.
Layout: **list-detail**

## Required regions
- **header**: Display job summary and quick actions — components: JobSummaryCard, JobStatusBadge, BackButton
- **main**: Show job details, media, requirements, and bid form — components: JobDetailSection, JobMediaGallery, JobRequirementsList, BidForm, BidStatusBadge, WithdrawBidButton, EditBidButton
- **tabs**: Switch between job details, chat, and timeline — components: TabBar, DetailsTab, ChatTab, TimelineTab
- **chat**: Enable real-time chat with job poster and team — components: ChatMessageList, ChatInput, EditMessageButton, UploadFileButton, GroupChatIndicator
- **timeline**: Show job status changes and key events — components: TimelineEventList, AlertBadge

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