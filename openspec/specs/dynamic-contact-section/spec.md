## ADDED Requirements

### Requirement: Contact information is stored in database
The system SHALL persist contact section data in the `SiteSettings` table, including `contactEmail`, `contactLinkedIn`, `contactHeading`, `contactDescription`.

#### Scenario: Contact data exists in database
- **WHEN** the public portfolio page loads
- **THEN** the Contact section renders with data fetched from the database

#### Scenario: Database is unavailable
- **WHEN** the database query for contact settings fails
- **THEN** the Contact section renders with hardcoded default values (current static content)

### Requirement: Admin can edit contact section via form
The admin dashboard SHALL provide a form at `/admin/settings/contact` to edit all contact fields. The form SHALL display current values and save changes to the database.

#### Scenario: Admin updates email
- **WHEN** admin changes the email field to "new@example.com" and clicks Save
- **THEN** the database is updated and the public page shows the new email

#### Scenario: Admin saves with invalid email
- **WHEN** admin enters an invalid email format and submits
- **THEN** the form shows a validation error and does not save

### Requirement: Contact section supports additional links
The contact settings SHALL support storing additional contact links (JSON array or separate table) beyond email and LinkedIn. Each link has a `label`, `url`, and `icon` (lucide icon name).

#### Scenario: Admin adds a GitHub link
- **WHEN** admin adds a link with label "GitHub", url "https://github.com/username", icon "github"
- **THEN** the contact section on the public page displays the GitHub link with the icon

#### Scenario: Admin removes a link
- **WHEN** admin deletes an additional contact link
- **THEN** the link is removed from the database and no longer renders

### Requirement: Contact section fields
The admin form SHALL provide individual input fields for: heading (text input), description (textarea), email (email input), LinkedIn URL (url input), and a list manager for additional links.

#### Scenario: Form displays current values
- **WHEN** admin navigates to `/admin/settings/contact`
- **THEN** the form is pre-filled with current values from the database
