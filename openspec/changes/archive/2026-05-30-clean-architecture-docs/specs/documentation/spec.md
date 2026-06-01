## ADDED Requirements

### Requirement: Comprehensive README.md
The project SHALL have a `README.md` at the root that serves as the primary documentation entry point.

#### Scenario: README exists at project root
- **WHEN** developer clones the repository
- **THEN** a `README.md` file SHALL exist at the project root directory

#### Scenario: README contains all required sections
- **WHEN** developer reads the README
- **THEN** it SHALL contain: project overview, tech stack, system requirements, installation guide for Windows, installation guide for Ubuntu, environment variables reference, and available scripts

### Requirement: Tech stack documentation
The README SHALL document all technologies used in the project with their versions.

#### Scenario: Tech stack section is complete
- **WHEN** developer reads the tech stack section
- **THEN** it SHALL list: Next.js (version), React (version), TypeScript (version), Prisma (version), PostgreSQL (version), NextAuth (version), Tailwind CSS (version), Docker, and all other significant dependencies

### Requirement: System requirements specification
The README SHALL document minimum system requirements for both development and production environments.

#### Scenario: Development requirements listed
- **WHEN** developer reads the system requirements section
- **THEN** it SHALL specify minimum: Node.js version, npm version, Docker version, OS support (Windows 10+, Ubuntu 20.04+), RAM, and disk space

#### Scenario: Production/server requirements listed
- **WHEN** developer reads the production requirements
- **THEN** it SHALL specify minimum: VPS specs (CPU, RAM, disk), Ubuntu version, Docker, domain name, and SSL certificate

### Requirement: Windows installation guide
The README SHALL provide step-by-step installation instructions for Windows development environment.

#### Scenario: Windows guide covers full setup
- **WHEN** developer follows the Windows installation guide
- **THEN** it SHALL cover: prerequisites installation (Node.js, Docker Desktop, Git), repository clone, environment configuration, database setup via Docker, migration, seeding, and dev server startup

#### Scenario: Windows commands use PowerShell syntax
- **WHEN** developer views command examples in the Windows section
- **THEN** all commands SHALL use PowerShell syntax (not bash)

### Requirement: Ubuntu installation guide
The README SHALL provide step-by-step installation instructions for Ubuntu production deployment.

#### Scenario: Ubuntu guide covers full setup
- **WHEN** developer follows the Ubuntu installation guide
- **THEN** it SHALL cover: server prerequisites, Docker installation, repository clone, environment configuration, Docker Compose build, Nginx reverse proxy setup, and SSL with Let's Encrypt

#### Scenario: Ubuntu commands use bash syntax
- **WHEN** developer views command examples in the Ubuntu section
- **THEN** all commands SHALL use bash syntax

### Requirement: Environment variables reference
The README SHALL document all required and optional environment variables.

#### Scenario: All env vars documented
- **WHEN** developer reads the environment variables section
- **THEN** it SHALL list each variable with: name, description, example value, and whether it is required or optional

#### Scenario: Env var generation instructions provided
- **WHEN** developer needs to generate secrets (AUTH_SECRET)
- **THEN** the README SHALL provide the exact command to generate the secret on both Windows and Ubuntu

### Requirement: Available scripts documentation
The README SHALL document all npm scripts available in the project.

#### Scenario: Scripts table is complete
- **WHEN** developer reads the scripts section
- **THEN** it SHALL list all scripts from `package.json` with description of what each does

### Requirement: Project structure documentation
The README SHALL include a visual representation of the project directory structure.

#### Scenario: Directory tree is accurate
- **WHEN** developer compares the documented structure with actual file system
- **THEN** the directory tree in README SHALL match the actual project structure after reorganization
