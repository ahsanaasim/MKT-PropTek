# Screen blueprint: Permission Denied

Route: `/denied`
Purpose: Show when user tries to access unauthorized content.
Layout: **single-column-form**

## Required regions
- **main**: Display permission denied message, illustration, and navigation options. — components: PermissionDeniedIllustration, PermissionDeniedMessage, LoginButton, GoHomeButton

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