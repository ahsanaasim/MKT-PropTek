# Screen blueprint: Notifications Drawer

Purpose: Show alerts for new jobs, bid status, job updates, payment, disputes.
Layout: **drawer**

## Required regions
- **header**: Drawer title and close action — components: DrawerTitle, CloseButton
- **main**: List of notifications grouped by type — components: NotificationGroupHeader, NotificationList, NotificationItem, MarkAllAsReadButton, NotificationTypeBadge, Timestamp, NotificationActionButton

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