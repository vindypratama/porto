## ADDED Requirements

### Requirement: Logo configuration is stored in database
The system SHALL persist logo settings in the `SiteSettings` table, including `logoIcon` (lucide icon name), `logoText` (brand text), `logoImageUrl` (optional image URL, nullable).

#### Scenario: Logo data exists in database
- **WHEN** any page with navigation or footer loads
- **THEN** the logo renders using values from the database

#### Scenario: Database is unavailable
- **WHEN** the database query for logo settings fails
- **THEN** the logo renders with hardcoded defaults (current `Code2` icon + `<dev />` text)

### Requirement: Admin can edit logo via form
The admin dashboard SHALL provide a form at `/admin/settings/logo` to edit logo settings: icon name (text/select input), brand text (text input), and optional image upload.

#### Scenario: Admin changes brand text
- **WHEN** admin changes logo text from "<dev />" to "<engineer />" and saves
- **THEN** Navigation and Footer display the new brand text

#### Scenario: Admin uploads a logo image
- **WHEN** admin uploads a PNG/SVG image file for the logo
- **THEN** the image is saved to `public/uploads/` and `logoImageUrl` is set in the database

#### Scenario: Admin removes logo image
- **WHEN** admin clears the logo image field and saves
- **THEN** `logoImageUrl` is set to null and the icon + text combo is used instead

### Requirement: Logo renders consistently in Navigation and Footer
Both `Navigation.tsx` and `Footer.tsx` SHALL use the same logo data source. If `logoImageUrl` is set, render the image; otherwise render the icon + text combo.

#### Scenario: Image logo in navigation
- **WHEN** `logoImageUrl` is set to "/uploads/logo.png"
- **THEN** Navigation renders `<img src="/uploads/logo.png" />` instead of the icon + text

#### Scenario: Fallback to icon + text
- **WHEN** `logoImageUrl` is null
- **THEN** both Navigation and Footer render the lucide icon specified by `logoIcon` + the `logoText`

### Requirement: Logo icon supports lucide icon names
The `logoIcon` field SHALL store a lucide-react icon name as a string. The system SHALL resolve the name to the actual component at render time. If the icon name is invalid, the system SHALL fall back to the default `Code2` icon.

#### Scenario: Valid icon name
- **WHEN** `logoIcon` is set to "terminal"
- **THEN** the lucide `Terminal` icon is rendered

#### Scenario: Invalid icon name
- **WHEN** `logoIcon` is set to "nonexistent-icon"
- **THEN** the default `Code2` icon is rendered as fallback

### Requirement: Logo image upload validates file type
The system SHALL only accept PNG, SVG, JPG, or WEBP files for logo upload. Maximum file size SHALL be 2MB.

#### Scenario: Valid file upload
- **WHEN** admin uploads a 500KB PNG file
- **THEN** the file is accepted and saved

#### Scenario: Invalid file type
- **WHEN** admin attempts to upload a .txt file
- **THEN** the system rejects the upload with an error message
