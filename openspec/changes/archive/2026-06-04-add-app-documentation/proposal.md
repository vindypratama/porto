## Why

The portfolio application lacks user-facing documentation that explains how to use the application's features (public portfolio, blog, admin dashboard). The existing README.md covers tech stack and system requirements, and DEPLOYMENT.md covers deployment — but there is no guide for end users or admins on how to navigate and use the application's features.

## What Changes

- Add a comprehensive `docs/` directory with structured documentation covering:
  - Application overview and features
  - Public-facing pages (portfolio, blog)
  - Admin dashboard usage (login, managing posts, managing projects)
  - API reference for admin endpoints
- Documentation will be written in Indonesian (matching DEPLOYMENT.md language) with English section headers for code/technical terms

## Capabilities

### New Capabilities
- `app-documentation`: User and admin documentation covering application features, navigation, admin dashboard usage, and API reference

### Modified Capabilities

## Impact

- New `docs/` directory with markdown files
- No code changes required — documentation only
- No dependency changes
- No breaking changes to existing functionality
