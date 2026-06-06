## ADDED Requirements

### Requirement: Documentation index
The `docs/` directory SHALL contain an `index.md` file that serves as a table of contents linking to all documentation pages.

#### Scenario: User opens docs directory
- **WHEN** user navigates to `docs/`
- **THEN** `index.md` lists all available documentation pages with brief descriptions and links

### Requirement: Public portfolio guide
The documentation SHALL describe all sections of the public portfolio page (`/`) including Hero, TechStack, Projects, Contact, and Footer.

#### Scenario: Visitor reads portfolio guide
- **WHEN** visitor reads the portfolio documentation
- **THEN** they understand what each section shows and how to navigate between sections

### Requirement: Blog usage guide
The documentation SHALL describe how to browse and read blog posts on `/blog` and `/blog/[slug]`.

#### Scenario: Visitor reads blog guide
- **WHEN** visitor reads the blog documentation
- **THEN** they understand how to browse the blog listing and read individual posts

### Requirement: Admin login guide
The documentation SHALL describe how to access the admin login page and authenticate.

#### Scenario: Admin reads login guide
- **WHEN** admin reads the login documentation
- **THEN** they know the login URL, required credentials, and what happens after successful login

### Requirement: Post management guide
The documentation SHALL describe all CRUD operations for blog posts in the admin dashboard (`/admin/posts`).

#### Scenario: Admin reads post management guide
- **WHEN** admin reads the post management documentation
- **THEN** they understand how to create, edit, and manage blog posts including fields like title, slug, content (Markdown), tags, status, and cover image

### Requirement: Project management guide
The documentation SHALL describe all CRUD operations for portfolio projects in the admin dashboard (`/admin/projects`).

#### Scenario: Admin reads project management guide
- **WHEN** admin reads the project management documentation
- **THEN** they understand how to create, edit, and manage portfolio projects including fields like title, description, tech stack, and publication status

### Requirement: API reference
The documentation SHALL document all admin API endpoints (`/api/admin/posts`, `/api/admin/projects`) with request/response formats.

#### Scenario: Developer reads API reference
- **WHEN** developer reads the API reference
- **THEN** they know the available endpoints, HTTP methods, request bodies, and response formats for posts and projects CRUD
