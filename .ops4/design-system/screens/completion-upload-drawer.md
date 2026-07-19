# Screen blueprint: Completion Upload Drawer

Purpose: Upload before/after photos, PDFs, and files for job completion.
Layout: **drawer-upload**

## Required regions
- **upload-header**: Show job title, upload instructions, and allowed file types — components: JobTitle, UploadInstructions, AllowedFileTypesBadge, CloseDrawerButton
- **upload-form**: Upload before/after photos, PDFs, and files; show progress and previews — components: FileUploadField, FilePreviewList, UploadProgressBar, RemoveFileButton, SubmitUploadButton

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