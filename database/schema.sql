-- =============================================================
-- Database Schema: Diah & Made Wedding Guestbook (Buku Ucapan)
-- Cocok untuk Hostinger MySQL / phpMyAdmin
-- Charset: utf8mb4 (Mendukung emoji ❤️, 💍, 🙏, dll)
-- =============================================================

CREATE TABLE IF NOT EXISTS `wishes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL COMMENT 'Nama Tamu / Pengirim',
  `message` TEXT NOT NULL COMMENT 'Kesan, Pesan & Ucapan Selamat',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Waktu Pengiriman',
  INDEX `idx_created_at` (`created_at` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed Awal (Untaian Doa Pertama)
INSERT INTO `wishes` (`name`, `message`, `created_at`) VALUES
('Keluarga Besar Datuk Bandaro', 'Barekek balimau, basatu duo pusako adaik nan mulia. Samawa untuak ananda Diah dan Made, rukun dan berkah sampai anak cucu.', NOW() - INTERVAL 10 MINUTE),
('Prof. Wayan Sudarta & Keluarga', 'Selamat menempuh hidup baru Made dan Diah. Dumogi langgeng riwekasan, sakinah mawaddah warahmah dalam lindungan Sang Hyang Widhi Wasa.', NOW() - INTERVAL 1 HOUR),
('Rizky Pratama & Amanda', 'Selamat berbahagia Diah & Made! Senang sekali melihat dua insan dan dua budaya yang begitu indah bersatu. Semoga selalu diliputi cinta dan kedamaian.', NOW() - INTERVAL 3 HOUR);
