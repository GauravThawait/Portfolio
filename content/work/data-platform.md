---
title: "One warehouse for an organization's scattered data"
slug: data-platform
order: 3
summary: "Built the pipelines, models, dashboards, and APIs that brought MAD's data out of partner-built tools into one warehouse."
role: "Built the pipelines, models, dashboards, and APIs"
period: "2025 – 2026"
stack: [Dalgo, Airbyte, PostgreSQL, dbt, Superset, Hasura, GraphQL, Apps Script]
metrics:
  - value: "120+"
    label: "dbt models"
  - value: "7"
    label: "leadership dashboards"
  - value: "50+"
    label: "APIs for internal tools and partners"
---

## Context

Before this work, MAD's data lived inside tools that different partners had built for it. The organization could see what each tool showed, but couldn't freely combine data, build its own reports, or answer basic questions about what was happening on the ground.

MAD's director decided to build a data platform and partnered with **Dalgo**, a nonprofit data platform. I built and ran it.

## What I built

**Ingestion.** I set up and orchestrated connectors from Platform Commons (MAD's core SaaS for fundraising, user management, hiring, and operations), the CRM, Session-Ops, and Google Sheets into a PostgreSQL warehouse.

**Modeling.** I wrote **120+ dbt models** in layers: staging models that clean and type each source, intermediate models that combine them, and production fact and dimension models designed for reuse.

**Dashboards.** I built **7 Superset dashboards** for leadership and program teams, including volunteer and child consistency dashboards.

**APIs.** I exposed **50+ APIs** over the warehouse for MAD's own tools and external partners. One of these fed session schedules to a partner-built WhatsApp attendance bot. I also designed the bot's attendance-calculation logic, which the vendor implemented.

**Data quality at the source.** Some critical data is maintained by hand in spreadsheets. I added two layers of protection:

- Validation inside the sheets, so editors see exactly which rows need fixing and why.
- A quarantine step in the pipeline: rows that fail validation are kept out of the production models instead of stopping the pipeline.

I also built small Apps Script tools for field teams, such as a substitute-attendance form whose choices come from the warehouse, so bad entries can't be typed in.

## Outcome

- MAD has **one place to answer questions about its programs**, instead of asking each partner tool separately.
- Leadership uses the dashboards to track program delivery.
- The warehouse later became the source for the Session-Ops migration (see the Session-Ops case study).

## What I'd do differently

- **Add dbt tests earlier.** Validation in SQL and at the source caught most issues, but formal dbt tests would have made regressions visible sooner.
- **Start with validation at the source.** The checks inside the sheets and the warehouse-fed forms stopped bad entries where they were made. On the next platform I'd put those in place on day one, alongside the first pipelines.
