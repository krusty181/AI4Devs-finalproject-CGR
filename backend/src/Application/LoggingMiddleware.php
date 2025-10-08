<?php

declare(strict_types=1);

namespace BootBookingCamp\Application;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Log\LoggerInterface;

class LoggingMiddleware implements MiddlewareInterface
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $start = microtime(true);
        
        $this->logger->info('Request started', [
            'method' => $request->getMethod(),
            'uri' => (string) $request->getUri(),
            'ip' => $this->getClientIp($request),
            'user_agent' => $request->getHeaderLine('User-Agent')
        ]);
        
        $response = $handler->handle($request);
        
        $duration = round((microtime(true) - $start) * 1000, 2);
        
        $this->logger->info('Request completed', [
            'method' => $request->getMethod(),
            'uri' => (string) $request->getUri(),
            'status' => $response->getStatusCode(),
            'duration_ms' => $duration
        ]);
        
        return $response;
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