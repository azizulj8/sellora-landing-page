# Sellora-AI Landing Page

Sellora-AI (sebelumnya QueueIt) adalah sistem antrean pesanan WhatsApp otomatis yang didesain khusus untuk membantu UMKM. Platform ini mengotomatiskan pesanan pelanggan dan mengelola antrean melalui WhatsApp tanpa perlu instalasi aplikasi tambahan.

## 🛠 Teknologi yang Digunakan

Proyek ini dibangun dengan teknologi modern untuk memastikan performa yang cepat dan pengalaman pengembangan yang baik:

- **Framework**: [React 19](https://react.dev/) dengan [TanStack Start / Router](https://tanstack.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Komponen UI**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/) (Icons)

## 🚀 Cara Menjalankan di Local

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di lingkungan lokal Anda (komputer sendiri).

### 1. Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di sistem Anda.

### 2. Instalasi Dependencies
Buka terminal Anda, masuk ke dalam folder proyek, dan jalankan perintah berikut untuk mengunduh semua *package* yang dibutuhkan:

```bash
npm install
```
*(Catatan: Anda juga bisa menggunakan `yarn install`, `pnpm install`, atau `bun install` sesuai dengan preferensi package manager Anda).*

### 3. Menjalankan Development Server
Setelah proses instalasi selesai, Anda bisa menjalankan *development server* dengan perintah:

```bash
npm run dev
```

### 4. Membuka di Browser
Jika berhasil, terminal akan menampilkan URL lokal. Buka browser Anda dan kunjungi:
```
http://localhost:5173
```
*(Catatan: Port `5173` adalah default dari Vite. Jika port tersebut sudah digunakan, Vite akan otomatis memberikan port lain).*

---

## 📦 Build untuk Production

Jika Anda ingin melakukan *build* aplikasi untuk dideploy ke server *production*, jalankan:

```bash
npm run build
```
Hasil build akan berada di dalam folder `dist/` (atau folder output default Vite lainnya), yang siap untuk disajikan menggunakan *static web server* pilihan Anda.

## 🧹 Linting & Formatting

Untuk mengecek standar kode (linting), Anda dapat menjalankan:
```bash
npm run lint
```

Untuk merapikan format kode secara otomatis, jalankan:
```bash
npm run format
```
