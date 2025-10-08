<?php
// Generador de imágenes placeholder más realistas
header('Content-Type: image/svg+xml');

$type = $_GET['type'] ?? 'tent';
$width = (int)($_GET['width'] ?? 400);
$height = (int)($_GET['height'] ?? 300);

// Colores y configuraciones por tipo
$configs = [
    'tent' => [
        'bg' => '#4CAF50',
        'accent' => '#2E7D32',
        'icon' => '⛺',
        'title' => 'Parcela Tienda'
    ],
    'caravan' => [
        'bg' => '#2196F3', 
        'accent' => '#1565C0',
        'icon' => '🚐',
        'title' => 'Parcela Caravana'
    ],
    'bungalow' => [
        'bg' => '#FF9800',
        'accent' => '#F57C00', 
        'icon' => '🏠',
        'title' => 'Bungalow'
    ],
    'cabin' => [
        'bg' => '#9C27B0',
        'accent' => '#7B1FA2',
        'icon' => '🏘️',
        'title' => 'Cabaña Deluxe'
    ]
];

$config = $configs[$type] ?? $configs['tent'];

$svg = <<<SVG
<svg width="{$width}" height="{$height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{$config['bg']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{$config['accent']};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg)"/>
  
  <!-- Pattern overlay -->
  <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
    <circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#pattern)"/>
  
  <!-- Icon -->
  <text x="50%" y="40%" text-anchor="middle" font-size="60" fill="white" opacity="0.9">
    {$config['icon']}
  </text>
  
  <!-- Title -->
  <text x="50%" y="65%" text-anchor="middle" font-family="Arial, sans-serif" 
        font-size="18" font-weight="bold" fill="white">
    {$config['title']}
  </text>
  
  <!-- Dimensions -->
  <text x="50%" y="80%" text-anchor="middle" font-family="Arial, sans-serif" 
        font-size="12" fill="rgba(255,255,255,0.8)">
    {$width} × {$height}
  </text>
</svg>
SVG;

echo $svg;
?>