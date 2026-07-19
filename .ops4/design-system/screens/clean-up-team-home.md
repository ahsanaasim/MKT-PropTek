# Screen blueprint: Clean Up Team Home

Route: `/team/home`
Purpose: Authenticated dashboard for cleanup teams. Browse/bid on jobs, upload proof, manage profile/certifications, track payment, access job history.
Layout: **dashboard-grid**

## Required regions
- **header**: Quick access to profile, notifications, and membership status. — components: ProfileAvatar, MembershipBadge, NotificationBell
- **main**: Primary workspace for job search, job list, and actions. — components: FindJobsButton, JobList, JobStatusBadge, JobTimelinePreview, JobLocationMapPreview, BidNowButton
- **alerts**: Display urgent alerts, new job postings, and payment updates. — components: AlertBanner, PaymentStatusAlert
- **quick-actions**: Fast access to chat, payments, and profile/certifications. — components: ChatShortcut, PaymentsShortcut, CertificationsShortcut
- **footer**: Mobile navigation for switching between main app areas. — components: BottomNavBar

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