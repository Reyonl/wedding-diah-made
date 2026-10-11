# Panduan Setup Database MySQL di Hostinger

Buku Ucapan (*Guestbook*) pernikahan Diah & Made sudah disiapkan lengkap dengan backend MySQL untuk Hostinger.

---

## Cara Setup di Hostinger (3 Langkah Cepat)

### Langkah 1: Buat Database di hPanel Hostinger
1. Masuk ke **hPanel Hostinger** (`hpanel.hostinger.com`).
2. Masuk ke menu **Databases** -> **MySQL Databases**.
3. Masukkan:
   - **MySQL Database Name**: misal `wedding` (akan menjadi `u123456789_wedding`)
   - **MySQL Username**: misal `diah` (akan menjadi `u123456789_diah`)
   - **Password**: Buat password yang kuat dan catat.
4. Klik **Create**.

---

### Langkah 2: Import Tabel (Opsional)
> **Catatan**: Script `public/api/wishes.php` sudah dilengkapi fitur *auto-create table*. Jika tabel belum ada, script akan otomatis membuatnya sendiri.
> Namun jika ingin meng-import manual:

1. Di hPanel, klik **Enter phpMyAdmin** di samping database yang baru dibuat.
2. Buka tab **Import**.
3. Pilih file `database/schema.sql` lalu klik **Go / Import**.

---

### Langkah 3: Konfigurasi Kredensial di `public/api/wishes.php`
Buka file `public/api/wishes.php` (atau file `api/wishes.php` di File Manager Hostinger), sesuaikan baris 26-29:

```php
$DB_HOST = 'localhost';             // Tetap 'localhost'
$DB_NAME = 'u123456789_wedding';    // Nama Database Anda di Hostinger
$DB_USER = 'u123456789_diah';       // Username Database Anda
$DB_PASS = 'PasswordDatabaseAnda';  // Password yang Anda buat
```

---

## Endpoint API

- **GET** `https://domainanda.com/api/wishes.php`  
  Mengambil daftar ucapan terbaru (format JSON).
- **POST** `https://domainanda.com/api/wishes.php`  
  Mengirim ucapan baru:
  ```json
  {
    "name": "Budi Santoso",
    "message": "Selamat menempuh hidup baru Diah & Made!"
  }
  ```

---

## Catatan Deployment
- Seluruh isi folder `out/` (hasil `npm run build:pages`) tinggal diunggah ke folder `public_html/` di File Manager Hostinger.
- File `api/wishes.php` akan otomatis berada di `public_html/api/wishes.php` dan langsung siap digunakan.
