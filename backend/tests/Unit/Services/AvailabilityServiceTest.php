<?php

declare(strict_types=1);

namespace BootBookingCamp\Tests\Unit\Services;

use PHPUnit\Framework\TestCase;
use BootBookingCamp\Application\Service\AvailabilityService;
use BootBookingCamp\Infrastructure\Repository\JsonAvailabilityRepository;
use BootBookingCamp\Domain\Entity\Availability;
use BootBookingCamp\Domain\Entity\AccommodationType;

class AvailabilityServiceTest extends TestCase
{
    private AvailabilityService $service;
    private JsonAvailabilityRepository $repository;

    protected function setUp(): void
    {
        $this->repository = $this->createMock(JsonAvailabilityRepository::class);
        $this->service = new AvailabilityService($this->repository);
    }

    public function testSearchAvailabilitySuccess(): void
    {
        // Arrange
        $checkInDate = new \DateTime('2024-07-15');
        $checkOutDate = new \DateTime('2024-07-20');
        $guests = 4;

        $accommodationType = new AccommodationType();
        $accommodationType->setId(1);
        $accommodationType->setName('Parcela Estándar');
        $accommodationType->setMaxGuests(6);
        $accommodationType->setPricePerNight(35.00);

        $availability = new Availability();
        $availability->setId(1);
        $availability->setAccommodationType($accommodationType);
        $availability->setAvailableUnits(3);
        $availability->setDate($checkInDate);

        $expectedResults = [$availability];

        $this->repository
            ->expects($this->once())
            ->method('findAvailableByDateRange')
            ->with($checkInDate, $checkOutDate, $guests)
            ->willReturn($expectedResults);

        // Act
        $results = $this->service->searchAvailability($checkInDate, $checkOutDate, $guests);

        // Assert
        $this->assertIsArray($results);
        $this->assertCount(1, $results);
        $this->assertInstanceOf(Availability::class, $results[0]);
        $this->assertEquals('Parcela Estándar', $results[0]->getAccommodationType()->getName());
    }

    public function testSearchAvailabilityNoResults(): void
    {
        // Arrange
        $checkInDate = new \DateTime('2024-12-25'); // High season, likely full
        $checkOutDate = new \DateTime('2024-12-30');
        $guests = 8; // High number of guests

        $this->repository
            ->expects($this->once())
            ->method('findAvailableByDateRange')
            ->with($checkInDate, $checkOutDate, $guests)
            ->willReturn([]);

        // Act
        $results = $this->service->searchAvailability($checkInDate, $checkOutDate, $guests);

        // Assert
        $this->assertIsArray($results);
        $this->assertEmpty($results);
    }

    public function testCalculatePricingWithSeasonalRules(): void
    {
        // Arrange
        $accommodationType = new AccommodationType();
        $accommodationType->setPricePerNight(35.00);

        $checkInDate = new \DateTime('2024-08-15'); // High season
        $checkOutDate = new \DateTime('2024-08-20');
        $nights = 5;

        // Act
        $totalPrice = $this->service->calculateTotalPrice($accommodationType, $checkInDate, $checkOutDate);

        // Assert
        $this->assertIsFloat($totalPrice);
        $this->assertGreaterThan(0, $totalPrice);
        // High season should have multiplier applied
        $basePrice = $accommodationType->getPricePerNight() * $nights;
        $this->assertGreaterThanOrEqual($basePrice, $totalPrice);
    }

    public function testValidateDateRange(): void
    {
        // Arrange
        $pastDate = new \DateTime('-1 day');
        $futureDate = new \DateTime('+7 days');
        $validCheckIn = new \DateTime('+2 days');
        $validCheckOut = new \DateTime('+7 days');

        // Act & Assert - Past dates should be invalid
        $this->assertFalse($this->service->validateDateRange($pastDate, $futureDate));
        
        // Check-in after check-out should be invalid
        $this->assertFalse($this->service->validateDateRange($validCheckOut, $validCheckIn));
        
        // Valid range should be true
        $this->assertTrue($this->service->validateDateRange($validCheckIn, $validCheckOut));
    }

    public function testApplySeasonalPricing(): void
    {
        // Arrange
        $basePrice = 35.00;
        $highSeasonDate = new \DateTime('2024-07-15'); // Summer
        $lowSeasonDate = new \DateTime('2024-03-15');  // Spring

        // Act
        $highSeasonPrice = $this->service->applySeasonalPricing($basePrice, $highSeasonDate);
        $lowSeasonPrice = $this->service->applySeasonalPricing($basePrice, $lowSeasonDate);

        // Assert
        $this->assertGreaterThan($basePrice, $highSeasonPrice); // Summer premium
        $this->assertLessThanOrEqual($basePrice, $lowSeasonPrice); // Possible spring discount
    }
}