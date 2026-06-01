## Context

Portfolio project "2026-porto" saat ini menggunakan data placeholder yang tidak mencerminkan pengalaman profesional Vindy Pratama. CV menunjukkan:
- 10+ tahun pengalaman (2013-sekarang)
- Spesialisasi: backend engineering, system architecture, IoT, enterprise systems
- Tech stack utama: Golang, Node.js, PHP, MySQL, PostgreSQL, Docker, Linux, Nginx
- Project utama: SIPLah Gramedia (B2B), IoT Energy Monitoring, Big Horn Guard (IIoT), WMS

Data yang perlu diupdate:
1. **Hero** — headline dan sub-headline masih generic
2. **TechStack** — skills tidak sesuai CV (ada gRPC, Microservices yang tidak di-mention di CV)
3. **Contact** — masih menggunakan placeholder email/linkedin
4. **Projects** — data project tidak sesuai dengan project real di CV

## Goals / Non-Goals

**Goals:**
- Update Hero section dengan data real dari CV
- Update TechStack skills sesuai core competencies CV
- Update Contact dengan email dan LinkedIn real
- Update Projects dengan 4 project utama dari CV
- Update README.md dengan info yang konsisten

**Non-Goals:**
- Tidak mengubah layout atau design
- Tidak menambahkan section baru
- Tidak mengubah struktur kode
- Tidak menambahkan npm package

## Decisions

### 1. 4 Project Utama dari CV

**Keputusan**: Pilih 4 project yang paling representatif:

1. **SIPLah Gramedia & SSIS** — B2B e-commerce, school procurement (Kompas Gramedia, 2019-sekarang)
2. **IoT Energy Monitoring** — Schneider meters, real-time monitoring (Kompas Gramedia)
3. **Big Horn Guard** — IIoT crude oil monitoring, edge computing (PT. AEON, 2017-2018)
4. **Warehouse Management System** — Multi-tenant WMS dengan RBAC (Kompas Gramedia)

**Alasan**: Project-project ini mencakup range kemampuan (B2B, IoT, enterprise, edge computing) dan menunjukkan evolusi karir.

### 2. Hero Section Update

**Keputusan**: Ubah headline menjadi "Software Engineer & System Architect" sesuai professional summary di CV.

**Alasan**: Lebih akurat mencerminkan 10+ tahun pengalaman dan spesialisasi.

### 3. TechStack Update

**Keputusan**: Update 4 skill group sesuai core competencies CV:
- Backend & APIs: Golang, Node.js, PHP, REST API, JWT, RBAC, MVC
- Infrastructure: Linux, Nginx, Apache, Docker, Edge Computing
- Database: MySQL, PostgreSQL, TimescaleDB, Schema Design
- IoT & Integration: Modbus TCP/RTU, PLC, WebSocket, Real-time Streaming

**Alasan**: Lebih akurat dengan kemampuan real di CV.

### 4. Contact Data

**Keputusan**: Gunakan data real dari CV:
- Email: vindypratama8@gmail.com
- LinkedIn: linkedin.com/in/vindypratama
- Phone: 085274856169 (opsional, mungkin tidak ditampilkan)

**Alasan**: Agar recruiter/client bisa menghubungi langsung.

## Risks / Trade-offs

**[Risk] Data pribadi terekspos** → Mitigasi: Email dan LinkedIn memang sengaja ditampilkan untuk professional contact. Phone tidak ditampilkan di portfolio.

**[Trade-off] Menghilangkan project lain** → Diterima karena 4 project yang dipilih sudah cukup representatif dan konsisten dengan CV.
