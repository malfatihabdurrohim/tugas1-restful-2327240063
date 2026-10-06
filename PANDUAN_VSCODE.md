# Panduan Pengerjaan di Visual Studio Code

## 0. Persiapan
- Install Node.js LTS (https://nodejs.org), Git, dan VS Code.
- Cek di terminal: `node -v`, `npm -v`, `git --version`.
- Ekstensi VS Code yang disarankan: **Thunder Client** (uji API).

## 1. Buka project
1. Ganti nama folder `tugas1-restful-NIM` menjadi `tugas1-restful-{NIM_anda}`.
2. VS Code -> **File > Open Folder** -> pilih folder tersebut.
3. Cari teks `GANTI_DENGAN_NIM` (Ctrl+Shift+F) di `app.js` dan `README.md`, ganti dengan NIM Anda.
   Ganti juga `NIM` / `USERNAME` pada link di `README.md` dan `name` di `package.json`.

## 2. Install & jalankan (Terminal VS Code: Ctrl+`)
```bash
npm install
npm run dev
```
Muncul log: `Server berjalan di http://localhost:3000`

> Catatan: file `package.json` sudah berisi express (dependencies), nodemon (devDependencies),
> `"main": "app.js"`, serta script `start` dan `dev`. Jika ingin membuat dari nol sesuai Soal 1:
> `npm init -y`, `npm install express`, `npm install --save-dev nodemon`.

## 3. Uji di Thunder Client / Postman
- Import `Tugas1_Coffee_Orders.postman_collection.json` (opsional, nilai tambah).
- Uji 10 skenario pada tabel laporan; screenshot request + response + status code.

## 4. Git: commit bertahap (minimal 5)
Buat repository **publik** `tugas1-restful-{NIM}` di GitHub (kosong, tanpa README).

Karena `app.js` sudah lengkap, buat commit bertahap dengan cara **menyalin kode per tahap**:
kosongkan `app.js` lebih dulu (simpan salinan lengkapnya di tempat lain), lalu tempel bagian demi bagian
dan commit setiap selesai satu tahap:

| Commit | Isi `app.js` pada tahap itu | Pesan commit |
|---|---|---|
| 1 | package.json, .gitignore, server + `express.json()` | `init project express` |
| 2 | data awal, `nextId`, GET /, GET semua, GET :id, filter | `tambah route GET` |
| 3 | POST + fungsi validasi | `tambah POST dan validasi` |
| 4 | PUT, DELETE, catch-all 404 | `tambah PUT dan DELETE` |
| 5 | `module.exports = app` + `vercel.json` | `konfigurasi vercel` |
| 6 | README.md | `tambah README` |

```bash
git init
git branch -M main
git add .
git commit -m "init project express"
# ... ulangi git add . + git commit -m "..." untuk tiap tahap

git remote add origin https://github.com/USERNAME/tugas1-restful-NIM.git
git push -u origin main
git log --oneline          # screenshot untuk lampiran laporan
```

## 5. Deploy ke Vercel
1. Login ke https://vercel.com dengan akun GitHub.
2. **Add New -> Project** -> import repo `tugas1-restful-{NIM}` -> **Deploy**.
3. Uji: `https://tugas1-restful-{NIM}.vercel.app/coffee-orders`
4. Setiap `git push` ke `main` akan otomatis deploy ulang.

## 6. Yang dikumpulkan ke LMS
- `Laporan_Tugas1_NIM_Nama.pdf` (format bagian E)
- Link GitHub + link Vercel (juga ada di laporan & README)
- (Opsional) file koleksi Postman `.json`
