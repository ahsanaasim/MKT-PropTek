# Screen blueprint: Landing Page

Route: `/`
Purpose: Public marketing and onboarding. Explains PropTek’s value, how it works, and provides CTAs for job posters and cleanup teams to sign up or log in.
Layout: **gallery-grid**

## Required regions
- **hero**: Immediate value proposition, brand, and primary CTAs for both audiences. — components: BrandLogo, ValuePropText, PrimaryCTAButton (Post a Job), SecondaryCTAButton (Find Cleanup Jobs)
- **how-it-works**: Educate new users on PropTek’s workflow and benefits. — components: StepIllustration, StepText, AnimatedDemo
- **testimonials**: Build trust with real user stories and ratings. — components: TestimonialCard, UserAvatar, StarRating
- **faq**: Answer common questions for both job posters and cleanup teams. — components: FAQAccordion
- **legal-footer**: Provide legal, privacy, and contact links. — components: LegalLink, PrivacyLink, ContactLink

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