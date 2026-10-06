# Tugas 1 - RESTful API Murni dengan Express.js

| | |
|---|---|
| **Nama** | M. Alfatih Abdurrohim |
| **NIM** | 2327240063 |
| **Kelas** | SI5B |
| **Nomor Topik** | 2 - Kafe: Pesanan Kopi |
| **Link Vercel** | https://tugas1-restful-2327240063.vercel.app |
| **Link GitHub** | https://github.com/USERNAME/tugas1-restful-2327240063 |

## Cara Menjalankan Lokal

```bash
npm install
npm run dev     # mode development (nodemon)
# atau
npm start       # mode biasa
```

Server berjalan di http://localhost:3000

## Daftar Endpoint

| Method | Endpoint | Fungsi | Status |
|---|---|---|---|
| GET | `/` | Info API | 200 |
| GET | `/coffee-orders` | Ambil semua data | 200 |
| GET | `/coffee-orders/:id` | Ambil satu data | 200 / 404 |
| POST | `/coffee-orders` | Tambah data | 201 / 400 |
| PUT | `/coffee-orders/:id` | Ubah seluruh data | 200 / 400 / 404 |
| DELETE | `/coffee-orders/:id` | Hapus data | 200 / 404 |
| GET | `/coffee-orders?ukuran=large` | Filter berdasarkan ukuran | 200 |

## Field

`namaPelanggan`* string, `jenisKopi`* string, `ukuran`* (`small` / `medium` / `large`), `jumlah`* number, `totalHarga`* number (* = wajib)

Contoh body POST/PUT:

```json
{ "namaPelanggan": "Rani", "jenisKopi": "Caffe Latte", "ukuran": "large", "jumlah": 2, "totalHarga": 64000 }
```
