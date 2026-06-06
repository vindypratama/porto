## ADDED Requirements

### Requirement: Create project via API
The system SHALL provide a `POST /api/admin/projects` endpoint that creates a new project with all required fields.

#### Scenario: Admin creates a new project
- **WHEN** admin sends POST to `/api/admin/projects` with valid data (title, subtitle, description, domain, highlights, tech, gradient, icon)
- **THEN** system creates the project and returns it with status 201

#### Scenario: Create project with missing required fields
- **WHEN** admin sends POST to `/api/admin/projects` with missing required fields
- **THEN** system returns error 400 with message indicating which fields are missing

#### Scenario: Create project without authentication
- **WHEN** unauthenticated user sends POST to `/api/admin/projects`
- **THEN** system returns error 401

### Requirement: Get single project via API
The system SHALL provide a `GET /api/admin/projects/[id]` endpoint that returns a single project by ID.

#### Scenario: Admin fetches a project by ID
- **WHEN** admin sends GET to `/api/admin/projects/[id]` with valid ID
- **THEN** system returns the project data

#### Scenario: Fetch non-existent project
- **WHEN** admin sends GET to `/api/admin/projects/[id]` with invalid ID
- **THEN** system returns error 404

#### Scenario: Fetch project without authentication
- **WHEN** unauthenticated user sends GET to `/api/admin/projects/[id]`
- **THEN** system returns error 401

### Requirement: Create project form page
The system SHALL provide a form page at `/admin/projects/new` for creating new projects.

#### Scenario: Admin accesses create form
- **WHEN** admin navigates to `/admin/projects/new`
- **THEN** system displays a form with all project fields (title, subtitle, description, domain, highlights, tech, gradient, icon, order, published)

#### Scenario: Admin submits create form
- **WHEN** admin fills in all required fields and clicks save
- **THEN** system sends POST to `/api/admin/projects` and redirects to project list on success

#### Scenario: Form validation error
- **WHEN** admin submits form with missing required fields
- **THEN** system displays error message without submitting

### Requirement: Edit project form page
The system SHALL provide a form page at `/admin/projects/[id]/edit` for editing existing projects.

#### Scenario: Admin accesses edit form
- **WHEN** admin navigates to `/admin/projects/[id]/edit`
- **THEN** system fetches project data via GET API and displays form pre-filled with current values

#### Scenario: Admin submits edit form
- **WHEN** admin modifies fields and clicks save
- **THEN** system sends PATCH to `/api/admin/projects/[id]` and redirects to project list on success

#### Scenario: Edit non-existent project
- **WHEN** admin navigates to `/admin/projects/[invalid-id]/edit`
- **THEN** system displays error or redirects to project list

### Requirement: Service layer exposes create and get-by-ID
The project service SHALL expose `createProject(data)` and `getProjectById(id)` functions.

#### Scenario: createProject is called
- **WHEN** service `createProject(data)` is called with valid data
- **THEN** it delegates to repository `createProject` and returns the created project

#### Scenario: getProjectById is called
- **WHEN** service `getProjectById(id)` is called with valid ID
- **THEN** it delegates to repository `findUniqueProject` and returns the project or null
