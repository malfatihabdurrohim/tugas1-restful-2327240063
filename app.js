// ============================================================
// Tugas 1 - RESTful API Murni dengan Express.js
// Nama   : M. Alfatih Abdurrohim
// NIM    : GANTI_DENGAN_NIM
// Kelas  : SI5B
// Topik  : 2 - Kafe: Pesanan Kopi (/coffee-orders)
// ============================================================

// impor express
const express = require("express");
const app = express();

// middleware agar body JSON (POST/PUT) bisa dibaca lewat req.body
app.use(express.json());

// ------------------------------------------------------------
// DATA AWAL (disimpan di array dalam memori, tanpa database)
// ------------------------------------------------------------
const UKURAN_VALID = ["small", "medium", "large"];

let coffeeOrders = [
  { id: 1, namaPelanggan: "Rani", jenisKopi: "Caffe Latte", ukuran: "large", jumlah: 2, totalHarga: 64000 },
  { id: 2, namaPelanggan: "Budi", jenisKopi: "Americano", ukuran: "medium", jumlah: 1, totalHarga: 22000 },
  { id: 3, namaPelanggan: "Citra", jenisKopi: "Cappuccino", ukuran: "small", jumlah: 3, totalHarga: 66000 },
  { id: 4, namaPelanggan: "Dimas", jenisKopi: "Es Kopi Susu", ukuran: "large", jumlah: 2, totalHarga: 56000 },
];

// id berikutnya (otomatis bertambah)
let nextId = 5;

// ------------------------------------------------------------
// FUNGSI BANTU
// ------------------------------------------------------------

// Mengecek apakah nilai berupa string yang tidak kosong
const stringKosong = (v) => typeof v !== "string" || v.trim() === "";

// Mengecek apakah nilai berupa angka valid
const bukanAngka = (v) => typeof v !== "number" || Number.isNaN(v);

// Validasi semua field wajib. Mengembalikan pesan error, atau null jika valid.
function validasiOrder(body) {
  const { namaPelanggan, jenisKopi, ukuran, jumlah, totalHarga } = body || {};

  if (stringKosong(namaPelanggan)) return "Field namaPelanggan wajib diisi";
  if (stringKosong(jenisKopi)) return "Field jenisKopi wajib diisi";

  if (stringKosong(ukuran)) return "Field ukuran wajib diisi";
  if (!UKURAN_VALID.includes(ukuran)) {
    return "Field ukuran harus salah satu dari: small, medium, large";
  }

  if (jumlah === undefined || jumlah === null || jumlah === "") return "Field jumlah wajib diisi";
  if (bukanAngka(jumlah) || jumlah <= 0) return "Field jumlah harus berupa angka lebih dari 0";

  if (totalHarga === undefined || totalHarga === null || totalHarga === "") return "Field totalHarga wajib diisi";
  if (bukanAngka(totalHarga) || totalHarga < 0) return "Field totalHarga harus berupa angka tidak negatif";

  return null;
}

// ------------------------------------------------------------
// ROUTE
// ------------------------------------------------------------

// GET /
// Info API (JSON)
app.get("/", (req, res) => {
  res.json({
    nama: "M. Alfatih Abdurrohim",
    nim: "GANTI_DENGAN_NIM",
    kelas: "SI5B",
    nomorTopik: 2,
    topik: "Kafe - Pesanan Kopi",
    endpoint: [
      "GET /coffee-orders",
      "GET /coffee-orders/:id",
      "POST /coffee-orders",
      "PUT /coffee-orders/:id",
      "DELETE /coffee-orders/:id",
      "GET /coffee-orders?ukuran=large",
    ],
  });
});

// GET /coffee-orders
// GET /coffee-orders?ukuran=large   (filter dengan query string)
// Mengembalikan data langsung (array), boleh kosong []
app.get("/coffee-orders", (req, res) => {
  const { ukuran } = req.query;

  if (ukuran) {
    const hasil = coffeeOrders.filter(
      (o) => o.ukuran.toLowerCase() === String(ukuran).toLowerCase()
    );
    return res.status(200).json(hasil);
  }

  res.status(200).json(coffeeOrders);
});

// GET /coffee-orders/:id
// Mengembalikan satu objek langsung, 404 jika tidak ada
app.get("/coffee-orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const order = coffeeOrders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${req.params.id} tidak ditemukan`,
      data: null,
    });
  }

  res.status(200).json(order);
});

// POST /coffee-orders
// Body: { "namaPelanggan": "Rani", "jenisKopi": "Caffe Latte", "ukuran": "large", "jumlah": 2, "totalHarga": 64000 }
app.post("/coffee-orders", (req, res) => {
  // validasi: field wajib kosong / tidak valid -> 400
  const pesanError = validasiOrder(req.body);
  if (pesanError) {
    return res.status(400).json({ status: "error", message: pesanError, data: null });
  }

  const { namaPelanggan, jenisKopi, ukuran, jumlah, totalHarga } = req.body;

  // id dibuat otomatis oleh server
  const baru = {
    id: nextId++,
    namaPelanggan: namaPelanggan.trim(),
    jenisKopi: jenisKopi.trim(),
    ukuran,
    jumlah,
    totalHarga,
  };
  coffeeOrders.push(baru);

  // berhasil -> 201 + data yang baru dibuat
  res.status(201).json({
    status: "success",
    message: "Data berhasil ditambahkan",
    data: baru,
  });
});

// PUT /coffee-orders/:id
// Body: { "namaPelanggan": "Rani", "jenisKopi": "Caffe Latte", "ukuran": "medium", "jumlah": 3, "totalHarga": 90000 }
app.put("/coffee-orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = coffeeOrders.findIndex((o) => o.id === id);

  // id tidak ada -> 404
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${req.params.id} tidak ditemukan`,
      data: null,
    });
  }

  // field wajib kosong / tidak valid -> 400
  const pesanError = validasiOrder(req.body);
  if (pesanError) {
    return res.status(400).json({ status: "error", message: pesanError, data: null });
  }

  const { namaPelanggan, jenisKopi, ukuran, jumlah, totalHarga } = req.body;

  // penggantian penuh seluruh field (id tetap)
  coffeeOrders[index] = {
    id,
    namaPelanggan: namaPelanggan.trim(),
    jenisKopi: jenisKopi.trim(),
    ukuran,
    jumlah,
    totalHarga,
  };

  res.status(200).json({
    status: "success",
    message: "Data berhasil diubah",
    data: coffeeOrders[index],
  });
});

// DELETE /coffee-orders/:id
app.delete("/coffee-orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = coffeeOrders.findIndex((o) => o.id === id);

  // id tidak ada -> 404
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${req.params.id} tidak ditemukan`,
      data: null,
    });
  }

  coffeeOrders.splice(index, 1);

  res.status(200).json({
    status: "success",
    message: `Data pesanan kopi dengan id ${id} berhasil dihapus`,
    data: null,
  });
});

// ------------------------------------------------------------
// MIDDLEWARE CATCH-ALL 404 (endpoint tidak terdaftar)
// ------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null,
  });
});

// Penanganan error (mis. JSON body rusak) tetap berformat JSON
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status: "error",
    message: status === 400 ? "Body request bukan JSON yang valid" : "Terjadi kesalahan pada server",
    data: null,
  });
});

// ------------------------------------------------------------
// MENJALANKAN SERVER
// app.listen() hanya jalan di lokal, app di-export untuk Vercel
// ------------------------------------------------------------
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}

module.exports = app;
