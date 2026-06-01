## ADDED Requirements

### Requirement: Remove unused config directories
The project SHALL NOT contain configuration directories for AI tools that are not actively used.

#### Scenario: Claude Code config removed
- **WHEN** developer inspects the project root
- **THEN** `.claude/` directory SHALL NOT exist

#### Scenario: GitHub Copilot config removed
- **WHEN** developer inspects the project root
- **THEN** `.github/` directory SHALL NOT exist (unless needed for GitHub Actions)

### Requirement: Remove outdated documentation
The project SHALL NOT contain outdated documentation files that duplicate or contradict current documentation.

#### Scenario: Outdated roadmap removed
- **WHEN** developer inspects the project root
- **THEN** `ROADMAP.md` SHALL NOT exist

### Requirement: Gitignore covers generated files
The `.gitignore` file SHALL exclude all auto-generated files from version control.

#### Scenario: Next.js generated files excluded
- **WHEN** developer runs `git status`
- **THEN** `.next/`, `next-env.d.ts`, and `*.tsbuildinfo` SHALL NOT appear as untracked files
