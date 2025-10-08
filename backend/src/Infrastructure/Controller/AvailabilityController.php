<?php

declare(strict_types=1);

namespace BootBookingCamp\Infrastructure\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use BootBookingCamp\Application\Service\AvailabilityService;
use Nyholm\Psr7\Factory\Psr17Factory;
use InvalidArgumentException;

class AvailabilityController
{
    private AvailabilityService $availabilityService;
    private Psr17Factory $responseFactory;

    public function __construct(AvailabilityService $availabilityService)
    {
        $this->availabilityService = $availabilityService;
        $this->responseFactory = new Psr17Factory();
    }

    public function search(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $queryParams = $request->getQueryParams();

            // Extract and validate parameters
            $checkInDate = $queryParams['check_in'] ?? '';
            $checkOutDate = $queryParams['check_out'] ?? '';
            $adults = (int) ($queryParams['adults'] ?? 0);
            $children = (int) ($queryParams['children'] ?? 0);

            // Validate required parameters
            if (empty($checkInDate) || empty($checkOutDate) || $adults === 0) {
                return $this->jsonResponse([
                    'success' => false,
                    'error' => 'INVALID_PARAMS',
                    'message' => 'Required parameters: check_in, check_out, adults (minimum 1)',
                    'required_params' => [
                        'check_in' => 'Date in YYYY-MM-DD format',
                        'check_out' => 'Date in YYYY-MM-DD format',  
                        'adults' => 'Number of adults (minimum 1)'
                    ],
                    'optional_params' => [
                        'children' => 'Number of children (default 0)'
                    ]
                ], 400);
            }

            // Search availability
            $availability = $this->availabilityService->searchAvailability(
                $checkInDate,
                $checkOutDate,
                $adults,
                $children
            );

            return $this->jsonResponse([
                'success' => true,
                'data' => $availability,
                'timestamp' => date('c')
            ]);

        } catch (InvalidArgumentException $e) {
            return $this->jsonResponse([
                'success' => false,
                'error' => 'VALIDATION_ERROR',
                'message' => $e->getMessage()
            ], 400);

        } catch (\Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error' => 'INTERNAL_ERROR',
                'message' => 'An error occurred while searching availability'
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