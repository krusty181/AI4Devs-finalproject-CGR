<?php

declare(strict_types=1);

namespace BootBookingCamp\Tests;

use PHPUnit\Framework\TestCase;
use BootBookingCamp\Infrastructure\Repository\JsonCampingRepository;

class CampingRepositoryTest extends TestCase
{
    private JsonCampingRepository $repository;

    protected function setUp(): void
    {
        $this->repository = new JsonCampingRepository();
    }

    public function testFindById(): void
    {
        $camping = $this->repository->findById(1);
        
        $this->assertNotNull($camping);
        $this->assertEquals(1, $camping->getCampingId());
        $this->assertEquals('KCAMP - Camping Piloto', $camping->getName());
        $this->assertIsArray($camping->getServices());
        $this->assertIsArray($camping->getImages());
    }

    public function testFindByIdNotFound(): void
    {
        $camping = $this->repository->findById(999);
        
        $this->assertNull($camping);
    }

    public function testFindAll(): void
    {
        $campings = $this->repository->findAll();
        
        $this->assertIsArray($campings);
        $this->assertCount(1, $campings);
        $this->assertEquals('KCAMP - Camping Piloto', $campings[0]->getName());
    }
}