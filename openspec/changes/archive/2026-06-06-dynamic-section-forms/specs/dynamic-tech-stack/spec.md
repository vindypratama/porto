## ADDED Requirements

### Requirement: Tech stack groups are stored in database
The system SHALL persist tech stack groups in a `TechStackGroup` table with fields: `id`, `name`, `color` (hex or Tailwind class), `sortOrder`. Groups SHALL have many `TechStackItem` records.

#### Scenario: Tech stack data exists in database
- **WHEN** the public portfolio page loads
- **THEN** the TechStack section renders with groups and items fetched from the database

#### Scenario: Database is unavailable
- **WHEN** the database query for tech stack fails
- **THEN** the TechStack section renders with hardcoded default values (current `SKILL_GROUPS`)

### Requirement: Tech stack items are stored in database
The system SHALL persist tech stack items in a `TechStackItem` table with fields: `id`, `name`, `icon` (lucide icon name or emoji), `sortOrder`, `groupId` (foreign key to TechStackGroup).

#### Scenario: Items belong to a group
- **WHEN** the admin creates a tech stack item
- **THEN** the item is associated with a specific group via `groupId`

### Requirement: Admin can manage tech stack groups
The admin dashboard SHALL provide a CRUD interface at `/admin/settings/tech-stack` to create, read, update, and delete tech stack groups.

#### Scenario: Admin creates a new group
- **WHEN** admin fills in group name "Frontend", color "#3b82f6", and clicks Create
- **THEN** a new group is created in the database and appears in the group list

#### Scenario: Admin deletes a group
- **WHEN** admin deletes a group that contains items
- **THEN** all items in that group are also deleted (cascade) and the group is removed

### Requirement: Admin can manage tech stack items
The admin dashboard SHALL provide the ability to create, update, and delete items within a group.

#### Scenario: Admin adds an item to a group
- **WHEN** admin selects a group, enters item name "React", icon "atom", and clicks Add
- **THEN** a new item is created linked to that group

#### Scenario: Admin removes an item
- **WHEN** admin clicks delete on an item
- **THEN** the item is removed from the database and no longer renders on the public page

### Requirement: Tech stack items support icon specification
Each tech stack item SHALL have an `icon` field that stores a lucide-react icon name (string) or an emoji character. The rendering component SHALL resolve the icon name to the actual lucide component or render the emoji.

#### Scenario: Item with lucide icon name
- **WHEN** an item has icon set to "database"
- **THEN** the public page renders the lucide `Database` icon next to the item name

#### Scenario: Item with emoji icon
- **WHEN** an item has icon set to "🐘"
- **THEN** the public page renders the emoji next to the item name

### Requirement: Groups and items have sort order
Both `TechStackGroup` and `TechStackItem` SHALL have a `sortOrder` integer field. The admin UI SHALL allow reordering via sort order input. The public page SHALL render groups and items in ascending sort order.

#### Scenario: Items render in order
- **WHEN** groups have sortOrder [1, 2, 3] and items within each group have sortOrder [1, 2]
- **THEN** the public page renders groups in order 1→2→3 and items within each group in order 1→2
