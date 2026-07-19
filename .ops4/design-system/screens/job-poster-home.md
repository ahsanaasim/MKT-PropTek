# Screen blueprint: Job Poster Home

Route: `/poster/home`
Purpose: Authenticated dashboard for job posters. Central hub for posting jobs, managing bids, tracking progress, approving completion, releasing payment, and accessing reports.
Layout: **dashboard-grid**

## Required regions
- **header**: Quick access to profile, notifications, and membership status. — components: UserAvatar, MembershipBadge, NotificationsBell
- **main**: Display job list, post job action, alerts, and quick links to chat and reports. — components: PostJobButton, JobGalleryGrid, JobStatusTabs, AlertsBanner, QuickChatAccess, QuickReportsAccess
- **filters**: Enable filtering and searching of jobs. — components: JobStatusFilter, LocationFilter, DateRangeFilter, SearchBar
- **footer**: Mobile navigation for dashboard, jobs, chat, and profile. — components: BottomNavBar

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