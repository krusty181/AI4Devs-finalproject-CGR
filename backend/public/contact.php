<?php
// API de contacto - contact.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'message'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $errors[] = "El campo {$field} es requerido";
    }
}

// Validate email
if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "El email no tiene un formato válido";
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos inválidos', 'details' => $errors]);
    exit();
}

// Generate unique contact ID
$contact_id = uniqid('contact_', true);

// Prepare contact data
$contact_data = [
    'id' => $contact_id,
    'name' => trim($input['name']),
    'email' => trim($input['email']),
    'phone' => trim($input['phone'] ?? ''),
    'subject' => trim($input['subject'] ?? 'Consulta general'),
    'message' => trim($input['message']),
    'submitted_at' => date('Y-m-d H:i:s'),
    'status' => 'new'
];

// Save to mock file (in production, save to database)
$contacts_file = '../data/mock/contact_requests.json';
$contacts = [];

if (file_exists($contacts_file)) {
    $contacts = json_decode(file_get_contents($contacts_file), true) ?? [];
}

$contacts[] = $contact_data;

// Save back to file
if (!is_dir('../data/mock')) {
    mkdir('../data/mock', 0755, true);
}

file_put_contents($contacts_file, json_encode($contacts, JSON_PRETTY_PRINT));

// Simulate email sending (in production, use PHPMailer or similar)
$email_sent = true; // Mock success

$response = [
    'success' => true,
    'message' => 'Tu mensaje ha sido enviado correctamente. Te responderemos pronto.',
    'contact_id' => $contact_id,
    'email_sent' => $email_sent
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>