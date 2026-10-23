---
title: "Session-Ops: from a no-code pilot to a production platform"
slug: session-ops
order: 1
summary: "Built MAD's core program-delivery platform as a one-year no-code pilot, then rebuilt it in Django and Next.js and migrated all live data without disrupting field operations."
role: "Sole engineer (design, build, migration, operations)"
period: "2025 – 2026"
stack: [Bubble, Django, Next.js, TypeScript, PostgreSQL, dbt, n8n, AWS, Sentry]
metrics:
  - value: "5,000+"
    label: "users, incl. 2,500+ active volunteers"
  - value: "7,000+"
    label: "children managed"
  - value: "65,000+"
    label: "hours of volunteer support tracked"
  - value: "0"
    label: "field disruption during cutover"
---

## Context

Make A Difference runs mentoring programs in partner schools. Every week, volunteers teach small groups of children (at most five per section) in scheduled time slots. Before Session-Ops, the operational picture of which school had which classes, which children were in which section, and which volunteer taught them when lived in scattered sheets and partner tools.

Session-Ops was started as a **one-year pilot** for academic year 2025–26, to test one question: can a dedicated tool make program delivery easier to run and to measure?

## The problem

The pilot needed to be live quickly, so it was built on **Bubble**, a no-code platform I had not used before. I learned it on the job and built the full application on it: schools, classes, sections, children, volunteers, recurring time slots, volunteer-to-section assignment, and role-based access for about 300 staff editors and read-only access for volunteers.

The pilot worked. MAD adopted it as its core platform. That created two new problems:

1. **The no-code platform had reached its limits.** Each click in Bubble triggers separate workflows that can run in parallel, so there was no reliable way to make multi-step writes atomic. Concurrent edits could leave data inconsistent, and even simple conditional UI or validation logic needed long chains of workflows.
2. **The system was hardcoded to one academic year.** Much of the data model assumed AY 2025–26. To keep running, every school had to roll over into the next year without losing history.

## Constraints

- I was the only engineer.
- Programs were running in schools throughout, so the field could not lose access or data.
- The rebuild had to carry over every record: children, volunteers, enrollments, schedules, and their relationships.

## What I built

**1. Academic-year progression.** I refactored the hardcoded year into an academic-year-scoped design and built a one-click progression for each school: classes are promoted to the next year and every child moves with them, while the previous year's history is kept.

Every run is fully auditable, so nothing is lost. I built this first as no-code workflows to keep the pilot running, then re-engineered it as a transactional service in Django, where each step either fully succeeds or rolls back.

**2. The rebuild in Django and Next.js.** Before writing code, I reverse-engineered the Bubble app into a PRD with 51 user stories, a data model, API contracts, and an access-control model, and consolidated the interface from 11 pages to 4. The new system has:

- transactional backend logic instead of parallel, non-atomic workflows
- clear validation messages that explain which business rule a user hit
- granular role-based access
- filtered exports for school-level and organization-wide reporting
- CI/CD with test coverage tracking and Sentry error monitoring

**3. The live migration.** I moved every live record from the old system into the new one through MAD's data warehouse: cleaned, validated, reshaped to the new design, and loaded in an order that kept every relationship intact.

## Outcome

- Session-Ops went live in production in **September 2026**, and the legacy no-code system was retired.
- The cutover happened **without disrupting field operations**.
- The platform supports **5,000+ users**, including **2,500+ active volunteers**, managing **7,000+ children** and tracking **65,000+ hours** of volunteer support.
- The academic-year progression turned a single-year pilot into a platform MAD can run year after year.

## What I'd do differently

- **Plan for multiple years from day one.** The hardcoded academic year was the right shortcut for a pilot, but it made progression much harder later. Scoping the data by academic year from the start would have saved weeks.
- **Design migrations to stream, not accumulate.** My first migration run tried to hold too much in memory at once. Processing in batches, with each step returning only a summary, fixed it. I'd now design for that from the start.
- **Keep business rules out of database constraints.** One migration failed on a database constraint that encoded a business rule incorrectly. Constraints should enforce structure; lifecycle rules belong in application logic.
