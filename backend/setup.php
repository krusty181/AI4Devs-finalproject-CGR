#!/usr/bin/env php
<?php

/**
 * BOOTBOOKINGCAMP Backend Setup Script
 * 
 * Simple installation and verification script for the backend API
 */

echo "🏕️  BOOTBOOKINGCAMP Backend Setup\n";
echo "================================\n\n";

// Check PHP version
echo "📋 Checking requirements...\n";
if (version_compare(PHP_VERSION, '8.1.0', '<')) {
    echo "❌ PHP 8.1+ required. Current version: " . PHP_VERSION . "\n";
    exit(1);
}
echo "✅ PHP " . PHP_VERSION . " (OK)\n";

// Check Composer
if (!command_exists('composer')) {
    echo "❌ Composer not found. Please install Composer first.\n";
    exit(1);
}
echo "✅ Composer found\n";

// Check data directory
$dataDir = __DIR__ . '/../data/mock';
if (!is_dir($dataDir)) {
    echo "❌ Mock data directory not found: $dataDir\n";
    exit(1);
}
echo "✅ Mock data directory found\n";

// Install dependencies
echo "\n📦 Installing dependencies...\n";
$output = [];
$returnVar = 0;
exec('composer install --no-dev', $output, $returnVar);

if ($returnVar !== 0) {
    echo "❌ Composer install failed\n";
    echo implode("\n", $output) . "\n";
    exit(1);
}
echo "✅ Dependencies installed\n";

// Check .env file
$envFile = __DIR__ . '/../.env';
$envExample = __DIR__ . '/../.env.example';

if (!file_exists($envFile) && file_exists($envExample)) {
    echo "\n📄 Creating .env file...\n";
    if (copy($envExample, $envFile)) {
        echo "✅ .env file created from .env.example\n";
    } else {
        echo "⚠️  Could not create .env file. Please copy .env.example to .env manually\n";
    }
} elseif (file_exists($envFile)) {
    echo "✅ .env file exists\n";
} else {
    echo "⚠️  No .env.example found. Using default configuration\n";
}

// Test server start
echo "\n🚀 Testing server...\n";
$port = 8000;
$host = 'localhost';

// Start server in background
$serverCmd = "php -S $host:$port -t public > /dev/null 2>&1 & echo \$!";
$pid = trim(shell_exec($serverCmd));

if (!$pid) {
    echo "❌ Could not start test server\n";
    exit(1);
}

// Wait a moment for server to start
sleep(2);

// Test health endpoint
$healthUrl = "http://$host:$port/health";
$health = @file_get_contents($healthUrl);

// Kill test server
if (PHP_OS_FAMILY === 'Windows') {
    exec("taskkill /F /PID $pid 2>nul");
} else {
    exec("kill $pid 2>/dev/null");
}

if ($health === false) {
    echo "❌ Health check failed. Server might not be starting correctly\n";
    echo "💡 Try running manually: php -S $host:$port -t public\n";
    exit(1);
}

$healthData = json_decode($health, true);
if (!$healthData || $healthData['status'] !== 'ok') {
    echo "❌ Health check returned invalid response\n";
    exit(1);
}

echo "✅ Server test successful\n";

// Success message
echo "\n🎉 Setup completed successfully!\n\n";
echo "📋 Next steps:\n";
echo "   1. Start server: php -S $host:$port -t public\n";
echo "   2. Test APIs:\n";
echo "      • Health: curl http://$host:$port/health\n";
echo "      • Camping: curl http://$host:$port/api/camping/info\n";
echo "      • Availability: curl \"http://$host:$port/api/availability?check_in=2025-07-15&check_out=2025-07-20&adults=2\"\n\n";
echo "📚 Documentation: See README.md for full API documentation\n";
echo "🧪 Run tests: composer test\n";
echo "🔧 Code quality: composer check\n\n";

function command_exists($command): bool
{
    $windows = PHP_OS_FAMILY === 'Windows';
    $test = $windows ? 'where' : 'which';
    return is_executable(trim(shell_exec("$test $command")));
}