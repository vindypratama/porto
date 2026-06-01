## ADDED Requirements

### Requirement: Fresh VPS server preparation
The documentation SHALL provide complete instructions for preparing a fresh Ubuntu 24.04 VPS from initial SSH connection to ready-for-deployment state.

#### Scenario: Server secured with firewall
- **WHEN** administrator follows the server preparation steps
- **THEN** UFW firewall SHALL be active with only ports 22, 80, 443 allowed

#### Scenario: System updated
- **WHEN** administrator runs the update commands
- **THEN** all system packages SHALL be updated to latest versions

### Requirement: Node.js installation on Ubuntu server
The documentation SHALL provide instructions for installing Node.js 20 LTS on Ubuntu server using NodeSource or nvm.

#### Scenario: Node.js installed and verified
- **WHEN** administrator follows the Node.js installation steps
- **THEN** `node --version` SHALL show v20.x and `npm --version` SHALL show 10.x

### Requirement: Native PostgreSQL installation on production server
The documentation SHALL provide instructions for installing and configuring PostgreSQL 16 directly on the Ubuntu server for production use.

#### Scenario: PostgreSQL running as systemd service
- **WHEN** administrator completes PostgreSQL installation
- **THEN** PostgreSQL SHALL be running and enabled on boot via systemd

#### Scenario: Production database configured
- **WHEN** administrator completes database setup
- **THEN** a production database with secure password SHALL be created and accessible

#### Scenario: PostgreSQL authentication configured
- **WHEN** administrator configures pg_hba.conf
- **THEN** password authentication SHALL be required for local connections

### Requirement: Application deployment with systemd
The documentation SHALL provide instructions for deploying the Next.js application as a systemd service (not Docker).

#### Scenario: systemd service created
- **WHEN** administrator creates the systemd service file
- **THEN** the service SHALL be named `porto` and run as a dedicated user

#### Scenario: Application starts on boot
- **WHEN** server restarts
- **THEN** the application SHALL automatically start via systemd

#### Scenario: Application accessible on port 3000
- **WHEN** systemd service is running
- **THEN** the application SHALL be accessible at `http://localhost:3000`

### Requirement: Nginx reverse proxy configuration
The documentation SHALL provide Nginx reverse proxy configuration for the native deployment.

#### Scenario: Nginx proxies to Next.js
- **WHEN** user accesses the domain
- **THEN** Nginx SHALL proxy the request to the Next.js application on port 3000

#### Scenario: WebSocket support
- **WHEN** application uses WebSocket connections
- **THEN** Nginx SHALL properly forward WebSocket upgrade headers

### Requirement: SSL certificate with Let's Encrypt
The documentation SHALL provide instructions for obtaining and configuring SSL certificates using Certbot.

#### Scenario: HTTPS enabled
- **WHEN** administrator runs Certbot with the domain
- **THEN** the site SHALL be accessible via HTTPS

#### Scenario: Auto-renewal configured
- **WHEN** administrator completes Certbot setup
- **THEN** SSL certificate SHALL auto-renew before expiration

### Requirement: Database migration in production
The documentation SHALL provide instructions for running Prisma migrations on the production server.

#### Scenario: Migrations applied successfully
- **WHEN** administrator runs migration commands
- **THEN** database schema SHALL be up to date with the application code

#### Scenario: Seed data loaded
- **WHEN** administrator runs seed command for the first time
- **THEN** admin user and initial data SHALL be created in the database

### Requirement: Maintenance and update procedures
The documentation SHALL provide procedures for ongoing maintenance of the native deployment.

#### Scenario: Application updated
- **WHEN** administrator pulls new code and restarts the service
- **THEN** the updated application SHALL be running with zero-downtime or minimal downtime

#### Scenario: Database backed up
- **WHEN** administrator runs backup command
- **THEN** a SQL dump file SHALL be created with the current database state

#### Scenario: Logs accessible
- **WHEN** administrator needs to check application logs
- **THEN** `journalctl` commands SHALL show application logs

### Requirement: Troubleshooting guide for native deployment
The documentation SHALL include a troubleshooting section covering common issues with native deployment.

#### Scenario: Common issues documented
- **WHEN** administrator encounters a problem
- **THEN** the troubleshooting section SHALL provide solutions for: PostgreSQL connection issues, systemd service failures, Nginx configuration errors, SSL certificate problems, and permission issues
