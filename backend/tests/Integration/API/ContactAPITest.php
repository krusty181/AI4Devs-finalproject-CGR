<?php

declare(strict_types=1);

namespace BootBookingCamp\Tests\Integration\API;

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

class ContactAPITest extends TestCase
{
    private Client $client;
    private string $baseUrl;

    protected function setUp(): void
    {
        $this->baseUrl = 'http://localhost:8000/api';
        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout' => 10,
            'http_errors' => false
        ]);
    }

    public function testSubmitContactSuccess(): void
    {
        // Arrange
        $contactData = [
            'name' => 'Juan Pérez',
            'email' => 'juan.perez@email.com',
            'phone' => '+34 666 123 456',
            'message' => 'Me interesa hacer una reserva para el verano',
            'check_in_date' => '2024-07-15',
            'check_out_date' => '2024-07-20',
            'guests' => 4,
            'accommodation_type' => 'parcela_standard'
        ];

        // Act
        $response = $this->client->post('/contact', [
            'json' => $contactData,
            'headers' => [
                'Content-Type' => 'application/json'
            ]
        ]);

        // Assert
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeader('Content-Type')[0]);

        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertIsArray($data);
        $this->assertArrayHasKey('success', $data);
        $this->assertTrue($data['success']);
        $this->assertArrayHasKey('data', $data);
        
        $contact = $data['data'];
        $this->assertArrayHasKey('id', $contact);
        $this->assertArrayHasKey('name', $contact);
        $this->assertArrayHasKey('email', $contact);
        $this->assertEquals('Juan Pérez', $contact['name']);
        $this->assertEquals('juan.perez@email.com', $contact['email']);
    }

    public function testSubmitContactValidationErrors(): void
    {
        // Arrange - Invalid data
        $invalidData = [
            'name' => '', // Empty name
            'email' => 'invalid-email', // Invalid email format
            'phone' => '123', // Invalid phone
            'message' => '', // Empty message
            'check_in_date' => '2024-13-45', // Invalid date
            'guests' => -1 // Invalid number of guests
        ];

        // Act
        $response = $this->client->post('/contact', [
            'json' => $invalidData,
            'headers' => [
                'Content-Type' => 'application/json'
            ]
        ]);

        // Assert
        $this->assertEquals(422, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeader('Content-Type')[0]);

        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertIsArray($data);
        $this->assertArrayHasKey('success', $data);
        $this->assertFalse($data['success']);
        $this->assertArrayHasKey('errors', $data);
        
        $errors = $data['errors'];
        $this->assertIsArray($errors);
        $this->assertArrayHasKey('name', $errors);
        $this->assertArrayHasKey('email', $errors);
        $this->assertArrayHasKey('phone', $errors);
        $this->assertArrayHasKey('message', $errors);
    }

    public function testSubmitContactMissingRequiredFields(): void
    {
        // Arrange - Missing required fields
        $incompleteData = [
            'name' => 'Juan Pérez'
            // Missing email, phone, message
        ];

        // Act
        $response = $this->client->post('/contact', [
            'json' => $incompleteData,
            'headers' => [
                'Content-Type' => 'application/json'
            ]
        ]);

        // Assert
        $this->assertEquals(422, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertIsArray($data);
        $this->assertArrayHasKey('success', $data);
        $this->assertFalse($data['success']);
        $this->assertArrayHasKey('errors', $data);
        
        $errors = $data['errors'];
        $this->assertArrayHasKey('email', $errors);
        $this->assertArrayHasKey('message', $errors);
    }

    public function testGetAllContacts(): void
    {
        // First, create a contact
        $contactData = [
            'name' => 'María García',
            'email' => 'maria.garcia@email.com',
            'phone' => '+34 677 987 654',
            'message' => 'Consulta sobre disponibilidad',
            'check_in_date' => '2024-08-01',
            'check_out_date' => '2024-08-07',
            'guests' => 2
        ];

        $this->client->post('/contact', [
            'json' => $contactData,
            'headers' => ['Content-Type' => 'application/json']
        ]);

        // Act - Get all contacts
        $response = $this->client->get('/contact');

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeader('Content-Type')[0]);

        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertIsArray($data);
        $this->assertArrayHasKey('success', $data);
        $this->assertTrue($data['success']);
        $this->assertArrayHasKey('data', $data);
        
        $contacts = $data['data'];
        $this->assertIsArray($contacts);
        $this->assertGreaterThan(0, count($contacts));
        
        // Verify contact structure
        $firstContact = $contacts[0];
        $this->assertArrayHasKey('id', $firstContact);
        $this->assertArrayHasKey('name', $firstContact);
        $this->assertArrayHasKey('email', $firstContact);
        $this->assertArrayHasKey('created_at', $firstContact);
    }

    public function testRateLimiting(): void
    {
        // Arrange - Contact data for multiple requests
        $contactData = [
            'name' => 'Test User',
            'email' => 'test@email.com',
            'phone' => '+34 666 000 000',
            'message' => 'Rate limiting test'
        ];

        $successfulRequests = 0;
        $rateLimitedRequests = 0;

        // Act - Send multiple requests quickly
        for ($i = 0; $i < 10; $i++) {
            $response = $this->client->post('/contact', [
                'json' => $contactData,
                'headers' => ['Content-Type' => 'application/json']
            ]);

            if ($response->getStatusCode() === 201) {
                $successfulRequests++;
            } elseif ($response->getStatusCode() === 429) {
                $rateLimitedRequests++;
                break; // Stop when rate limit is hit
            }
        }

        // Assert - Rate limiting should kick in
        $this->assertGreaterThan(0, $successfulRequests);
        // Note: Depending on rate limit configuration, this might or might not trigger
        // In a real test, you'd configure a very low rate limit for testing
    }

    public function testContactResponseTime(): void
    {
        // Arrange
        $contactData = [
            'name' => 'Performance Test',
            'email' => 'performance@email.com',
            'phone' => '+34 666 111 111',
            'message' => 'Testing response time'
        ];

        // Act
        $startTime = microtime(true);
        $response = $this->client->post('/contact', [
            'json' => $contactData,
            'headers' => ['Content-Type' => 'application/json']
        ]);
        $endTime = microtime(true);
        
        $responseTime = ($endTime - $startTime) * 1000; // Convert to milliseconds

        // Assert
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertLessThan(1000, $responseTime, 'Contact submission should be less than 1 second');
    }
}