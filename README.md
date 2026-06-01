# Portfolio 2026 — Vindy Pratama | Software Engineer & System Architect

Portfolio application with blog CMS, project showcase, and admin dashboard. Showcasing 10+ years of experience in enterprise systems, B2B platforms, Industrial IoT, and backend engineering. Built with Next.js 16, PostgreSQL, and Docker.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.6 | React framework (App Router, Server Components) |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Prisma | 7.8.0 | ORM & database migrations |
| PostgreSQL | 16 | Primary database |
| NextAuth (Auth.js) | 5.0.0-beta.31 | Authentication (JWT + Credentials) |
| Tailwind CSS | 3.4.x | Utility-first CSS |
| Docker | 24+ | Containerization |
| Nginx | — | Reverse proxy (production) |
| Let's Encrypt | — | SSL certificate (production) |

### Key Dependencies

- `@prisma/adapter-pg` — Prisma PostgreSQL adapter
- `bcryptjs` — Password hashing
- `react-markdown` + `remark-gfm` + `rehype-highlight` — Markdown rendering with syntax highlighting
- `lucide-react` — Icon library

---

## System Requirements

### Development (Local)

| Requirement | Minimum |
|---|---|
| OS | Windows 10+ / macOS 12+ / Ubuntu 20.04+ |
| Node.js | 20.x LTS |
| npm | 10.x |
| Docker | 24.x (Docker Desktop on Windows/macOS) |
| RAM | 4 GB free |
| Disk | 2 GB free |

### Production (VPS Server)

| Requirement | Minimum |
|---|---|
| OS | Ubuntu 24.04 LTS |
| CPU | 1 vCPU |
| RAM | 1 GB |
| Disk | 10 GB SSD |
| Docker | 24.x + Docker Compose Plugin |
| Domain | Required for HTTPS |
| Ports | 22 (SSH), 80 (HTTP), 443 (HTTPS) |

---

## Quick Start — Native (Tanpa Docker)

Jalankan aplikasi dengan PostgreSQL dan Node.js langsung di sistem. Lihat [DEPLOYMENT.md](DEPLOYMENT.md) untuk panduan lengkap.

### Windows

```powershell
# 1. Install PostgreSQL 16 dari https://www.postgresql.org/download/windows/
# 2. Buat database: psql -U postgres → CREATE USER porto_user WITH PASSWORD 'pass'; CREATE DATABASE porto_db OWNER porto_user;
# 3. Clone & setup
git clone <repository-url> 2026-porto && cd 2026-porto
npm install
# 4. Edit .env dengan DATABASE_URL="postgresql://porto_user:pass@localhost:5432/porto_db?schema=public"
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

### Ubuntu

```bash
# 1. Install PostgreSQL 16
sudo apt install -y postgresql-16 postgresql-client-16
# 2. Buat database: sudo -u postgres psql → CREATE USER porto_user WITH PASSWORD 'pass'; CREATE DATABASE porto_db OWNER porto_user;
# 3. Clone & setup
git clone <repository-url> 2026-porto && cd 2026-porto
npm install
# 4. Edit .env dengan DATABASE_URL="postgresql://porto_user:pass@localhost:5432/porto_db?schema=public"
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

> **Dua Jalur:** Panduan lengkap tersedia di [DEPLOYMENT.md](DEPLOYMENT.md) dengan dua jalur:
> - **Native** — PostgreSQL + Node.js langsung di sistem (ringan, mudah debug)
> - **Docker** — Semua dalam container (konsisten, mudah deploy)

---

## Installation — Windows (Development)

### 1. Prerequisites

Install the following:
- [Node.js 20+](https://nodejs.org/) (LTS)
- [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) (hanya jika pakai jalur Docker)
- [Git](https://git-scm.com/)

### 2. Clone & Install

```powershell
git clone <repository-url> 2026-porto
cd 2026-porto
npm install
```

### 3. Environment Configuration

```powershell
# Copy the example env (or use existing .env)
# Edit .env with your values:
```

```env
DATABASE_URL="postgresql://porto_user:porto_dev_password@localhost:5432/porto_db?schema=public"
AUTH_SECRET="<generate-a-random-32-char-string>"
NEXTAUTH_URL="http://localhost:3000"
```

Generate `AUTH_SECRET`:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. Start PostgreSQL via Docker

```powershell
docker compose -f docker-compose.dev.yml up -d
```

Verify: `docker ps` should show `porto_postgres_dev` as `Up`.

### 5. Database Migration & Seed

```powershell
npx prisma migrate dev --name init
npm run db:seed
```

> Change the admin password in `prisma/seed.ts` before seeding:
> ```ts
> password: await bcrypt.hash("YOUR-PASSWORD", 12),
> ```

### 6. Start Development Server

```powershell
npm run dev
```

Application runs at **http://localhost:3000**

| URL | Description |
|---|---|
| `/` | Portfolio home page |
| `/blog` | Blog listing |
| `/admin` | Admin dashboard (requires login) |
| `/admin/login` | Admin login page |

### Useful Commands

```powershell
npm run dev          # Start dev server
npm run build        # Production build
npm run db:migrate   # Create new migration
npm run db:seed      # Re-seed database
npm run db:studio    # Open Prisma Studio (GUI)

# Stop PostgreSQL
docker compose -f docker-compose.dev.yml down

# Stop + delete all data (full reset)
docker compose -f docker-compose.dev.yml down -v
```

---

## Installation — Ubuntu 24.04 (Production)

> **Dua Jalur Tersedia:** Panduan ini menggunakan Docker. Untuk deploy native (tanpa Docker), lihat [DEPLOYMENT.md Bagian 4](DEPLOYMENT.md#bagian-4-deploy-ke-ubuntu-dari-nol-native).

### 1. Connect & Update Server

```bash
ssh root@YOUR_VPS_IP
apt update && apt upgrade -y
```

### 2. Firewall Setup

```bash
apt install -y ufw
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status
```

### 3. Install Docker Engine

```bash
apt install -y ca-certificates curl gnupg

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 4. Clone Repository

```bash
mkdir -p /var/www
cd /var/www
git clone <repository-url> porto
cd porto
```

### 5. Environment Configuration

```bash
cp .env.production.example .env
nano .env
```

```env
POSTGRES_DB=porto_db
POSTGRES_USER=porto_user
POSTGRES_PASSWORD=<strong-password-min-20-chars>

DATABASE_URL="postgresql://porto_user:<strong-password-min-20-chars>@postgres:5432/porto_db?schema=public"

AUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=https://yourdomain.com
```

Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 6. Build & Run Containers

```bash
docker compose up -d --build
```

Docker orchestrates the startup order:
1. `postgres` — waits for health check
2. `migrate` — runs `prisma migrate deploy`, then exits
3. `web` — starts Next.js after migration completes

```bash
docker compose logs -f     # Monitor startup
docker compose ps           # Check container status
```

### 7. Seed Admin Data (First Time)

```bash
docker compose run --rm migrate npx prisma db seed
```

### 8. Nginx Reverse Proxy

```bash
apt install -y nginx
nano /etc/nginx/sites-available/porto
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/porto /etc/nginx/sites-enabled/porto
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

### 9. SSL with Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
certbot renew --dry-run
```

---

## Environment Variables

| Variable | Description | Required | Example |
|---|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Yes | `postgresql://user:pass@host:5432/db?schema=public` |
| `AUTH_SECRET` | Secret key for Auth.js JWT (min 32 chars) | Yes | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Public URL of the application | Yes | `https://yourdomain.com` |
| `POSTGRES_DB` | PostgreSQL database name (Docker) | Yes (prod) | `porto_db` |
| `POSTGRES_USER` | PostgreSQL username (Docker) | Yes (prod) | `porto_user` |
| `POSTGRES_PASSWORD` | PostgreSQL password (Docker) | Yes (prod) | Min 20 characters |

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Run Prisma migration (development) |
| `npm run db:seed` | Seed database with initial data |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

---

## Project Structure

```
2026-porto/
├── app/                              # Next.js App Router
│   ├── (marketing)/                  # Public pages
│   │   ├── page.tsx                  # Home page (portfolio)
│   │   └── blog/
│   │       ├── page.tsx              # Blog listing
│   │       └── [slug]/page.tsx       # Blog post detail
│   ├── admin/                        # Admin dashboard
│   │   ├── layout.tsx                # Admin layout with sidebar
│   │   ├── login/page.tsx            # Login page
│   │   ├── page.tsx                  # Dashboard stats
│   │   ├── posts/                    # Blog post management
│   │   │   ├── page.tsx              # Posts list
│   │   │   ├── new/page.tsx          # New post editor
│   │   │   └── _components/          # Post-specific client components
│   │   └── projects/                 # Project management
│   │       ├── page.tsx              # Projects list
│   │       └── _components/          # Project-specific client components
│   ├── api/                          # API routes
│   │   ├── admin/posts/              # Posts CRUD API
│   │   ├── admin/projects/           # Projects CRUD API
│   │   └── auth/[...nextauth]/       # Auth.js handlers
│   ├── globals.css                   # Global styles + Tailwind
│   └── layout.tsx                    # Root layout
├── modules/                          # Feature modules (Clean Architecture)
│   ├── blog/                         # Blog feature
│   │   ├── components/               # Blog-specific UI
│   │   │   ├── BlogCard.tsx
│   │   │   └── MarkdownRenderer.tsx
│   │   ├── blog.repository.ts        # Data access (Prisma queries)
│   │   ├── blog.service.ts           # Business logic
│   │   └── index.ts                  # Barrel export
│   ├── projects/                     # Projects feature
│   │   ├── components/               # Project-specific UI
│   │   │   ├── ProjectCard.tsx
│   │   │   └── Projects.tsx
│   │   ├── project.repository.ts     # Data access
│   │   ├── project.service.ts        # Business logic
│   │   └── index.ts                  # Barrel export
│   └── auth/                         # Auth feature
│       ├── auth.service.ts           # Auth utilities
│       └── index.ts                  # Barrel export
├── components/                       # Shared UI components
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── TechStack.tsx
│   └── TechStackBadge.tsx
├── lib/                              # Shared utilities
│   └── prisma.ts                     # Prisma client singleton
├── prisma/                           # Database schema & migrations
│   ├── schema.prisma                 # Prisma schema
│   ├── seed.ts                       # Seed data
│   └── migrations/                   # Migration files
├── auth.ts                           # Auth.js configuration
├── middleware.ts                      # Route protection
├── Dockerfile                        # Multi-stage Docker build
├── docker-compose.yml                # Production orchestration
├── docker-compose.dev.yml            # Development PostgreSQL
├── .env                              # Environment variables (local)
├── .env.production.example           # Production env template
├── DEPLOYMENT.md                     # Detailed deployment guide
├── ROADMAP.md                        # Project roadmap
└── package.json                      # Dependencies & scripts
```

---

## Architecture

The project follows a **feature-based Clean Architecture** pattern:

- **Presentation Layer** (`app/`, `components/`, `modules/*/components/`) — Pages, layouts, and UI components
- **Domain Layer** (`modules/*/services/`) — Business logic, independent of framework
- **Infrastructure Layer** (`modules/*/repositories/`, `lib/prisma.ts`) — Database access via Prisma

### Data Flow

```
Page/API Route → Service Layer → Repository Layer → Prisma → PostgreSQL
```

Each layer has a single responsibility:
- **API Routes** handle HTTP concerns (request parsing, response formatting, auth checks)
- **Services** contain business logic (validation, transformation, orchestration)
- **Repositories** encapsulate database queries (Prisma calls)

---

## Updating the Application

```bash
cd /var/www/porto
git pull origin main
docker compose up -d --build
docker compose logs -f web
```

## Maintenance Commands

```bash
docker compose ps                          # Container status
docker compose logs -f web                 # App logs
docker compose logs -f postgres            # DB logs
docker compose restart web                 # Restart app (no rebuild)

# Backup database
docker exec porto_postgres pg_dump -U porto_user porto_db > backup_$(date +%Y%m%d).sql

# Enter container shell
docker compose exec web sh

# Enter PostgreSQL
docker compose exec postgres psql -U porto_user -d porto_db
```

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `migrate` container fails | Check `docker compose logs migrate` — usually wrong `DATABASE_URL` |
| Web can't connect to DB | Ensure `DATABASE_URL` hostname is `postgres`, not `localhost` |
| Port 3000 not accessible | Check `ufw status`, reload Nginx |
| SSL error | Ensure domain points to VPS IP before running Certbot |
| `AUTH_SECRET` error | Must be at least 32 characters |
