<?php
// Test simple para verificar PHP
echo "<h1>🏕️ BOOTBOOKINGCAMP - Test PHP</h1>";
echo "<h2>✅ PHP funciona correctamente!</h2>";
echo "<hr>";

echo "<h3>📋 Información del Sistema:</h3>";
echo "<p><strong>Versión PHP:</strong> " . phpversion() . "</p>";
echo "<p><strong>Fecha/Hora:</strong> " . date('Y-m-d H:i:s') . "</p>";
echo "<p><strong>Servidor:</strong> " . $_SERVER['SERVER_SOFTWARE'] ?? 'PHP Development Server' . "</p>";

echo "<h3>🔧 Extensiones PHP Cargadas:</h3>";
$extensions = ['json', 'curl', 'pdo', 'mbstring'];
foreach($extensions as $ext) {
    $status = extension_loaded($ext) ? '✅' : '❌';
    echo "<p>$status $ext</p>";
}

echo "<h3>📁 Estructura de Archivos:</h3>";
echo "<p><strong>Directorio actual:</strong> " . __DIR__ . "</p>";
echo "<p><strong>Archivo actual:</strong> " . __FILE__ . "</p>";

// Verificar si los archivos del proyecto existen
$files = [
    '../src/Application/Bootstrap.php',
    '../data/mock/camping.json',
    '../composer.json'
];

foreach($files as $file) {
    $exists = file_exists($file) ? '✅' : '❌';
    echo "<p>$exists $file</p>";
}

echo "<h3>🌐 Headers HTTP:</h3>";
foreach(getallheaders() as $name => $value) {
    echo "<p><strong>$name:</strong> $value</p>";
}

echo "<h3>🔗 Links de Prueba:</h3>";
echo '<ul>';
echo '<li><a href="/health">Health Check</a></li>';
echo '<li><a href="/api/camping/info">Camping Info API</a></li>';
echo '<li><a href="camping-test.php">Test Camping Data</a></li>';
echo '</ul>';

echo "<hr>";
echo "<p><em>Si ves esta página, PHP está funcionando correctamente en puerto 8000</em></p>";
?>