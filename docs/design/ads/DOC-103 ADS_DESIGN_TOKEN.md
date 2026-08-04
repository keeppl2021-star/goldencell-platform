# DOC-103
# ADS_DESIGN_TOKEN.md

Version : 1.0
Status : LOCKED

---

# Admin Design Token System

The GoldenCell Admin Design Token System defines the smallest reusable design values used across the entire Admin Design System.

Design Tokens are the single source of truth for visual consistency.

Every UI component must use Design Tokens.

Pages never use raw visual values directly.

---

# Golden Rule

Components use Tokens.

Pages use Components.

Pages never use Tokens directly.

Never use hard-coded values.

Never use arbitrary spacing.

Never use arbitrary colors.

---

# 1. Purpose

Design Tokens create

- Consistency
- Reusability
- Maintainability
- Scalability

Every visual decision begins with a Design Token.

---

# 2. Token Philosophy

Tokens represent meaning.

Not appearance.

Never name tokens by color.

Always name tokens by purpose.

Correct

color.text.primary

Incorrect

blue500

gray300

primaryBlue

---

# 3. Token Categories

ADS defines the following token groups.

- Color
- Typography
- Spacing
- Radius
- Border
- Shadow
- Elevation
- Motion
- Opacity
- Z-Index
- Icon

Each group has a single responsibility.

---

# 4. Color Tokens

Color tokens describe semantic meaning.

Never visual appearance.

## Brand

color.brand.primary

color.brand.secondary

color.brand.inverse

---

## Surface

color.surface.default

color.surface.subtle

color.surface.hover

color.surface.selected

color.surface.disabled

---

## Text

color.text.primary

color.text.secondary

color.text.tertiary

color.text.disabled

color.text.inverse

---

## Border

color.border.default

color.border.strong

color.border.focus

color.border.disabled

---

## Feedback

color.success

color.warning

color.error

color.info

---

## Status

color.status.active

color.status.inactive

color.status.pending

color.status.completed

---

# 5. Typography Tokens

font.display

font.heading

font.title

font.body

font.label

font.caption

Typography defines hierarchy.

Not decoration.

---

# 6. Spacing Tokens

ADS follows an 8px system.

Available spacing tokens

spacing.0

spacing.4

spacing.8

spacing.12

spacing.16

spacing.24

spacing.32

spacing.40

spacing.48

spacing.64

spacing.80

spacing.96

spacing.128

Never create custom spacing.

---

# 7. Radius Tokens

radius.none

radius.xs

radius.sm

radius.md

radius.lg

radius.xl

radius.full

---

# 8. Border Tokens

border.none

border.thin

border.default

border.strong

---

# 9. Shadow Tokens

shadow.none

shadow.xs

shadow.sm

shadow.md

shadow.lg

shadow.xl

Shadows communicate elevation.

Not decoration.

---

# 10. Elevation Tokens

elevation.0

elevation.1

elevation.2

elevation.3

elevation.4

elevation.5

Higher elevation indicates greater interaction priority.

---

# 11. Motion Tokens

motion.instant

motion.fast

motion.normal

motion.slow

Motion should support understanding.

Never distract users.

---

# 12. Opacity Tokens

opacity.disabled

opacity.overlay

opacity.hover

opacity.focus

Opacity communicates state.

---

# 13. Z-Index Tokens

z.base

z.dropdown

z.sticky

z.overlay

z.modal

z.toast

z.tooltip

Never use arbitrary z-index values.

---

# 14. Icon Tokens

icon.xs

icon.sm

icon.md

icon.lg

icon.xl

Icons communicate meaning.

Not decoration.

---

# 15. Token Naming Rules

Use semantic naming.

category.role.level

Examples

color.text.primary

spacing.24

radius.md

shadow.lg

font.body

motion.fast

Never expose implementation details.

---

# 16. Token Usage Rules

Pages

↓

Components

↓

Tokens

Only Components access Tokens.

Pages never reference Tokens directly.

---

# 17. Design System Relationship

Business

↓

Workflow

↓

Layout

↓

Tokens

↓

Components

↓

Pages

Tokens exist to support Components.

Components exist to support Business.

---

# ADS Token Manifesto

Tokens create consistency.

Consistency creates quality.

Quality creates trust.

Trust creates better user experience.

Never design with values.

Always design with meaning.