<?php
// Basic camping info test (without dependencies)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Load camping data directly
$campingFile = __DIR__ . '/../../data/mock/camping.json';

if (!file_exists($campingFile)) {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'error' => 'Camping data file not found',
        'path' => $campingFile
    ], JSON_PRETTY_PRINT);
    exit;
}

$campingData = json_decode(file_get_contents($campingFile), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid JSON in camping data',
        'json_error' => json_last_error_msg()
    ], JSON_PRETTY_PRINT);
    exit;
}

echo json_encode([
    'success' => true,
    'data' => $campingData,
    'timestamp' => date('c')
], JSON_PRETTY_PRINT);
?>