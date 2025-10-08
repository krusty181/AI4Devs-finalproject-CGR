<?php

declare(strict_types=1);

namespace BootBookingCamp\Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use BootBookingCamp\Domain\Entity\Camping;

class CampingTest extends TestCase
{
    private Camping $camping;

    protected function setUp(): void
    {
        $this->camping = new Camping();
    }

    public function testCreateCampingWithValidData(): void
    {
        // Arrange & Act
        $this->camping->setCampingId(1);
        $this->camping->setName('KCAMP - Camping Piloto');
        $this->camping->setDescription('Camping de prueba en la costa');
        $this->camping->setLocation('Costa Brava, España');
        $this->camping->setPhone('+34 972 123 456');
        $this->camping->setEmail('info@kcamp.com');
        $this->camping->setWebsite('https://kcamp.com');
        $this->camping->setServices(['wifi', 'piscina', 'restaurante', 'parking']);
        $this->camping->setImages(['image1.jpg', 'image2.jpg']);
        $this->camping->setLatitude(41.9794);
        $this->camping->setLongitude(3.0297);

        // Assert
        $this->assertEquals(1, $this->camping->getCampingId());
        $this->assertEquals('KCAMP - Camping Piloto', $this->camping->getName());
        $this->assertEquals('Camping de prueba en la costa', $this->camping->getDescription());
        $this->assertEquals('Costa Brava, España', $this->camping->getLocation());
        $this->assertEquals('+34 972 123 456', $this->camping->getPhone());
        $this->assertEquals('info@kcamp.com', $this->camping->getEmail());
        $this->assertEquals('https://kcamp.com', $this->camping->getWebsite());
        $this->assertIsArray($this->camping->getServices());
        $this->assertCount(4, $this->camping->getServices());
        $this->assertContains('wifi', $this->camping->getServices());
        $this->assertIsArray($this->camping->getImages());
        $this->assertCount(2, $this->camping->getImages());
        $this->assertEquals(41.9794, $this->camping->getLatitude());
        $this->assertEquals(3.0297, $this->camping->getLongitude());
    }

    public function testValidateEmail(): void
    {
        // Valid email
        $this->camping->setEmail('valid@email.com');
        $this->assertTrue($this->camping->isValidEmail());

        // Invalid email
        $this->camping->setEmail('invalid-email');
        $this->assertFalse($this->camping->isValidEmail());

        // Empty email
        $this->camping->setEmail('');
        $this->assertFalse($this->camping->isValidEmail());
    }

    public function testValidatePhone(): void
    {
        // Valid Spanish phone
        $this->camping->setPhone('+34 972 123 456');
        $this->assertTrue($this->camping->isValidPhone());

        // Valid mobile phone
        $this->camping->setPhone('+34 666 123 456');
        $this->assertTrue($this->camping->isValidPhone());

        // Invalid phone
        $this->camping->setPhone('123');
        $this->assertFalse($this->camping->isValidPhone());

        // Empty phone
        $this->camping->setPhone('');
        $this->assertFalse($this->camping->isValidPhone());
    }

    public function testValidateCoordinates(): void
    {
        // Valid coordinates (Costa Brava)
        $this->camping->setLatitude(41.9794);
        $this->camping->setLongitude(3.0297);
        $this->assertTrue($this->camping->hasValidCoordinates());

        // Invalid latitude (out of range)
        $this->camping->setLatitude(91.0);
        $this->camping->setLongitude(3.0297);
        $this->assertFalse($this->camping->hasValidCoordinates());

        // Invalid longitude (out of range)
        $this->camping->setLatitude(41.9794);
        $this->camping->setLongitude(181.0);
        $this->assertFalse($this->camping->hasValidCoordinates());
    }

    public function testToArray(): void
    {
        // Arrange
        $this->camping->setCampingId(1);
        $this->camping->setName('KCAMP - Camping Piloto');
        $this->camping->setServices(['wifi', 'piscina']);
        $this->camping->setImages(['image1.jpg']);

        // Act
        $array = $this->camping->toArray();

        // Assert
        $this->assertIsArray($array);
        $this->assertArrayHasKey('camping_id', $array);
        $this->assertArrayHasKey('name', $array);
        $this->assertArrayHasKey('services', $array);
        $this->assertArrayHasKey('images', $array);
        $this->assertEquals(1, $array['camping_id']);
        $this->assertEquals('KCAMP - Camping Piloto', $array['name']);
        $this->assertIsArray($array['services']);
        $this->assertIsArray($array['images']);
    }

    public function testFromArray(): void
    {
        // Arrange
        $data = [
            'camping_id' => 1,
            'name' => 'KCAMP - Camping Piloto',
            'description' => 'Test camping',
            'location' => 'Costa Brava',
            'phone' => '+34 972 123 456',
            'email' => 'info@kcamp.com',
            'website' => 'https://kcamp.com',
            'services' => ['wifi', 'piscina'],
            'images' => ['image1.jpg'],
            'latitude' => 41.9794,
            'longitude' => 3.0297
        ];

        // Act
        $camping = Camping::fromArray($data);

        // Assert
        $this->assertInstanceOf(Camping::class, $camping);
        $this->assertEquals(1, $camping->getCampingId());
        $this->assertEquals('KCAMP - Camping Piloto', $camping->getName());
        $this->assertEquals('Test camping', $camping->getDescription());
        $this->assertIsArray($camping->getServices());
        $this->assertCount(2, $camping->getServices());
    }
}