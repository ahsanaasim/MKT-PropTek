# Screen blueprint: Search & Filter Drawer

Purpose: Advanced search and filtering for jobs, history, reports.
Layout: **drawer**

## Required regions
- **header**: Drawer title and close action — components: DrawerTitle, CloseButton
- **filters**: Filter and search controls for jobs, history, and reports — components: SearchInput, JobStatusFilter, LocationFilter, DateRangeFilter, CustomerFilter, TeamFilter, PaymentStatusFilter, SavedSearchesDropdown, ClearFiltersButton, ApplyFiltersButton

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