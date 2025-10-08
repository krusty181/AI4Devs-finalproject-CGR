<?php

declare(strict_types=1);

namespace BootBookingCamp\Infrastructure\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use BootBookingCamp\Application\Service\ContactService;
use Nyholm\Psr7\Factory\Psr17Factory;
use InvalidArgumentException;

class ContactController
{
    private ContactService $contactService;
    private Psr17Factory $responseFactory;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
        $this->responseFactory = new Psr17Factory();
    }

    public function submit(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            // Get JSON body
            $body = $request->getBody()->getContents();
            $data = json_decode($body, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return $this->jsonResponse([
                    'success' => false,
                    'error' => 'INVALID_JSON',
                    'message' => 'Invalid JSON format in request body'
                ], 400);
            }

            // Submit contact form
            $contact = $this->contactService->submitContactForm($data);

            return $this->jsonResponse([
                'success' => true,
                'data' => [
                    'contact_id' => $contact->getContactId(),
                    'status' => $contact->getStatus(),
                    'created_at' => $contact->getCreatedAt(),
                    'message' => 'Thank you for your inquiry! We will respond within 24 hours.'
                ],
                'timestamp' => date('c')
            ], 201);

        } catch (InvalidArgumentException $e) {
            return $this->jsonResponse([
                'success' => false,
                'error' => 'VALIDATION_ERROR',
                'message' => $e->getMessage(),
                'required_fields' => [
                    'full_name' => 'Full name (max 100 characters)',
                    'email' => 'Valid email address',
                    'phone' => 'Phone number (9-15 digits)',
                    'check_in_date' => 'Check-in date (YYYY-MM-DD)',
                    'check_out_date' => 'Check-out date (YYYY-MM-DD)',
                    'num_adults' => 'Number of adults (1-10)',
                    'message' => 'Message (max 1000 characters)'
                ],
                'optional_fields' => [
                    'num_children' => 'Number of children (0-8, default 0)'
                ]
            ], 400);

        } catch (\Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error' => 'INTERNAL_ERROR',
                'message' => 'An error occurred while processing your request'
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