# Screen blueprint: Feedback & Rating Modal

Purpose: Leave feedback and rating for team after job completion.
Layout: **single-column-form**

## Required regions
- **header**: Summarize job and team for context — components: JobSummaryCard, TeamSummaryCard
- **main**: Collect star rating and feedback, required for payment release — components: StarRatingInput, FeedbackTextArea, SubmitFeedbackButton, CancelButton, RequiredForPaymentNotice

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