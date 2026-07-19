# Screen blueprint: Register

Route: `/auth/register`
Purpose: Allow new users to create an account and select their role.
Layout: **single-column-form**

## Required regions
- **header**: Page title and instructions — components: PageTitle, InstructionText
- **main**: Registration form fields — components: RoleSelection, NameInput, EmailInput, PasswordInput, CompanyInput, PhoneInput, LocationInput, AgreeToTermsCheckbox, SubmitButton
- **footer**: Navigation to login — components: BackToLoginLink

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