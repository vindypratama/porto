# API Reference

Referensi endpoint API untuk manajemen konten admin. Semua endpoint memerlukan autentikasi (session cookie).

## Posts API

### `GET /api/admin/posts`

Mengambil daftar semua artikel.

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "slug": "string",
    "excerpt": "string",
    "content": "string (Markdown)",
    "coverImage": "string | null",
    "status": "DRAFT | PUBLISHED",
    "tags": ["string"],
    "publishedAt": "ISO 8601 | null",
    "createdAt": "ISO 8601",
    "updatedAt": "ISO 8601",
    "authorId": "string"
  }
]
```

### `POST /api/admin/posts`

Membuat artikel baru.

**Request Body:**
```json
{
  "title": "string (required)",
  "slug": "string (required, unique)",
  "excerpt": "string",
  "content": "string (Markdown)",
  "coverImage": "string",
  "tags": ["string"],
  "status": "DRAFT | PUBLISHED"
}
```

**Validasi:**
- `slug` harus unik — jika sudah ada,返回 error
- `authorId` diambil dari session email yang login

**Response:** `201 Created` dengan data artikel yang dibuat

---

### `GET /api/admin/posts/[id]`

Mengambil satu artikel berdasarkan ID.

**Response:** Object artikel (sama seperti item di array GET list)

### `PATCH /api/admin/posts/[id]`

Memperbarui artikel. Semua field opsional (partial update).

**Request Body:**
```json
{
  "title": "string",
  "slug": "string",
  "excerpt": "string",
  "content": "string",
  "coverImage": "string",
  "tags": ["string"],
  "status": "DRAFT | PUBLISHED"
}
```

**Response:** `200 OK` dengan data artikel yang diperbarui

### `DELETE /api/admin/posts/[id]`

Menghapus artikel berdasarkan ID.

**Response:** `200 OK` dengan konfirmasi penghapusan

---

## Projects API

### `PATCH /api/admin/projects/[id]`

Memperbarui proyek. Semua field opsional (partial update).

**Request Body:**
```json
{
  "title": "string",
  "subtitle": "string",
  "description": "string",
  "domain": "string",
  "highlights": ["string"],
  "tech": ["string"],
  "gradient": "string",
  "icon": "string",
  "order": "number",
  "published": "boolean"
}
```

**Response:** `200 OK` dengan data proyek yang diperbarui

### `DELETE /api/admin/projects/[id]`

Menghapus proyek berdasarkan ID.

**Response:** `200 OK` dengan konfirmasi penghapusan

---

## Autentikasi

Semua endpoint di atas memerlukan session cookie yang valid. Jika tidak terautentikasi, API mengembalikan:

```json
{
  "error": "Unauthorized"
}
```

**Status Code:** `401`
