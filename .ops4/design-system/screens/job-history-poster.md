# Screen blueprint: Job History (Poster)

Route: `/poster/history`
Purpose: View all jobs posted, completed, or in progress.
Layout: **dashboard-grid**

## Required regions
- **header**: Page title, quick stats, and navigation — components: PageTitle, JobCountMetric, ExportHistoryAction
- **filters**: Refine job history results — components: StatusFilter, DateRangeFilter, TeamFilter, PaymentStatusFilter, SearchBar
- **main**: Display job history as a list of cards or rows — components: JobHistoryTable, JobStatusBadge, JobCard, JobDetailLink

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