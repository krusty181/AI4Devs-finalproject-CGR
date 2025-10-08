<?php

declare(strict_types=1);

namespace BootBookingCamp\Tests\Integration\API;

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class CampingAPITest extends TestCase
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

    public function testGetCampingInfoSuccess(): void
    {
        // Act
        $response = $this->client->get('/camping/1');

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeader('Content-Type')[0]);

        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertIsArray($data);
        $this->assertArrayHasKey('success', $data);
        $this->assertTrue($data['success']);
        $this->assertArrayHasKey('data', $data);
        
        $camping = $data['data'];
        $this->assertArrayHasKey('camping_id', $camping);
        $this->assertArrayHasKey('name', $camping);
        $this->assertArrayHasKey('description', $camping);
        $this->assertArrayHasKey('services', $camping);
        $this->assertArrayHasKey('images', $camping);
        
        $this->assertEquals(1, $camping['camping_id']);
        $this->assertEquals('KCAMP - Camping Piloto', $camping['name']);
        $this->assertIsArray($camping['services']);
        $this->assertIsArray($camping['images']);
    }

    public function testGetCampingInfoNotFound(): void
    {
        // Act
        $response = $this->client->get('/camping/999');

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeader('Content-Type')[0]);

        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertIsArray($data);
        $this->assertArrayHasKey('success', $data);
        $this->assertFalse($data['success']);
        $this->assertArrayHasKey('error', $data);
        $this->assertEquals('Camping not found', $data['error']);
    }

    public function testGetAllCampings(): void
    {
        // Act
        $response = $this->client->get('/camping');

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeader('Content-Type')[0]);

        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertIsArray($data);
        $this->assertArrayHasKey('success', $data);
        $this->assertTrue($data['success']);
        $this->assertArrayHasKey('data', $data);
        
        $campings = $data['data'];
        $this->assertIsArray($campings);
        $this->assertGreaterThan(0, count($campings));
        
        // Verify first camping structure
        $firstCamping = $campings[0];
        $this->assertArrayHasKey('camping_id', $firstCamping);
        $this->assertArrayHasKey('name', $firstCamping);
        $this->assertArrayHasKey('services', $firstCamping);
    }

    public function testCORSHeaders(): void
    {
        // Act
        $response = $this->client->options('/camping/1');

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($response->hasHeader('Access-Control-Allow-Origin'));
        $this->assertTrue($response->hasHeader('Access-Control-Allow-Methods'));
        $this->assertTrue($response->hasHeader('Access-Control-Allow-Headers'));
    }

    public function testAPIResponseTime(): void
    {
        // Act
        $startTime = microtime(true);
        $response = $this->client->get('/camping/1');
        $endTime = microtime(true);
        
        $responseTime = ($endTime - $startTime) * 1000; // Convert to milliseconds

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertLessThan(500, $responseTime, 'API response time should be less than 500ms');
    }

    public function testAPIErrorHandling(): void
    {
        // Test invalid route
        $response = $this->client->get('/invalid-endpoint');
        
        $this->assertEquals(404, $response->getStatusCode());
        
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertIsArray($data);
        $this->assertArrayHasKey('success', $data);
        $this->assertFalse($data['success']);
        $this->assertArrayHasKey('error', $data);
    }
}