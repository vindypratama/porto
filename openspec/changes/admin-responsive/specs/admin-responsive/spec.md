## ADDED Requirements

### Requirement: Mobile sidebar drawer
The admin layout SHALL hide the sidebar on screens narrower than 768px (`md` breakpoint) and provide a hamburger button that opens a slide-over drawer overlay with navigation links.

#### Scenario: Mobile user sees hamburger button
- **WHEN** user views any admin page on a screen narrower than 768px
- **THEN** the sidebar is hidden and a hamburger menu button is visible in the top bar

#### Scenario: Hamburger opens drawer
- **WHEN** user taps the hamburger button
- **THEN** a sidebar drawer slides in from the left with a semi-transparent backdrop overlay

#### Scenario: Drawer closes on backdrop tap
- **WHEN** user taps the backdrop overlay
- **THEN** the drawer closes

#### Scenario: Drawer closes on link click
- **WHEN** user taps a navigation link inside the drawer
- **THEN** the drawer closes and navigation occurs

#### Scenario: Desktop sidebar unchanged
- **WHEN** user views any admin page on a screen 768px or wider
- **THEN** the sidebar is displayed as a fixed left panel (existing behavior)

### Requirement: Responsive admin tables
The admin tables (posts list, projects list) SHALL be horizontally scrollable on mobile and hide secondary columns on small screens.

#### Scenario: Table scrolls horizontally on mobile
- **WHEN** user views the posts or projects table on a screen narrower than 768px
- **THEN** the table wrapper allows horizontal scrolling

#### Scenario: Secondary columns hidden on mobile
- **WHEN** user views the posts table on mobile
- **THEN** Tags and Tanggal columns are hidden
- **WHEN** user views the projects table on mobile
- **THEN** Domain and Tech columns are hidden

#### Scenario: All columns visible on desktop
- **WHEN** user views any admin table on a screen 768px or wider
- **THEN** all columns are visible

### Requirement: Responsive post editor
The post editor page SHALL stack metadata and editor vertically on mobile instead of side-by-side.

#### Scenario: Mobile editor shows tab toggle
- **WHEN** user views the post editor on mobile
- **THEN** a tab toggle (Metadata | Editor | Preview) is displayed above the content area

#### Scenario: Tab toggle switches views
- **WHEN** user taps "Metadata" tab
- **THEN** the metadata sidebar fields are shown at full width
- **WHEN** user taps "Editor" tab
- **THEN** the markdown textarea is shown at full width
- **WHEN** user taps "Preview" tab
- **THEN** the preview is shown at full width

#### Scenario: Desktop editor unchanged
- **WHEN** user views the post editor on desktop
- **THEN** the split-panel layout (sidebar + editor/preview) is preserved

### Requirement: Responsive project form
The project form SHALL use responsive grid breakpoints so form fields stack on mobile.

#### Scenario: Form fields stack on mobile
- **WHEN** user views the project form on a screen narrower than 640px
- **THEN** all grid-based field groups (title+subtitle, domain+icon+gradient, order+status) are displayed in a single column

#### Scenario: Form fields show side-by-side on larger screens
- **WHEN** user views the project form on a screen 640px or wider
- **THEN** fields display in their multi-column grid layout (2 or 3 columns)

### Requirement: Responsive settings pages
The settings pages SHALL have scrollable tab navigation and responsive form layouts.

#### Scenario: Settings tabs scroll horizontally on mobile
- **WHEN** user views the settings page on mobile
- **THEN** the tab navigation scrolls horizontally if tabs overflow

#### Scenario: Settings forms stack on mobile
- **WHEN** user views settings forms (contact links, tech stack) on mobile
- **THEN** inline form layouts (flex-row) become stacked (flex-col)

### Requirement: Responsive admin padding
All admin pages SHALL use responsive padding that reduces on mobile.

#### Scenario: Pages use responsive padding
- **WHEN** user views any admin page on mobile
- **THEN** page padding is `p-4` (1rem)
- **WHEN** user views any admin page on desktop
- **THEN** page padding is `p-8` (2rem)
