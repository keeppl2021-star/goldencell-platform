# DOC-104
# ADS_COMPONENT_SYSTEM.md

Version : 1.0
Status : LOCKED

---

# Component System

The GoldenCell Admin Component System defines how every component is organized, composed, reused and evolved.

The goal is not to create many components.

The goal is to create reusable business components.

Components exist to support business workflows.

Never build components only for visual purposes.

---

# Golden Rule

Business Patterns create Components.

Components create Pages.

Pages create Products.

Never reverse this order.

---

# 1. Design Philosophy

Components should solve business problems.

Not UI problems.

Every component should have a clear responsibility.

Every component should be reusable.

Every component should be predictable.

---

# 2. Component Hierarchy

GoldenCell Admin consists of six layers.

Foundation

↓

Primitive

↓

Composite

↓

Pattern

↓

Template

↓

Screen

Each layer has a single responsibility.

---

# 3. Foundation Layer

Foundation defines the design language.

Foundation includes

- Design Tokens
- Layout System
- Typography
- Color
- Motion
- Elevation

Foundation never renders UI.

Foundation only provides rules.

---

# 4. Primitive Components

Primitive components are the smallest reusable UI elements.

Examples

- AdsButton
- AdsInput
- AdsTextarea
- AdsCheckbox
- AdsRadio
- AdsSwitch
- AdsBadge
- AdsIcon
- AdsAvatar
- AdsSpinner

Primitive components contain no business logic.

---

# 5. Composite Components

Composite components combine multiple primitives.

Examples

- AdsSearchBox
- AdsDateRangePicker
- AdsPagination
- AdsTabs
- AdsBreadcrumb
- AdsSelect
- AdsUpload
- AdsToast
- AdsDialog

Composite components remain generic.

They should not contain domain knowledge.

---

# 6. Business Pattern Components

Business Pattern Components represent recurring business workflows.

These are the most important components in GoldenCell.

Examples

- AdsSearchPanel
- AdsFilterPanel
- AdsDataTable
- AdsDetailPanel
- AdsFormSection
- AdsSummaryCard
- AdsStatusBar
- AdsActionBar
- AdsEmptyState
- AdsLoadingState
- AdsErrorState

Business Pattern Components may combine multiple Composite Components.

---

# 7. Page Templates

Templates organize business patterns into reusable page layouts.

Examples

- AdsListPage
- AdsDetailPage
- AdsEditPage
- AdsDashboardPage
- AdsWizardPage
- AdsPopupPage

Templates never contain business logic.

---

# 8. Business Screens

Business Screens implement real business features.

Examples

Hospital List

Hospital Detail

Program List

Reservation List

Member Detail

Dashboard

Business Screens are the only layer that contains domain-specific logic.

---

# 9. Component Responsibilities

Foundation

Defines design language.

Primitive

Defines interaction.

Composite

Defines reusable UI combinations.

Pattern

Defines reusable business workflows.

Template

Defines page layout.

Screen

Defines business implementation.

Each layer has one responsibility.

---

# 10. Component Naming

Primitive

AdsButton

AdsInput

AdsBadge

Composite

AdsSearchBox

AdsPagination

AdsDialog

Pattern

AdsSearchPanel

AdsDataTable

AdsDetailPanel

Template

AdsListPage

AdsDashboardPage

Screen

HospitalListPage

ProgramListPage

ReservationPage

---

# 11. Reuse Principles

Never duplicate components.

Improve existing components.

Create new components only when responsibilities differ.

Favor composition over inheritance.

Business Pattern Components should maximize reuse.

---

# 12. Component Communication

Data flows downward.

Events flow upward.

Avoid deeply nested communication.

Prefer explicit props.

Avoid hidden side effects.

---

# 13. Business Independence

Primitive Components

↓

No business knowledge

Composite Components

↓

No business knowledge

Pattern Components

↓

Minimal business assumptions

Templates

↓

No business knowledge

Screens

↓

Business implementation only

Business knowledge belongs only to Screens.

---

# 14. Component Quality

Every component should be

- Predictable
- Reusable
- Readable
- Testable
- Maintainable
- Accessible

---

# 15. Component Evolution

Never replace components unnecessarily.

Improve existing components.

Preserve backward compatibility whenever possible.

Refactor without changing behavior.

---

# 16. Definition of Good Component

A good component

does one thing well.

has one responsibility.

is easy to understand.

is easy to reuse.

does not surprise developers.

---

# ADS Component Manifesto

Build Components.

Not Pages.

Build Patterns.

Not Screens.

Build Systems.

Not Features.

Business creates Patterns.

Patterns create Components.

Components create Great Products.