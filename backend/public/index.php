<?php

declare(strict_types=1);

use Nyholm\Psr7\Factory\Psr17Factory;
use Nyholm\Psr7Server\ServerRequestCreator;
use Slim\Factory\AppFactory;
use BootBookingCamp\Application\Bootstrap;

require_once __DIR__ . '/../vendor/autoload.php';

// Set timezone
date_default_timezone_set('Europe/Madrid');

// Error reporting for development
if (getenv('APP_ENV') !== 'production') {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
}

// Create PSR-17 factories
$psr17Factory = new Psr17Factory();

// Create the server request
$creator = new ServerRequestCreator(
    $psr17Factory,
    $psr17Factory,
    $psr17Factory,
    $psr17Factory
);

$serverRequest = $creator->fromGlobals();

// Bootstrap the application
$bootstrap = new Bootstrap();
$app = $bootstrap->createApp();

// Handle CORS preflight requests
if ($serverRequest->getMethod() === 'OPTIONS') {
    $response = $psr17Factory->createResponse(200);
    $response = $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Max-Age', '86400');
    
    http_response_code(200);
    foreach ($response->getHeaders() as $name => $values) {
        header($name . ': ' . implode(', ', $values));
    }
    exit;
}

// Run the application
$response = $app->handle($serverRequest);

// Send the response
http_response_code($response->getStatusCode());

foreach ($response->getHeaders() as $name => $values) {
    foreach ($values as $value) {
        header($name . ': ' . $value, false);
    }
}

echo $response->getBody();