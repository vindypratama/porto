## ADDED Requirements

### Requirement: Experience section displayed on portfolio
The system SHALL display an Experience section showing work history entries with role, company, duration, description, and impact metrics.

#### Scenario: Experience section renders entries
- **WHEN** visitor views the portfolio page and `showExperience` is enabled
- **THEN** system displays all experience entries ordered by sortOrder, showing role, company, duration, description, and impact

#### Scenario: Current position indicator
- **WHEN** an experience entry has `current` set to true
- **THEN** the entry displays a "Current" badge

#### Scenario: Experience section hidden when disabled
- **WHEN** admin disables `showExperience` in settings
- **THEN** the Experience section is not rendered

#### Scenario: Download CV button in Experience section
- **WHEN** visitor views the Experience section
- **THEN** a "Download Resume" button links to the configured `heroResumeUrl`

### Requirement: Admin can manage Experience entries
The system SHALL provide an admin interface for CRUD operations on Experience entries.

#### Scenario: Admin creates experience entry
- **WHEN** admin submits a new experience with role, company, duration, description
- **THEN** system creates the entry and it appears on the public portfolio

#### Scenario: Admin edits experience entry
- **WHEN** admin updates an existing experience entry
- **THEN** system saves changes and reflects them on the public portfolio

#### Scenario: Admin deletes experience entry
- **WHEN** admin deletes an experience entry
- **THEN** system removes it from the portfolio

#### Scenario: Admin reorders experience entries
- **WHEN** admin changes the sortOrder of entries
- **THEN** entries display in the new order on the portfolio

### Requirement: Project has screenshot, live link, and GitHub link
The Project model SHALL support `imageUrl`, `liveUrl`, and `githubUrl` fields.

#### Scenario: Project card shows screenshot
- **WHEN** a project has `imageUrl` set
- **THEN** the project card displays the image above the title

#### Scenario: Project card shows live demo link
- **WHEN** a project has `liveUrl` set
- **THEN** the project card shows a clickable "Live Demo" link icon

#### Scenario: Project card shows GitHub link
- **WHEN** a project has `githubUrl` set
- **THEN** the project card shows a clickable GitHub icon link

#### Scenario: Admin can set project links
- **WHEN** admin creates or edits a project
- **THEN** the form includes fields for image URL, live URL, and GitHub URL
