<?php
// Simple test file to verify server is working
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'status' => 'ok',
    'message' => 'Backend server is working!',
    'timestamp' => date('c'),
    'php_version' => PHP_VERSION,
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'PHP Built-in Server'
], JSON_PRETTY_PRINT);
?>