<?php
// API de detalles de alojamiento - accommodation.php
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
$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Se requiere un ID de alojamiento'
    ]);
    exit;
}

// Mock data para los diferentes alojamientos
$accommodations = [
    'parcela-familiar' => [
        'id' => 'parcela-familiar',
        'name' => 'Parcela Familiar',
        'type' => 'Parcela',
        'description' => 'Espaciosa parcela para tienda o caravana rodeada de naturaleza. Perfecto para familias que quieren disfrutar de una experiencia de camping tradicional con todas las comodidades modernas. Ubicación privilegiada dentro del camping con fácil acceso a los servicios comunes.',
        'capacity' => ['adults' => 4, 'children' => 2],
        'price_per_night' => 45.00,
        'available_units' => 8,
        'size_m2' => 80,
        'max_vehicles' => 1,
        'amenities' => ['Electricidad', 'Agua', 'Sombra', 'WiFi', 'Mesa picnic', 'Barbacoa permitida'],
        'rules' => [
            'check_in' => '14:00',
            'check_out' => '12:00',
            'pets' => true,
            'noise_curfew' => '22:00 - 08:00'
        ],
        'location' => 'Zona Norte del camping, cercana a los servicios principales',
        'images' => [
            'images/accommodations/parcela-familiar.png',
            'images/accommodations/parcela_familiar_2.png',
            'images/accommodations/parcela_familiar_3.png'
        ],
        'services_nearby' => ['Baños a 50m', 'Restaurante a 100m', 'Piscina a 150m', 'Parque infantil a 80m'],
        'reviews' => [
            [
                'author' => 'María G.',
                'rating' => 4.5,
                'comment' => 'Parcela espaciosa y con buena sombra. Muy cómoda para nuestra caravana.'
            ],
            [
                'author' => 'Pedro L.',
                'rating' => 5,
                'comment' => 'Excelente ubicación dentro del camping, cerca de todos los servicios.'
            ]
        ]
    ],
    'cabana-bosque' => [
        'id' => 'cabana-bosque',
        'name' => 'Cabaña Bosque',
        'type' => 'Cabaña',
        'description' => 'Acogedora cabaña de madera situada en un entorno boscoso que ofrece privacidad y contacto directo con la naturaleza. Ideal para familias o grupos pequeños que buscan una experiencia cómoda en plena naturaleza. Interiores cálidos con todas las comodidades para una estancia perfecta.',
        'capacity' => ['adults' => 4, 'children' => 2],
        'price_per_night' => 120.00,
        'available_units' => 3,
        'size_m2' => 40,
        'bedrooms' => 2,
        'beds' => '1 cama doble, 2 camas individuales, 1 sofá cama',
        'amenities' => ['Cocina completa', 'Baño privado', 'Chimenea', 'WiFi', 'Calefacción', 'TV', 'Terraza', 'Parking'],
        'rules' => [
            'check_in' => '15:00',
            'check_out' => '11:00',
            'pets' => false,
            'noise_curfew' => '23:00 - 08:00'
        ],
        'location' => 'Zona boscosa al este del camping, área tranquila',
        'images' => [
            'images/accommodations/cabana_bosque.png',
            'images/accommodations/cabana_bosque_2.png',
            'images/accommodations/cabana_bosque_3.png'
        ],
        'services_nearby' => ['Tienda a 150m', 'Restaurante a 200m', 'Piscina a 300m'],
        'reviews' => [
            [
                'author' => 'Ana R.',
                'rating' => 5,
                'comment' => 'La cabaña es preciosa y muy acogedora. La chimenea crea un ambiente muy especial.'
            ],
            [
                'author' => 'Carlos M.',
                'rating' => 4,
                'comment' => 'Muy limpia y bien equipada. Un poco lejos de la piscina, pero compensa por la tranquilidad.'
            ]
        ]
    ],
    'glamping-suite' => [
        'id' => 'glamping-suite',
        'name' => 'Glamping Suite',
        'type' => 'Glamping',
        'description' => 'Experiencia única de glamping en una suite de lujo con todas las comodidades. Perfecta para parejas que buscan una escapada romántica sin renunciar al confort. Diseño moderno fusionado con el entorno natural para crear una experiencia inolvidable.',
        'capacity' => ['adults' => 2, 'children' => 1],
        'price_per_night' => 150.00,
        'available_units' => 2,
        'size_m2' => 30,
        'beds' => '1 cama king size',
        'amenities' => ['Baño privado de lujo', 'Cocina equipada', 'Terraza privada', 'Jacuzzi exterior', 'WiFi', 'Aire acondicionado', 'Desayuno incluido', 'Servicio de limpieza diario'],
        'rules' => [
            'check_in' => '16:00',
            'check_out' => '11:00',
            'pets' => false,
            'minimum_stay' => '2 noches'
        ],
        'location' => 'Zona exclusiva en la parte alta del camping con vistas panorámicas',
        'images' => [
            'images/accommodations/glamping_suit.png',
            'images/accommodations/glamping_suit_2.png',
            'images/accommodations/glamping_suit_3.png'
        ],
        'services_nearby' => ['Spa a 50m', 'Restaurante gourmet a 100m', 'Mirador a 80m'],
        'reviews' => [
            [
                'author' => 'Laura y Miguel',
                'rating' => 5,
                'comment' => 'Increíble experiencia. El jacuzzi con vistas al bosque es espectacular.'
            ],
            [
                'author' => 'Isabel T.',
                'rating' => 4.5,
                'comment' => 'Perfecto para una escapada romántica. El desayuno en la terraza fue maravilloso.'
            ]
        ]
    ]
];

// Verificar si existe el alojamiento solicitado
if (!isset($accommodations[$id])) {
    http_response_code(404);
    echo json_encode([
        'error' => 'Alojamiento no encontrado'
    ]);
    exit;
}

// Obtener detalles del alojamiento
$accommodation = $accommodations[$id];

// Datos del camping (contexto)
$camping = [
    'name' => 'Camping Oasis',
    'location' => 'Costa Brava, Girona',
    'rating' => 4.7,
    'total_reviews' => 128
];

// Construir respuesta
$response = [
    'accommodation' => $accommodation,
    'camping' => $camping
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>