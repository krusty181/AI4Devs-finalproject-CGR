<?php

declare(strict_types=1);

namespace BootBookingCamp\Application;

use Slim\Factory\AppFactory;
use Slim\App;
use Dotenv\Dotenv;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\RotatingFileHandler;
use Psr\Log\LoggerInterface;
use Psr\Container\ContainerInterface;
use DI\Container;
use DI\ContainerBuilder;
use BootBookingCamp\Infrastructure\Repository\JsonCampingRepository;
use BootBookingCamp\Infrastructure\Repository\JsonAvailabilityRepository;
use BootBookingCamp\Infrastructure\Repository\JsonContactRepository;
use BootBookingCamp\Infrastructure\Repository\JsonAccommodationTypeRepository;
use BootBookingCamp\Domain\Repository\CampingRepositoryInterface;
use BootBookingCamp\Domain\Repository\AvailabilityRepositoryInterface;
use BootBookingCamp\Domain\Repository\ContactRepositoryInterface;
use BootBookingCamp\Domain\Repository\AccommodationTypeRepositoryInterface;
use BootBookingCamp\Application\Service\AvailabilityService;
use BootBookingCamp\Application\Service\ContactService;
use BootBookingCamp\Application\Service\CampingService;

class Bootstrap
{
    private Container $container;

    public function __construct()
    {
        $this->loadEnvironment();
        $this->container = $this->createContainer();
    }

    public function createApp(): App
    {
        AppFactory::setContainer($this->container);
        $app = AppFactory::create();

        // Add error middleware
        $errorMiddleware = $app->addErrorMiddleware(
            $_ENV['APP_DEBUG'] === 'true',
            true,
            true
        );

        // Add CORS middleware
        $app->add(new CorsMiddleware());

        // Add rate limiting middleware
        $app->add(new RateLimitMiddleware());

        // Add logging middleware
        $app->add(new LoggingMiddleware($this->container->get(LoggerInterface::class)));

        // Register routes
        $this->registerRoutes($app);

        return $app;
    }

    private function loadEnvironment(): void
    {
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
        $dotenv->load();

        // Set default values
        $_ENV['APP_ENV'] = $_ENV['APP_ENV'] ?? 'development';
        $_ENV['APP_DEBUG'] = $_ENV['APP_DEBUG'] ?? 'true';
        $_ENV['DATA_SOURCE_MODE'] = $_ENV['DATA_SOURCE_MODE'] ?? 'mock';
        $_ENV['MOCK_ENABLE_DELAYS'] = $_ENV['MOCK_ENABLE_DELAYS'] ?? 'true';
        $_ENV['MOCK_ERROR_RATE'] = $_ENV['MOCK_ERROR_RATE'] ?? '0.05';
    }

    private function createContainer(): Container
    {
        $containerBuilder = new ContainerBuilder();

        // Logger
        $containerBuilder->addDefinitions([
            LoggerInterface::class => function () {
                $logger = new Logger('bootbookingcamp');
                
                if ($_ENV['APP_ENV'] === 'production') {
                    $handler = new RotatingFileHandler(__DIR__ . '/../../logs/app.log', 0, Logger::INFO);
                } else {
                    $handler = new StreamHandler('php://stdout', Logger::DEBUG);
                }
                
                $logger->pushHandler($handler);
                return $logger;
            }
        ]);

        // Repository bindings based on DATA_SOURCE_MODE
        if ($_ENV['DATA_SOURCE_MODE'] === 'mock') {
            $containerBuilder->addDefinitions([
                CampingRepositoryInterface::class => \DI\autowire(JsonCampingRepository::class),
                AvailabilityRepositoryInterface::class => \DI\autowire(JsonAvailabilityRepository::class),
                ContactRepositoryInterface::class => \DI\autowire(JsonContactRepository::class),
                AccommodationTypeRepositoryInterface::class => \DI\autowire(JsonAccommodationTypeRepository::class),
            ]);
        }
        // Future: Add database repository bindings here

        // Services
        $containerBuilder->addDefinitions([
            AvailabilityService::class => \DI\autowire(AvailabilityService::class),
            ContactService::class => \DI\autowire(ContactService::class),
            CampingService::class => \DI\autowire(CampingService::class),
        ]);

        return $containerBuilder->build();
    }

    private function registerRoutes(App $app): void
    {
        // Health check
        $app->get('/health', function ($request, $response) {
            $data = [
                'status' => 'ok',
                'version' => '1.0.0',
                'timestamp' => date('c'),
                'mode' => $_ENV['DATA_SOURCE_MODE'] ?? 'mock'
            ];
            
            $response->getBody()->write(json_encode($data));
            return $response->withHeader('Content-Type', 'application/json');
        });

        // API routes
        $app->group('/api', function ($group) {
            // Camping routes
            $group->get('/camping/info', 'BootBookingCamp\Infrastructure\Controller\CampingController:getInfo');
            
            // Availability routes
            $group->get('/availability', 'BootBookingCamp\Infrastructure\Controller\AvailabilityController:search');
            
            // Contact routes
            $group->post('/contact', 'BootBookingCamp\Infrastructure\Controller\ContactController:submit');
        });
    }
}