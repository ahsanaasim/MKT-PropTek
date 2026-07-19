# Screen blueprint: Available Jobs List

Route: `/team/jobs`
Purpose: List of open jobs for teams to browse and bid.
Layout: **gallery-grid**

## Required regions
- **header**: Page title and quick actions — components: PageTitle, RefreshButton
- **filters**: Filter and search available jobs — components: SearchBar, LocationFilter, DeadlineFilter, RequirementsFilter, StatusFilter, SavedFiltersDropdown
- **main**: Display job cards in a grid for browsing and action — components: JobCard, JobStatusBadge, BidCountBadge, MapViewToggle

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