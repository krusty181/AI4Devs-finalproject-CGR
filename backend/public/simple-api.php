<?php
// API simple sin dependencias para testing rápido
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$requestUri = $_SERVER['REQUEST_URI'];
$basePath = '/LIDR-AI4Devs/AI4Devs-finalproject-CGR/backend/public';
$path = str_replace($basePath, '', $requestUri);
$path = trim($path, '/');

// Simple routing
switch ($path) {
    case 'health':
        echo json_encode([
            'status' => 'OK',
            'timestamp' => date('Y-m-d H:i:s'),
            'message' => 'Backend funcionando correctamente'
        ]);
        break;
        
    case 'api/camping/info':
        // Leer datos mock
        $campingFile = '../data/mock/camping.json';
        if (file_exists($campingFile)) {
            $camping = json_decode(file_get_contents($campingFile), true);
            echo json_encode($camping);
        } else {
            echo json_encode([
                'id' => 'KCAMP',
                'name' => 'BootBookingCamp',
                'description' => 'Un camping moderno en plena naturaleza',
                'location' => 'Sierra de Madrid',
                'coordinates' => ['lat' => 40.4168, 'lng' => -3.7038],
                'contact' => [
                    'phone' => '+34 123 456 789',
                    'email' => 'info@bootbookingcamp.com'
                ]
            ]);
        }
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found', 'path' => $path]);
        break;
}
?>