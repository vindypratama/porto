## ADDED Requirements

### Requirement: About Me section displayed on portfolio
The system SHALL display an About Me section on the public portfolio page with biographical content, specialization, and personal touch.

#### Scenario: About section renders with all fields
- **WHEN** visitor views the portfolio page and `showAbout` is enabled
- **THEN** system displays a section with `aboutBio` text, `aboutFocus` areas, and `aboutPersonalTouch` content

#### Scenario: About section hidden when disabled
- **WHEN** admin disables `showAbout` in settings
- **THEN** the About section is not rendered on the public page

#### Scenario: About section has responsive layout
- **WHEN** visitor views the About section on mobile
- **THEN** the content stacks vertically with proper spacing

### Requirement: Hero displays author name
The system SHALL display the author's name prominently in the Hero section above the role/headline.

#### Scenario: Name displayed above headline
- **WHEN** visitor views the Hero section
- **THEN** `heroName` is displayed as a prominent text above the `heroHeadline`

### Requirement: Admin can edit About content
The admin settings about page SHALL include fields for editing `heroName`, `aboutBio`, `aboutImage`, `aboutFocus`, and `aboutPersonalTouch`.

#### Scenario: Admin edits about fields
- **WHEN** admin navigates to `/admin/settings/about`
- **THEN** form displays all About fields and saves to SiteSettings
