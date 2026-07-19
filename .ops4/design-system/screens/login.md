# Screen blueprint: Login

Route: `/auth/login`
Purpose: Authenticate returning users.
Layout: **single-column-form**

## Required regions
- **main**: User authentication form and navigation to registration or password reset. — components: BrandLogo, LoginForm, LoginButton, ForgotPasswordLink, RegisterLink

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