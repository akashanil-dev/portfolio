# Backroom: Project Abstract

## 1. Vision & Purpose
**Backroom** is a bespoke, internal Headless CMS and control center designed specifically for managing a developer portfolio. It provides a centralized, private interface to author content, manage project visibility, control SEO metadata, and oversee career timelines without requiring hardcoded changes to the main portfolio repository. By separating content management from the frontend presentation, Backroom allows for dynamic, real-time updates to the portfolio.

## 2. Architecture & Infrastructure Decisions
Based on the planning phase, the following architectural decisions have been made:
- **Repository Structure:** Backroom will be developed as a **separate standalone repository** rather than an integrated `/admin` route within the existing portfolio. This enforces a strict separation of concerns between the backend CMS and the frontend portfolio presentation.
- **Tech Stack:**
  - **Framework:** Next.js (App Router)
  - **Database & Auth:** Supabase (PostgreSQL + Supabase Auth)
  - **Object Storage:** Cloudflare R2
  - **Styling & UI:** Tailwind CSS and shadcn/ui
- **Analytics:** A custom analytics solution will be implemented (potentially leveraging Supabase for page-view tracking) or a privacy-friendly provider will be evaluated and integrated during the development phase, as no current provider is in place.

## 3. Core Capabilities
Backroom is designed around several key capability pillars:

### Content & Asset Management
- **TipTap Blog Editor:** A rich-text authoring environment for writing blogs.
- **Integrated Asset Management:** Direct image and file uploads from within the editor, seamlessly pushing assets to Cloudflare R2.
- **Project Manager:** A CRUD interface to add, edit, hide, and remove portfolio projects.

### Career & Identity
- **Resume & Timeline Manager:** Ability to maintain multiple CV variants (different versions of work experience, education, and skills) and toggle which variant is actively displayed on the portfolio.
- **"Link-in-Bio" / Social Links:** Dynamic management of active social media links and featured homepage banners.

### Operations & Marketing
- **SEO & Metadata Control:** Global settings for site-wide default titles and descriptions, alongside dynamic Open Graph image management.
- **Feature Flags & Content Toggles:** Immediate visibility control for hiding or showing specific projects, sections, or WIP components without pushing new code.
- **Tracking & Analytics:** Subdomain tracking and a centralized dashboard for site analytics.

### Workspace & Ideation
- **Ideation Board & Scratchpad:** A Kanban-style board for tracking blog ideas from "Draft" to "Published", and a private notepad for jotting down future project ideas.

## 4. Next Steps
This project is currently in the **Documentation Phase**. No code has been written yet. The next phase will involve scaffolding the separate repository and initializing the Supabase database schema based on these requirements.
