## ADDED Requirements

### Requirement: Native PostgreSQL installation on Windows
The documentation SHALL provide step-by-step instructions for installing PostgreSQL 16 directly on Windows without Docker.

#### Scenario: PostgreSQL installed and running
- **WHEN** developer follows the Windows native PostgreSQL installation steps
- **THEN** PostgreSQL 16 SHALL be running as a Windows service on port 5432

#### Scenario: Database and user created
- **WHEN** developer completes the database setup steps
- **THEN** a database `porto_db` with user `porto_user` SHALL exist and be accessible

### Requirement: Native PostgreSQL installation on Ubuntu
The documentation SHALL provide step-by-step instructions for installing PostgreSQL 16 directly on Ubuntu without Docker.

#### Scenario: PostgreSQL installed and running
- **WHEN** developer follows the Ubuntu native PostgreSQL installation steps
- **THEN** PostgreSQL 16 SHALL be running as a systemd service on port 5432

#### Scenario: Database and user created
- **WHEN** developer completes the database setup steps
- **THEN** a database `porto_db` with user `porto_user` SHALL exist and be accessible

### Requirement: Native development workflow on Windows
The documentation SHALL provide complete instructions for running the Next.js application natively on Windows with PostgreSQL installed directly.

#### Scenario: Dev server starts successfully
- **WHEN** developer runs `npm run dev` after native PostgreSQL setup
- **THEN** the application SHALL be accessible at `http://localhost:3000`

#### Scenario: Database connection works
- **WHEN** developer accesses the application
- **THEN** the application SHALL connect to the native PostgreSQL database

### Requirement: Native development workflow on Ubuntu
The documentation SHALL provide complete instructions for running the Next.js application natively on Ubuntu with PostgreSQL installed directly.

#### Scenario: Dev server starts successfully
- **WHEN** developer runs `npm run dev` after native PostgreSQL setup
- **THEN** the application SHALL be accessible at `http://localhost:3000`

#### Scenario: Database connection works
- **WHEN** developer accesses the application
- **THEN** the application SHALL connect to the native PostgreSQL database

### Requirement: Native DATABASE_URL format consistency
The documentation SHALL use consistent DATABASE_URL format across all native environments.

#### Scenario: Same URL format everywhere
- **WHEN** developer reads the native setup instructions for any OS
- **THEN** the DATABASE_URL format SHALL be `postgresql://porto_user:password@localhost:5432/porto_db?schema=public`
