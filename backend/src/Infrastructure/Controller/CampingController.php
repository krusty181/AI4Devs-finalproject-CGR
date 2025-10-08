<?php

declare(strict_types=1);

namespace BootBookingCamp\Infrastructure\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use BootBookingCamp\Application\Service\CampingService;
use Nyholm\Psr7\Factory\Psr17Factory;

class CampingController
{
    private CampingService $campingService;
    private Psr17Factory $responseFactory;

    public function __construct(CampingService $campingService)
    {
        $this->campingService = $campingService;
        $this->responseFactory = new Psr17Factory();
    }

    public function getInfo(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $camping = $this->campingService->getCampingInfo();

            if (!$camping) {
                return $this->jsonResponse([
                    'success' => false,
                    'error' => 'NOT_FOUND',
                    'message' => 'Camping information not found'
                ], 404);
            }

            return $this->jsonResponse([
                'success' => true,
                'data' => $camping->toArray(),
                'timestamp' => date('c')
            ]);

        } catch (\Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error' => 'INTERNAL_ERROR',
                'message' => 'An error occurred while retrieving camping information'
            ], 500);
        }
    }

    private function jsonResponse(array $data, int $statusCode = 200): ResponseInterface
    {
        $response = $this->responseFactory->createResponse($statusCode);
        $response->getBody()->write(json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        return $response->withHeader('Content-Type', 'application/json');
    }
}