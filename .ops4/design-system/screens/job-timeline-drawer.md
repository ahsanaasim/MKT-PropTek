# Screen blueprint: Job Timeline Drawer

Purpose: Show job status changes, deadlines, and alerts.
Layout: **drawer-timeline**

## Required regions
- **timeline-header**: Display job title, current status, and quick summary — components: JobTitle, JobStatusBadge, CloseDrawerButton
- **timeline-list**: Chronological list of job events, status changes, and alerts — components: TimelineEventItem, AlertBadge, EventTimestamp, EventActorAvatar

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