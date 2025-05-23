# 📚 Bookshelf API

Bookshelf API adalah RESTful API sederhana yang dikembangkan menggunakan Node.js (tanpa framework) untuk menyimpan dan mengelola data buku. Proyek ini merupakan bagian dari submission kelas **Belajar Membuat Aplikasi Back-End untuk Pemula** di [Dicoding](https://www.dicoding.com/).

API ini menggunakan `http` bawaan Node.js dan menyimpan data secara sementara (in-memory) tanpa database.

---

## 🚀 Fitur

Berikut adalah fitur-fitur utama yang disediakan oleh API ini:

### ✅ \[Mandatory] Fitur Wajib:

* **Menambahkan buku**
  Endpoint: `POST /books`

* **Menampilkan seluruh buku**
  Endpoint: `GET /books`

* **Menampilkan detail buku berdasarkan ID**
  Endpoint: `GET /books/{bookId}`

* **Memperbarui data buku berdasarkan ID**
  Endpoint: `PUT /books/{bookId}`

* **Menghapus buku berdasarkan ID**
  Endpoint: `DELETE /books/{bookId}`

### 🌟 \[Optional] Fitur Tambahan:

* **Filter buku berdasarkan nama (case-insensitive)**
  Contoh: `GET /books?name=dicoding`

* **Filter buku berdasarkan status dibaca (`reading`)**
  `GET /books?reading=1` → buku yang sedang dibaca
  `GET /books?reading=0` → buku yang tidak sedang dibaca

* **Filter buku berdasarkan status selesai (`finished`)**
  `GET /books?finished=1` → buku yang sudah selesai dibaca
  `GET /books?finished=0` → buku yang belum selesai dibaca

---

## ⚙️ Menjalankan Proyek

### 1. Clone repositori:

```bash
git clone https://github.com/gustygnm/belajar-back-end-pemula-dengan-javascript-dicoding-submission.git
cd bookshelf-api
```

### 2. Install dependencies (jika ada):

Proyek ini hanya menggunakan `nanoid`, jadi cukup install dengan:

```bash
npm install nanoid@3
```

### 3. Menjalankan server:

```bash
npm run start 
```

Server akan berjalan di:
📍 `http://localhost:9000`

---

## ✅ Format Response

Semua response menggunakan format JSON dengan struktur umum seperti berikut:

```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "bookId": "abc123"
  }
}
```

Atau, jika terjadi kesalahan:

```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

---

## 🧹 Code Style & Linter

Proyek ini menggunakan **ESLint** dan mengikuti salah satu style guide populer seperti **Airbnb Style Guide**. Untuk memastikan kode bersih:

```bash
npx eslint .
```

Tidak boleh ada error linting untuk memenuhi kriteria kelulusan submission.
