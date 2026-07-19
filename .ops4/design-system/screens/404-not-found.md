# Screen blueprint: 404 Not Found

Route: `/*`
Purpose: Show for invalid routes.
Layout: **single-column-form**

## Required regions
- **main**: Display 404 not found message, illustration, and navigation options. — components: NotFoundIllustration, NotFoundMessage, GoHomeButton

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