# Screen blueprint: Reports & Analytics

Route: `/poster/reports`
Purpose: View advanced reporting: completed jobs, revenue, membership growth, job completion time, team ratings.
Layout: **dashboard-grid**

## Required regions
- **header**: Page title and export actions — components: ReportsTitle, ExportDropdown
- **main**: Display charts and tables for analytics — components: CompletedJobsChart, RevenueChart, MembershipGrowthChart, JobCompletionTimeChart, TeamRatingsTable
- **filters**: Filter reports by date, job status, team, and location — components: DateRangePicker, JobStatusMultiSelect, TeamMultiSelect, LocationSearch

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