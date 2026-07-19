# Screen blueprint: Job List

Route: `/poster/jobs`
Purpose: List all jobs posted by the user, with search and filter.
Layout: **gallery-grid**

## Required regions
- **header**: Page title and quick actions — components: PageTitle, CreateJobButton
- **filters**: Filter and search jobs — components: SearchBar, StatusFilter, LocationFilter, DateRangeFilter, TeamFilter, PaymentStatusFilter, SavedFilterDropdown
- **main**: Display job cards in a grid with key info and status badges — components: JobCard, StatusBadge, JobCardActions, EmptyStateIllustration, ErrorBanner

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