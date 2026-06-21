# Product Requirements Document (PRD)

**Project Name**: Sellora-AI (sebelumnya QueueIt)  
**Target Audience**: UMKM Indonesia (F&B, Retail, Layanan Jasa)  

---

## 1. Executive Summary
Sellora-AI adalah platform SaaS (Software as a Service) yang dirancang khusus untuk Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia. Platform ini membantu bisnis yang memiliki volume pesanan tinggi (baik *walk-in* maupun *pre-order*) dengan mengubah antrean pesanan WhatsApp yang berantakan menjadi alur pesanan yang terstruktur dan terotomatisasi. Tanpa perlu menginstal aplikasi tambahan, UMKM dapat mengatur nomor antrean, memberikan pembaruan status secara *real-time*, dan memantau pendapatan harian.

## 2. Problem Statement (Latar Belakang Masalah)
- **Manajemen Pesanan yang Kacau**: UMKM sering menerima pesanan melalui WhatsApp yang menumpuk di jam sibuk, membuat pesan mudah terlewat.
- **Antrean Manual**: Pencatatan pesanan dan nomor antrean seringkali dilakukan secara manual (di kertas atau ingatan), yang rentan terhadap *human error* dan pelanggan yang tidak sabar.
- **Sulit Melacak Pendapatan**: Tidak ada rekap otomatis pendapatan harian karena pesanan tersebar di riwayat obrolan WhatsApp.
- **Keengganan Mengunduh Aplikasi**: Pelanggan enggan mengunduh aplikasi baru hanya untuk memesan makanan atau layanan dari UMKM lokal.

## 3. Value Proposition (Nilai Jual)
- **Tanpa Instalasi Aplikasi**: Beroperasi sepenuhnya melalui WhatsApp dan *web link*.
- **Setup Sangat Cepat**: Pemilik usaha dapat mengatur toko dan sistem mereka dalam waktu kurang dari 5 menit.
- **Alur Kerja Otomatis**: Secara otomatis membalas pesanan, memberikan nomor antrean, dan memberikan notifikasi status pesanan kepada pelanggan.

## 4. Core Features (Fitur Utama MVP)

### 4.1. Merchant Dashboard (Untuk Pemilik Usaha)
- **Manajemen Pesanan (Order Management)**: Melihat pesanan masuk, menerima/menolak pesanan, dan mengubah status pesanan (*Menunggu*, *Diproses*, *Selesai/Siap Diambil*).
- **Sistem Antrean Otomatis**: Menghasilkan nomor antrean secara urut untuk setiap pesanan yang masuk.
- **Manajemen Menu/Katalog**: Menambahkan, mengedit, atau menghapus produk/layanan beserta harganya.
- **Dashboard Pendapatan**: Menampilkan analitik sederhana seperti total pendapatan harian, jumlah pesanan, dan menu terlaris.

### 4.2. WhatsApp Automation Bot
- **Auto-Reply Welcome**: Menyapa pelanggan dan memberikan tautan katalog pesanan secara otomatis.
- **Konfirmasi Pesanan**: Mengirimkan struk digital dan nomor antrean ke WhatsApp pelanggan setelah pesanan diterima.
- **Notifikasi Status (Real-time)**: Memberi tahu pelanggan secara otomatis ketika pesanan sedang diproses dan ketika pesanan sudah siap diambil/dikirim.

### 4.3. Customer Experience (Untuk Pelanggan)
- **Web Catalog**: Halaman web ringan dan *mobile-responsive* untuk melihat menu dan melakukan pemesanan (diakses melalui link dari WhatsApp).
- **Live Queue Tracking**: Pelanggan dapat mengecek estimasi waktu dan status antrean mereka melalui tautan web yang diberikan.

## 5. Non-Functional Requirements
- **Bahasa**: Bahasa Indonesia dengan gaya bahasa kasual dan ramah, sesuai dengan target pasar UMKM.
- **Performa**: Harus mampu menangani lonjakan pesan (trafik tinggi) terutama pada jam-jam sibuk seperti jam makan siang dan makan malam.
- **Responsivitas UI/UX**: *Landing page* dan *dashboard* harus sangat responsif di perangkat *mobile* karena mayoritas pemilik UMKM mengelola bisnis lewat *smartphone*.

## 6. Future Roadmap (Rencana Pengembangan Lanjutan)
1. **Integrasi Payment Gateway**: Dukungan pembayaran langsung via QRIS, GoPay, OVO, ShopeePay, dan transfer bank.
2. **Integrasi POS (Point of Sale)**: Sinkronisasi dengan sistem kasir yang mungkin sudah dimiliki UMKM.
3. **AI Customer Service**: Chatbot berbasis AI yang lebih pintar untuk menjawab pertanyaan FAQ pelanggan (seperti jam buka, lokasi, promo).
4. **Multi-Admin / Staff Role**: Dukungan untuk banyak staf agar pegawai kasir dan dapur bisa mengakses sistem yang sama.

---

*Dokumen ini merupakan panduan awal untuk pengembangan produk Sellora-AI dan dapat terus diperbarui sesuai dengan feedback pengguna dan kebutuhan pasar.*
