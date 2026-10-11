<?php
/**
 * =========================================================================
 * API Buku Ucapan Pernikahan Diah & Made (Hostinger MySQL Backend)
 * =========================================================================
 * File ini diletakkan di folder public/api/wishes.php
 * Saat diekspor ke Hostinger, file ini otomatis berada di https://domainanda.com/api/wishes.php
 */

// Aktifkan CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Tangani preflight OPTIONS request dari browser
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ─────────────────────────────────────────────────────────────────────────
// KONFIGURASI DATABASE MYSQL HOSTINGER
// Sesuaikan 4 variabel di bawah dengan detail database di hPanel Hostinger:
// ─────────────────────────────────────────────────────────────────────────
$DB_HOST = 'localhost';             // Di Hostinger biasanya tetap 'localhost'
$DB_NAME = 'u123456789_wedding';    // Nama Database (contoh: u123456789_wedding)
$DB_USER = 'u123456789_diah';       // Username Database
$DB_PASS = 'GantiDenganPasswordDb'; // Password Database

// Koneksi PDO ke MySQL
try {
    $dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4";
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Koneksi database gagal. Silakan periksa kredensial di api/wishes.php. Detail: ' . $e->getMessage()
    ]);
    exit();
}

// Otomatis buat tabel jika belum ada (self-healing)
try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `wishes` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(100) NOT NULL,
            `message` TEXT NOT NULL,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
            INDEX `idx_created_at` (`created_at` DESC)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
} catch (Exception $e) {
    // Abaikan jika tabel sudah ada
}

// Helper: Format waktu relatif dalam Bahasa Indonesia
function formatIndonesianTime($datetime) {
    $timestamp = strtotime($datetime);
    if (!$timestamp) return "Baru saja";
    $diff = time() - $timestamp;

    if ($diff < 60) {
        return "Baru saja";
    } elseif ($diff < 3600) {
        return floor($diff / 60) . " menit lalu";
    } elseif ($diff < 86400) {
        return floor($diff / 3600) . " jam lalu";
    } elseif ($diff < 604800) {
        return floor($diff / 86400) . " hari lalu";
    } else {
        return date('d M Y', $timestamp);
    }
}

$method = $_SERVER['REQUEST_METHOD'];

// ─────────────────────────────────────────────────────────────────────────
// 1. GET: Ambil daftar ucapan (Terbaru lebih dulu, maks 100)
// ─────────────────────────────────────────────────────────────────────────
if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT id, name, message, created_at FROM wishes ORDER BY created_at DESC LIMIT 100");
        $rows = $stmt->fetchAll();

        $wishes = array_map(function($row) {
            return [
                'id'      => (string)$row['id'],
                'name'    => htmlspecialchars($row['name'], ENT_QUOTES, 'UTF-8'),
                'message' => htmlspecialchars($row['message'], ENT_QUOTES, 'UTF-8'),
                'time'    => formatIndonesianTime($row['created_at'])
            ];
        }, $rows);

        echo json_encode([
            'status' => 'success',
            'data'   => $wishes
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit();
}

// ─────────────────────────────────────────────────────────────────────────
// 2. POST: Kirim ucapan baru
// ─────────────────────────────────────────────────────────────────────────
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        $data = $_POST;
    }

    $name = isset($data['name']) ? trim($data['name']) : '';
    $message = isset($data['message']) ? trim($data['message']) : '';

    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Nama wajib diisi.']);
        exit();
    }

    if (empty($message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Pesan ucapan wajib diisi.']);
        exit();
    }

    // Batasi panjang karakter untuk keamanan
    $name = mb_substr($name, 0, 50, 'UTF-8');
    $message = mb_substr($message, 0, 500, 'UTF-8');

    try {
        $stmt = $pdo->prepare("INSERT INTO wishes (name, message, created_at) VALUES (:name, :message, NOW())");
        $stmt->execute([
            ':name'    => $name,
            ':message' => $message
        ]);

        $insertedId = (string)$pdo->lastInsertId();

        echo json_encode([
            'status'  => 'success',
            'message' => 'Kesan & ucapan berhasil disimpan.',
            'data'    => [
                'id'      => $insertedId,
                'name'    => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
                'message' => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
                'time'    => 'Baru saja'
            ]
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit();
}

// Method tidak diizinkan
http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
