# CLAUDE.md

# Project Overview

This is a production-ready freelancer platform built on top of the Metronic Tailwind React v9.2.0 template using Next.js (JavaScript version).

The project is actively developed and follows a strict architecture. Any implementation must preserve the existing structure, coding style, and reusable patterns.

The primary goal is consistency, maintainability, scalability, and production-quality code.

---

# Tech Stack

Frontend

- Next.js (JavaScript only)
- React
- Tailwind CSS
- Metronic Tailwind React v9.2.0
- Radix UI

State Management

- React Query

Forms

- React Hook Form

Validation

- Zod

Backend

- Supabase

  - Authentication
  - Database
  - Storage

---

# JavaScript Policy

This project uses JavaScript only.

Never:

- convert files to TypeScript
- suggest TypeScript
- create .ts or .tsx files
- introduce TypeScript types

Always follow the existing JavaScript style.

---

# Project Architecture

Respect the existing folder structure.

Do not move files.

Do not rename folders.

Do not reorganize the project unless explicitly requested.

Before creating anything new:

- search the project
- understand the current architecture
- reuse existing implementations whenever possible

---

# UI Rules

This project is built on Metronic.

UI consistency is extremely important.

Priority order:

1. Reuse existing project components.
2. Reuse Metronic components.
3. Reuse Radix UI components.
4. Extend an existing component.
5. Create a new component only after approval.

Never redesign existing UI patterns.

Never replace existing components with different libraries.

Do not introduce new UI frameworks.

---

# Tailwind Rules

Use Tailwind utilities only.

Do not introduce:

- CSS Modules
- Styled Components
- Emotion

Follow the spacing, sizing and typography already used in the project.

---

# Component Rules

Before creating a new component:

Search for:

- similar component
- shared component
- reusable layout
- existing modal

Reuse existing components whenever possible.

Avoid duplicate implementations.

---

# Modal Rules

Most CRUD operations in this project are performed using modals.

Keep the same modal workflow throughout the application.

Never introduce a different CRUD pattern unless requested.

---

# Database Rules

Supabase is the backend implementation.

However, the application uses a hybrid data flow:

READ operations:
UI → React Query → Service → Supabase

WRITE operations:
UI → React Query → Service → API Routes → Supabase

Important:
- Services layer is always required
- UI must never communicate with Supabase directly
- React Query must never communicate with Supabase directly

---

# API Routes

Next.js API routes are used for WRITE operations only.

They handle:
- secure mutations
- data validation before DB writes
- Supabase insert/update operations

They are part of the write pipeline:

Services → API Routes → Supabase

---

# Service Rules

Services are the core business logic layer.

They are responsible for:
- data aggregation
- business logic
- payload preparation
- Supabase interaction (READ operations)
- API communication (WRITE operations)

Do not treat Services as simple API wrappers.

---

# React Query Rules

React Query is responsible for:

- fetching
- mutations
- cache
- synchronization

Business logic belongs inside Services.

Do not duplicate query logic.

Reuse existing hooks whenever possible.

---

# Forms

All forms must use:

- React Hook Form
- Zod validation

Do not introduce another form library.

---

# Authentication

Use the existing authentication flow.

Do not modify authentication architecture.

Do not bypass authentication checks.

---

# Naming Convention

Components

PascalCase

Functions

camelCase

Variables

camelCase

Folders

kebab-case

Constants

UPPER_SNAKE_CASE

Follow the existing naming style if a section already has its own convention.

---

# Development Workflow

Before writing code:

1. Read related files.
2. Understand the current implementation.
3. Search for reusable code.
4. Explain the implementation plan.
5. Wait for approval if the task requires structural changes.
6. Implement.
7. Review your own changes.

Never start coding immediately for large tasks.

---

# Decision Making

When multiple solutions exist:

Choose the solution that best matches the current architecture.

Explain why it is preferred.

If uncertain,

ask first.

Never guess.

---

# Code Quality

Always write production-ready code.

Keep functions small.

Keep components readable.

Avoid unnecessary abstraction.

Avoid overengineering.

Prefer readability over clever code.

---

# Performance

Avoid unnecessary renders.

Reuse existing hooks.

Avoid duplicated API requests.

Optimize React Query usage.

Lazy load only when appropriate.

---

# Forbidden Actions

Never:

- modify unrelated files
- refactor the project without approval
- install new npm packages without approval
- change project architecture without approval
- introduce a different design system
- introduce another component library
- create duplicate components
- create duplicate hooks
- create duplicate services
- create duplicate utilities
- use hacky solutions
- ignore existing patterns
- bypass the Services layer
- communicate directly with Supabase from UI
- generate placeholder implementations
- leave TODOs instead of completing the task

---

# Working With Existing Features

When implementing a new feature:

First identify an existing feature with similar behavior.

Follow the same architecture.

Copy patterns, not code.

Keep consistency across the entire project.

---

# Existing Business Flow

The application currently supports two user types:

- Freelancer
- Client

The project contains separate flows for both user types.

Freelancer currently includes:

- Profile
- Portfolio
- Services (currently under development)

Most editing operations are modal-based.

Future features should follow the same architecture and user experience.

---

# # AI Expectations

As the AI assistant, your goal is NOT only to make the requested feature work.

Your primary responsibility is to:

- preserve existing architecture
- maximize consistency across the codebase
- minimize duplicated code
- reuse existing implementations whenever possible
- keep the codebase maintainable and scalable
- avoid unnecessary complexity and overengineering
- follow the real codebase behavior, even if it differs from ideal or documented rules

Always treat the existing implementation as the source of truth.

If you are unsure or detect a potential architectural impact:

- stop
- analyze first
- ask for clarification before proceeding

Quality, consistency, and long-term maintainability are more important than speed or quick fixes.
