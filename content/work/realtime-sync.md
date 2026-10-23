---
title: "Real-time sync: from 5 batches a day to seconds"
slug: realtime-sync
order: 2
summary: "Built event-driven, fault-tolerant sync that delivers user changes from MAD's core platform to its apps within seconds instead of five batches a day."
role: "Designed and built the downstream sync layer"
period: "2026"
stack: [Hasura event triggers, n8n, PostgreSQL, GraphQL, REST, Slack webhooks]
metrics:
  - value: "5×/day → seconds"
    label: "sync latency for user changes"
  - value: "0"
    label: "silent failures, by design (every failure is logged and alerted)"
---

## Context

Most of MAD's operations, including user management, hiring, and fundraising, run on Platform Commons, a SaaS platform built by a partner. MAD's own apps (Session-Ops and the CRM) need an up-to-date copy of every user: who they are, their role, and which chapter they belong to.

User data reached the apps through a **batch sync that ran five times a day**. When someone joined, changed roles, or left, the apps could be hours out of date.

## The problem

MAD decided to make this real-time. An external team built the upstream layer that streams changes from Platform Commons into MAD's database.

My job was everything downstream: getting each change into the right apps, correctly and reliably, within seconds.

## Constraints

- A user's full profile is spread across many tables, so the raw change event alone isn't enough to build what the apps need.
- Only certain roles should be synced to each app, and roles can change over time.
- An app being briefly down must not mean a lost update.
- The platform's built-in logs weren't enough to debug failures, so I needed my own observability.

## What I built

An event-driven sync layer that delivers every user change to the right apps within seconds:

- **Always current.** Each change is delivered using the user's complete, latest profile rather than the raw event, so retries and out-of-order events stay correct.
- **Role-aware.** Each app receives only the users whose roles it needs, mapped to that app's own roles. Everyone else is skipped, and the skip is recorded.
- **Fault-tolerant.** Every event is logged on arrival and every delivery is retried automatically with backoff. If it still fails, it's set aside and the team is alerted in Slack.

One business rule needed particular care. A user might be **skipped on creation** (no eligible role yet) and only become eligible in a later update. So delivery is always **create-or-update based on whether the user already exists in the app**, not based on whether the database event was an insert or an update.

I later reused the same pattern for the CRM, adding role mapping and deactivation when a user leaves an eligible role.

## Outcome

- User changes now reach Session-Ops and the CRM **within seconds instead of five times a day**.
- **No silent failures:** every event is either delivered, deliberately skipped, or dead-lettered with an alert.
- The pattern became a reusable template for MAD's other syncs.

## What I'd do differently

- **Test timing assumptions explicitly.** A misconfigured wait step would have turned a 5-second backoff into a 5-hour one. A test that asserted the real delays would have caught it immediately.
