<?php

declare(strict_types=1);

/**
 * BOOTBOOKINGCAMP - Diagnostic Script
 * Run this to identify configuration issues
 */

echo "🏕️  BOOTBOOKINGCAMP Backend Diagnostics\n";
echo "====================================\n\n";

// 1. Check PHP version
echo "📋 PHP Version: " . PHP_VERSION . "\n";
if (version_compare(PHP_VERSION, '8.1.0', '<')) {
    echo "❌ PHP 8.1+ required\n";
    exit(1);
}
echo "✅ PHP version OK\n\n";

// 2. Check required extensions
$required = ['json', 'mbstring', 'curl'];
echo "📦 PHP Extensions:\n";
foreach ($required as $ext) {
    if (extension_loaded($ext)) {
        echo "✅ $ext\n";
    } else {
        echo "❌ $ext (missing)\n";
    }
}
echo "\n";

// 3. Check autoloader
echo "🔧 Autoloader:\n";
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    echo "✅ vendor/autoload.php exists\n";
    require_once __DIR__ . '/vendor/autoload.php';
    echo "✅ Autoloader loaded\n";
} else {
    echo "❌ vendor/autoload.php missing - run 'composer install'\n";
    exit(1);
}
echo "\n";

// 4. Check .env file
echo "⚙️  Environment:\n";
$envFile = __DIR__ . '/../.env';
$envExample = __DIR__ . '/../.env.example';

if (file_exists($envFile)) {
    echo "✅ .env file exists\n";
} elseif (file_exists($envExample)) {
    echo "⚠️  .env missing, but .env.example exists\n";
    echo "   Copy: cp ../.env.example ../.env\n";
} else {
    echo "⚠️  No .env files found - using defaults\n";
}

// Load environment
try {
    if (class_exists('Dotenv\Dotenv')) {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
        $dotenv->load();
        echo "✅ Environment loaded\n";
    }
} catch (Exception $e) {
    echo "⚠️  Environment not loaded: " . $e->getMessage() . "\n";
}

echo "   DATA_SOURCE_MODE: " . ($_ENV['DATA_SOURCE_MODE'] ?? 'mock') . "\n";
echo "\n";

// 5. Check data files
echo "📊 Mock Data Files:\n";
$dataDir = __DIR__ . '/../data/mock';
$requiredFiles = [
    'camping.json',
    'accommodation_types.json', 
    'availability.json',
    'pricing_rules.json',
    'contact_requests.json'
];

foreach ($requiredFiles as $file) {
    $path = $dataDir . '/' . $file;
    if (file_exists($path)) {
        $size = filesize($path);
        echo "✅ $file ($size bytes)\n";
    } else {
        echo "❌ $file (missing)\n";
    }
}
echo "\n";

// 6. Test basic classes
echo "🏗️  Class Loading:\n";
$classes = [
    'BootBookingCamp\\Application\\Bootstrap',
    'BootBookingCamp\\Infrastructure\\Repository\\JsonCampingRepository',
    'BootBookingCamp\\Infrastructure\\Controller\\CampingController'
];

foreach ($classes as $class) {
    if (class_exists($class)) {
        echo "✅ $class\n";
    } else {
        echo "❌ $class (not found)\n";
    }
}
echo "\n";

// 7. Test Bootstrap
echo "🚀 Bootstrap Test:\n";
try {
    $bootstrap = new BootBookingCamp\Application\Bootstrap();
    echo "✅ Bootstrap created\n";
    
    $app = $bootstrap->createApp();
    echo "✅ App created\n";
    
} catch (Exception $e) {
    echo "❌ Bootstrap failed: " . $e->getMessage() . "\n";
    echo "   File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
echo "\n";

// 8. Port check
echo "🔌 Port 8000 Status:\n";
$sock = @fsockopen('localhost', 8000, $errno, $errstr, 1);
if ($sock) {
    echo "⚠️  Port 8000 is already in use\n";
    fclose($sock);
} else {
    echo "✅ Port 8000 is available\n";
}
echo "\n";

echo "🎯 Next Steps:\n";
echo "   1. Fix any ❌ issues above\n";
echo "   2. Run: php -S localhost:8000 -t public\n";
echo "   3. Test: curl http://localhost:8000/health\n";
echo "\n";

echo "💡 If issues persist, check public/index.php for errors\n";