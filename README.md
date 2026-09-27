<img src="docs/binus-online.png" alt="BINUS Online" width="180">

# Accord

Toko headphone online sederhana. Dibuat sebagai Tugas Personal Lab ke-1 mata kuliah Specialized Platform Development, BINUS University Online Learning.

## Tentang project

Accord adalah aplikasi web toko online dengan tiga halaman: beranda, daftar produk, dan detail produk. Aplikasinya terbagi jadi dua bagian yang berjalan terpisah. Bagian tampilan dibangun dengan React, sedangkan data produk dilayani oleh REST API sendiri yang menyimpan datanya di MongoDB. Keduanya disambungkan lewat Axios, jadi produk yang muncul pada layar diambil dari database, bukan ditulis langsung di dalam kode.

Tidak ada keranjang belanja, checkout, maupun halaman admin. Cakupannya sengaja dibatasi pada tiga hal yang diminta soal.

## Teknologi

| Bagian | Teknologi |
|---|---|
| Frontend | React (create-react-app), React Router, CSS biasa |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| Komunikasi data | Axios |

## Struktur folder

```
accord-web/
  docs/       logo Binus University Online dan screenshot dokumentasi
  store/      aplikasi React, jalan di port 3000
  server/     REST API Express, jalan di port 5001
```

## Kebutuhan sebelum menjalankan

- Node.js versi 18 atau lebih baru, cek dengan `node -v`
- npm, cek dengan `npm -v`
- MongoDB Community Server yang jalan secara lokal di port 27017
- MongoDB Compass, opsional, untuk lihat isi database

## Catatan soal port backend

API dijalankan di port 5001, bukan 5000 seperti pada modul praktikum. Pada Windows 10 dan 11, port 5000 sering sudah dipakai layanan bawaan sistem, sehingga Express gagal mengikat port tersebut dan servernya berhenti tanpa pesan yang jelas. Kalau di komputer lain port 5000 kosong, nilai `PORT` di `.env` bisa diganti kembali ke 5000, dan `REACT_APP_API_URL` pada frontend ikut disesuaikan.

## Cara install dan menjalankan

Jalankan backend lebih dulu, karena frontend ambil data dari sana.

### 1. Backend

```
cd server
npm install
```

Salin `.env.example` menjadi `.env`, lalu sesuaikan isinya.

```
MONGODB_URI=mongodb://127.0.0.1:27017/spd_lab
PORT=5001
```

Isi database dengan data produk awal, lalu jalankan servernya.

```
npm run seed
npm run dev
```

Perintah `npm run seed` hanya perlu dijalankan sekali. Tanpa langkah ini daftar produk akan kosong.

API berjalan di `http://localhost:5001`.

### 2. Frontend

Buka terminal baru, jangan tutup terminal backend.

```
cd store
npm install
```

Salin `.env.example` menjadi `.env`, isinya menunjuk ke alamat backend.

```
REACT_APP_API_URL=http://localhost:5001
```

Lalu jalankan.

```
npm start
```

Aplikasi terbuka di `http://localhost:3000`.

## Daftar endpoint API

| Method | Path | Keterangan |
|---|---|---|
| GET | /api/products | daftar seluruh produk |
| GET | /api/products/:id | detail satu produk |
| POST | /api/products | menambah produk |
| PUT | /api/products/:id | mengubah produk |
| DELETE | /api/products/:id | menghapus produk |

Belum ada antarmuka admin, jadi operasi tambah, ubah, dan hapus dijalankan lewat curl atau Postman.

## Catatan

Nama dan harga produk pada data contoh mengacu pada produk nyata dan beberapa fiktif, dan hanya dipakai untuk keperluan latihan.