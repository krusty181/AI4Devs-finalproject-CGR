<?php
// API de disponibilidad - availability.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Obtener parámetros
$checkIn = $_GET['check_in'] ?? date('Y-m-d');
$checkOut = $_GET['check_out'] ?? date('Y-m-d', strtotime('+3 days'));
$adults = (int)($_GET['adults'] ?? 2);
$children = (int)($_GET['children'] ?? 0);

// Generar disponibilidad mock - Siguiendo el diseño de code.html
$accommodationTypes = [
    [
        'id' => 'parcela-familiar',
        'name' => 'Parcela Familiar',
        'description' => 'Tienda o caravana',
        'capacity' => ['adults' => 4, 'children' => 2],
        'price_per_night' => 45.00,
        'available_units' => 8,
        'amenities' => ['Electricidad', 'Agua', 'Sombra'],
        'images' => [
            'images/accommodations/parcela-familiar.png'
        ]
    ],
    [
        'id' => 'cabana-bosque',
        'name' => 'Cabaña Bosque',
        'description' => 'Para 4 personas',
        'capacity' => ['adults' => 4, 'children' => 2],
        'price_per_night' => 120.00,
        'available_units' => 3,
        'amenities' => ['Cocina', 'Baño privado', 'Chimenea', 'WiFi'],
        'images' => [
            'images/accommodations/cabana_bosque.png'
        ]
    ],
    [
        'id' => 'glamping-suite',
        'name' => 'Glamping Suite',
        'description' => 'Lujo para parejas',
        'capacity' => ['adults' => 2, 'children' => 1],
        'price_per_night' => 150.00,
        'available_units' => 2,
        'amenities' => ['Baño privado', 'Cocina', 'Terraza', 'Jacuzzi', 'WiFi'],
        'images' => [
            'images/accommodations/glamping_suit.png'
        ]
    ]
];

// Filtrar por capacidad
$availableOptions = array_filter($accommodationTypes, function($type) use ($adults, $children) {
    return $type['capacity']['adults'] >= $adults && $type['capacity']['children'] >= $children;
});

// Calcular noches
$checkInDate = new DateTime($checkIn);
$checkOutDate = new DateTime($checkOut);
$nights = $checkInDate->diff($checkOutDate)->days;

// Añadir información de la búsqueda
foreach ($availableOptions as &$option) {
    $option['total_price'] = $option['price_per_night'] * $nights;
    $option['nights'] = $nights;
}

$response = [
    'search_params' => [
        'check_in' => $checkIn,
        'check_out' => $checkOut,
        'adults' => $adults,
        'children' => $children,
        'nights' => $nights
    ],
    'available_accommodations' => array_values($availableOptions),
    'total_results' => count($availableOptions)
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>