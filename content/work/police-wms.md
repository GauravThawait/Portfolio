---
title: "Police Work Management System: a district-wide rollout"
slug: police-wms
order: 4
summary: "Built a task-management platform, with a mobile app and WhatsApp bot, rolled out to every police station in Bilaspur district for 1,200+ officers."
role: "Freelance developer (commissioned by the SP, Bilaspur)"
period: "May 2024 – Jul 2024"
stack: [Node.js, MongoDB, React Native, Gupshup (WhatsApp), Docker, GCP Cloud Run]
metrics:
  - value: "1,200+"
    label: "officers"
  - value: "Every"
    label: "police station in the district"
  - value: "1"
    label: "co-authored research paper"
---

## Context

The Superintendent of Police in Bilaspur, Chhattisgarh commissioned a system to manage and track tasks assigned to officers across the district's police stations.

Before this system, tasks were assigned verbally over phone calls or through WhatsApp group messages, so tracking and monitoring of each task often got lost.

## What I built

- A **Node.js and MongoDB backend** with real-time updates.
- A **React Native mobile app**, published on the [Play Store](https://play.google.com/store/apps/details?id=com.gov_project).
- A **web dashboard** alongside the app.
- An **interactive WhatsApp bot** (via Gupshup), so officers could create tasks and report on them without opening the app.
- **Containerized deployment on GCP Cloud Run** with CI/CD.

I built the WhatsApp bot when adoption of the app was low because of a knowledge gap, so officers could work with tasks in a tool they already used every day.

## Outcome

- Rolled out to **every police station in Bilaspur district**, used by **1,200+ officers**.
- I co-authored a research paper on the system's design and field deployment. [See the research paper](https://drive.google.com/file/d/1b2iIZH_BtJjs18bgg7GS65YqjW68b6Jj/view?usp=sharing).

## What I'd do differently

- **Start where users already are.** Adoption of the app was low at first because of a knowledge gap, and the WhatsApp bot was my answer to it. Next time I'd offer the familiar channel in the first release instead of adding it later.
- **Treat onboarding as part of the rollout.** For a district-wide rollout to 1,200+ officers, the software is only half the work. A short training plan for each station would have narrowed the knowledge gap sooner.
