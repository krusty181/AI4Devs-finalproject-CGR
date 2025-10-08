<?php

declare(strict_types=1);

namespace BootBookingCamp\Application;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Nyholm\Psr7\Factory\Psr17Factory;

class RateLimitMiddleware implements MiddlewareInterface
{
    private array $requests = [];
    private int $maxRequests;
    private int $timeWindow;

    public function __construct()
    {
        $this->maxRequests = (int) ($_ENV['RATE_LIMIT_REQUESTS_PER_MINUTE'] ?? 100);
        $this->timeWindow = 60; // 1 minute
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $clientIp = $this->getClientIp($request);
        $now = time();
        
        // Clean old requests
        $this->requests[$clientIp] = array_filter(
            $this->requests[$clientIp] ?? [],
            fn($timestamp) => $now - $timestamp < $this->timeWindow
        );
        
        // Check rate limit
        if (count($this->requests[$clientIp] ?? []) >= $this->maxRequests) {
            $factory = new Psr17Factory();
            $response = $factory->createResponse(429);
            $response->getBody()->write(json_encode([
                'success' => false,
                'error' => 'Rate limit exceeded',
                'message' => "Maximum {$this->maxRequests} requests per minute allowed"
            ]));
            
            return $response->withHeader('Content-Type', 'application/json');
        }
        
        // Add current request
        $this->requests[$clientIp][] = $now;
        
        return $handler->handle($request);
    }

    private function getClientIp(ServerRequestInterface $request): string
    {
        $serverParams = $request->getServerParams();
        
        if (!empty($serverParams['HTTP_X_FORWARDED_FOR'])) {
            return explode(',', $serverParams['HTTP_X_FORWARDED_FOR'])[0];
        }
        
        if (!empty($serverParams['HTTP_X_REAL_IP'])) {
            return $serverParams['HTTP_X_REAL_IP'];
        }
        
        return $serverParams['REMOTE_ADDR'] ?? 'unknown';
    }
}