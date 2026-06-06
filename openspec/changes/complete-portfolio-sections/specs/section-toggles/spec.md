## ADDED Requirements

### Requirement: Section toggles in admin settings
The system SHALL provide boolean toggles in admin settings to enable/disable each public portfolio section.

#### Scenario: Admin disables a section
- **WHEN** admin toggles off a section (e.g., `showAbout`) in `/admin/settings/sections`
- **THEN** the section is not rendered on the public portfolio page

#### Scenario: Admin enables a section
- **WHEN** admin toggles on a section
- **THEN** the section is rendered on the public portfolio page

#### Scenario: All sections enabled by default
- **WHEN** the system is first set up
- **THEN** all section toggles default to `true`

#### Scenario: Section toggle page shows all sections
- **WHEN** admin navigates to `/admin/settings/sections`
- **THEN** the page displays toggle switches for: Hero, About, Tech Stack, Projects, Experience, Contact

### Requirement: GitHub as first-class contact field
The SiteSettings model SHALL include a dedicated `contactGitHub` field.

#### Scenario: GitHub link displayed in contact section
- **WHEN** `contactGitHub` is set and visitor views the contact section
- **THEN** GitHub is displayed as a primary social link (same level as LinkedIn)

#### Scenario: Admin edits GitHub contact
- **WHEN** admin navigates to `/admin/settings/contact`
- **THEN** a dedicated GitHub URL field is available

### Requirement: Admin settings sections tab
The settings layout SHALL include a "Sections" tab in the tab navigation.

#### Scenario: Sections tab visible
- **WHEN** admin views any settings page
- **THEN** the "Sections" tab appears in the tab navigation
