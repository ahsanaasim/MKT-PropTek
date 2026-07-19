# Screen blueprint: Certification Upload Modal

Purpose: Upload or update certifications for user profile, including file, type, and expiration date.
Layout: **single-column-form**

## Required regions
- **header**: Modal title and close action — components: ModalTitle, CloseButton
- **main**: Form for uploading or editing a certification — components: CertificationTypeSelect, CertificationProviderInput, CertificationIdInput, ExpirationDatePicker, FileUploadField, NotesTextarea, VerifiedBadge, SubmitButton, CancelButton

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