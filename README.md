# GoldenCell

Version: 1.0
Status: LOCKED

---

# AI-powered Healthcare Service Platform

GoldenCell is an AI-powered Healthcare Service Platform that connects hospitals and members.

We do not replace medical practice.

GoldenCell helps hospitals present their services, connect with members, support consultation and reservation, and continuously improve the healthcare journey through future AI-powered Recovery services.

---

# Vision

> **Build services that users love.**

Great services begin with great user experiences.

Great user experiences are built on

- Business
- Workflow
- Data
- Quality

GoldenCell builds sustainable healthcare services with a **Business First** mindset.

---

# Core Values

- Business First
- Quality First
- User Experience First
- Simplicity Over Complexity
- Platform, Not Hospital System

---

# Product Mindset

- Business First
- Workflow First
- Quality First
- User Experience First

> Everything starts from Business.

> Everything ends with User Experience.

---

# Platform Principles

- The Platform Connects.
- Hospitals Treat.
- Services are Connected.
- Services are Not Tightly Coupled.
- The platform supports hospital operations.
- The platform never replaces hospital operations.

---

# MVP Scope

## Phase 1

- Identity
- Hospital
- Program
- Consultation
- Reservation
- Admin

## Phase 2

- Recovery
- AI
- Reverse Auction
- Medical Data Platform

---

# System Architecture

```
Business
    ↓
Workflow
    ↓
Domain
    ↓
API
    ↓
Applications
    ├── Admin
    └── Web
```

---

# Technology Stack

## Backend

- Java 21 (LTS)
- Spring Boot 3.5
- Spring Security 6
- MyBatis 3
- MariaDB 11
- Gradle 9

---

## Frontend (Admin)

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui
- TanStack Query 5
- Zustand

---

## Frontend (Web)

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui
- TanStack Query 5
- Zustand

---

# Project Structure

```
goldencell/

├── backend/
│
├── frontend-admin/
│
├── frontend-web/
│
├── docs/
│   ├── architecture/
│   ├── design/
│   ├── admin/
│   ├── frontend/
│   ├── backend/
│   └── api/
│
└── infra/
```

---

# Documentation Structure

## README.md

Project overview and philosophy.

---

## CLAUDE.md

Development rules for Claude Code.

---

## docs/architecture

Business architecture and domain knowledge.

- Business Workflow
- Business Dictionary
- Domain Documents

---

## docs/design

Design standards.

- ADS (Admin Design System)
- UDS (User Design System)

---

## docs/admin

Admin screen specifications.

---

## docs/frontend

Frontend development documents.

---

## docs/backend

Backend development documents.

---

## docs/api

API specifications and standards.

---

# Design Architecture

GoldenCell uses two independent Design Systems.

```
Shared Design Foundation
        │
        ├──────────────┐
        │              │
        ▼              ▼
     ADS            UDS
(Admin Design)  (User Design)
```

Only design principles and design tokens are shared.

UI components remain completely independent.

---

# Development Principles

Business defines Workflow.

Workflow defines Domain.

Domain defines API.

API defines Applications.

UI follows Business.

Business never follows UI.

---

# Roadmap

## Phase 1

- Admin MVP
- Hospital Onboarding
- Program Management
- Consultation
- Reservation

---

## Phase 2

- Recovery
- AI
- Reverse Auction

---

## Phase 3

- Healthcare Intelligence Platform

---

# GoldenCell

GoldenCell is **not** a Hospital Information System.

GoldenCell is **not** an EMR.

GoldenCell is **not** an ERP.

GoldenCell is a **Healthcare Service Platform**.

Everything starts from Business.

Everything ends with User Experience.