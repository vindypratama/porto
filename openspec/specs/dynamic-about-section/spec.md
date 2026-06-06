## ADDED Requirements

### Requirement: About section content is stored in database
The system SHALL persist About/Hero section content in a `SiteSettings` database table, including `heroHeadline`, `heroDescription`, `heroAvailability`, `heroResumeUrl`, `heroCtaPrimary`, `heroCtaSecondary`.

#### Scenario: About content exists in database
- **WHEN** the public portfolio page loads
- **THEN** the Hero section renders with content fetched from the database

#### Scenario: Database is unavailable
- **WHEN** the database query for site settings fails
- **THEN** the Hero section renders with hardcoded default values (current static content)

### Requirement: Admin can edit About section via form
The admin dashboard SHALL provide a form at `/admin/settings/about` to edit all About/Hero fields. The form SHALL display current values and save changes to the database.

#### Scenario: Admin updates headline
- **WHEN** admin navigates to `/admin/settings/about`, changes the headline field, and clicks Save
- **THEN** the database is updated and a success confirmation is shown

#### Scenario: Admin saves with empty required fields
- **WHEN** admin submits the form with the headline field empty
- **THEN** the form shows a validation error and does not save

### Requirement: About section fields are individually editable
The admin form SHALL provide individual input fields for: headline (text input), description (textarea), availability badge text (text input), resume URL (text input), primary CTA text (text input), secondary CTA text (text input).

#### Scenario: Admin edits description
- **WHEN** admin modifies the description textarea and saves
- **THEN** only the description is updated; other fields remain unchanged

### Requirement: Changes reflect on public page
Changes saved via the admin form SHALL be visible on the public portfolio page on the next page load without redeployment.

#### Scenario: Verify change appears
- **WHEN** admin saves a new headline "Full Stack Developer"
- **THEN** the public page at `/` displays "Full Stack Developer" as the headline on next load
