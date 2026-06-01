## ADDED Requirements

### Requirement: Hero section reflects CV data
The Hero section SHALL display information consistent with Vindy Pratama's CV professional summary.

#### Scenario: Headline matches CV
- **WHEN** user visits the portfolio home page
- **THEN** the headline SHALL reflect "Software Engineer" with appropriate subtitle matching 10+ years experience

#### Scenario: Sub-headline reflects core expertise
- **WHEN** user reads the Hero section
- **THEN** the sub-headline SHALL mention enterprise systems, IoT, and backend development consistent with CV

### Requirement: TechStack reflects CV core competencies
The TechStack section SHALL display skills that match the Core Competencies section of the CV.

#### Scenario: Backend skills match CV
- **WHEN** user views the TechStack section
- **THEN** Backend & API group SHALL include: Golang, Node.js, PHP, REST API, JWT Authentication, RBAC

#### Scenario: Infrastructure skills match CV
- **WHEN** user views the TechStack section
- **THEN** Infrastructure group SHALL include: Linux, Nginx, Docker, Edge Computing

#### Scenario: Database skills match CV
- **WHEN** user views the TechStack section
- **THEN** Database group SHALL include: MySQL, PostgreSQL, TimescaleDB

### Requirement: Contact section uses real data
The Contact section SHALL use real contact information from the CV.

#### Scenario: Email is real
- **WHEN** user clicks the email link
- **THEN** it SHALL open mailto with vindypratama8@gmail.com

#### Scenario: LinkedIn is real
- **WHEN** user clicks the LinkedIn link
- **THEN** it SHALL navigate to linkedin.com/in/vindypratama

### Requirement: Projects reflect CV experience
The Projects section SHALL display 4 projects from the CV with accurate descriptions.

#### Scenario: SIPLah Gramedia project exists
- **WHEN** user views the projects
- **THEN** there SHALL be a project about SIPLah Gramedia & SSIS (B2B E-Commerce)

#### Scenario: IoT Energy Monitoring project exists
- **WHEN** user views the projects
- **THEN** there SHALL be a project about IoT Energy Monitoring (Schneider meters)

#### Scenario: Big Horn Guard project exists
- **WHEN** user views the projects
- **THEN** there SHALL be a project about Big Horn Guard (IIoT Crude Oil Monitoring)

#### Scenario: WMS project exists
- **WHEN** user views the projects
- **THEN** there SHALL be a project about Warehouse Management System
