## Context

The portfolio application (`portfolio-2026`) is a Next.js 16 app with a public portfolio, blog, and admin dashboard. Currently, the project has:

- `README.md` — Tech stack, system requirements, quick start (480 lines)
- `DEPLOYMENT.md` — Comprehensive deployment guide in Indonesian (917 lines)

Missing: end-user documentation explaining how to use the application's features (navigation, blog reading, admin dashboard operations).

## Goals / Non-Goals

**Goals:**
- Provide a user guide for public visitors (portfolio navigation, blog reading)
- Provide an admin guide (login, managing blog posts, managing projects)
- Provide an API reference for admin endpoints
- Write documentation in Indonesian (matching existing DEPLOYMENT.md)
- Keep documentation as static Markdown files in a `docs/` directory

**Non-Goals:**
- Not modifying existing README.md or DEPLOYMENT.md
- Not adding a documentation website generator (e.g., Docusaurus, Nextra)
- Not documenting deployment procedures (already covered in DEPLOYMENT.md)
- Not documenting the codebase architecture for developers (already in README.md)

## Decisions

### 1. Documentation structure: `docs/` directory with flat Markdown files

**Decision**: Create a `docs/` directory at project root with separate `.md` files per topic.

**Alternatives considered**:
- Single large file — rejected, hard to navigate
- Documentation website (Docusaurus/Nextra) — overkill for a portfolio project, adds dependency
- Inline docs in README.md — already long, mixing concerns

**Rationale**: Flat Markdown files are easy to maintain, version-control friendly, and don't require additional tooling.

### 2. Language: Indonesian with English technical terms

**Decision**: Write in Indonesian to match existing DEPLOYMENT.md. Technical terms (API endpoints, code snippets, UI labels) remain in English.

**Rationale**: Consistency with existing documentation; primary audience is Indonesian-speaking.

### 3. Documentation scope: User-facing only

**Decision**: Focus on what users and admins can do with the application, not how the code works.

**Rationale**: Developer documentation is already in README.md. This change fills the gap for non-technical users.

## Risks / Trade-offs

- **Risk**: Documentation may become outdated as features change → **Mitigation**: Keep docs close to code in `docs/`, easy to update alongside feature changes
- **Risk**: Screenshots would help but add maintenance burden → **Mitigation**: Use text-based descriptions with UI element references instead of screenshots
