<?php

declare(strict_types=1);

namespace BootBookingCamp\Application\Service;

use BootBookingCamp\Domain\Repository\AvailabilityRepositoryInterface;
use BootBookingCamp\Domain\Repository\AccommodationTypeRepositoryInterface;
use DateTime;
use InvalidArgumentException;

class AvailabilityService
{
    private AvailabilityRepositoryInterface $availabilityRepository;
    private AccommodationTypeRepositoryInterface $accommodationTypeRepository;

    public function __construct(
        AvailabilityRepositoryInterface $availabilityRepository,
        AccommodationTypeRepositoryInterface $accommodationTypeRepository
    ) {
        $this->availabilityRepository = $availabilityRepository;
        $this->accommodationTypeRepository = $accommodationTypeRepository;
    }

    public function searchAvailability(
        string $checkInDate,
        string $checkOutDate,
        int $adults,
        int $children = 0
    ): array {
        // Validate dates
        $this->validateDates($checkInDate, $checkOutDate);
        
        // Validate occupancy
        $this->validateOccupancy($adults, $children);

        // Search availability
        $availability = $this->availabilityRepository->searchAvailability(
            $checkInDate,
            $checkOutDate,
            $adults,
            $children
        );

        // Enhance with accommodation type details
        foreach ($availability['available_accommodations'] as &$accommodation) {
            $accommodationType = $this->accommodationTypeRepository->findById(
                $accommodation['accommodation_type_id']
            );
            
            if ($accommodationType) {
                $accommodation['accommodation_details'] = $accommodationType->toArray();
            }
        }

        return $availability;
    }

    private function validateDates(string $checkInDate, string $checkOutDate): void
    {
        try {
            $checkIn = new DateTime($checkInDate);
            $checkOut = new DateTime($checkOutDate);
            $today = new DateTime('today');
        } catch (\Exception $e) {
            throw new InvalidArgumentException('Invalid date format. Use YYYY-MM-DD format.');
        }

        if ($checkIn < $today) {
            throw new InvalidArgumentException('Check-in date cannot be in the past.');
        }

        if ($checkOut <= $checkIn) {
            throw new InvalidArgumentException('Check-out date must be after check-in date.');
        }

        $maxAdvanceDays = 365;
        $maxDate = (clone $today)->add(new \DateInterval("P{$maxAdvanceDays}D"));
        
        if ($checkIn > $maxDate) {
            throw new InvalidArgumentException("Check-in date cannot be more than {$maxAdvanceDays} days in advance.");
        }

        $maxStayDays = 30;
        $daysDiff = $checkOut->diff($checkIn)->days;
        
        if ($daysDiff > $maxStayDays) {
            throw new InvalidArgumentException("Maximum stay is {$maxStayDays} days.");
        }
    }

    private function validateOccupancy(int $adults, int $children): void
    {
        if ($adults < 1) {
            throw new InvalidArgumentException('At least 1 adult is required.');
        }

        if ($adults > 10) {
            throw new InvalidArgumentException('Maximum 10 adults allowed.');
        }

        if ($children < 0) {
            throw new InvalidArgumentException('Number of children cannot be negative.');
        }

        if ($children > 8) {
            throw new InvalidArgumentException('Maximum 8 children allowed.');
        }

        $totalGuests = $adults + $children;
        if ($totalGuests > 12) {
            throw new InvalidArgumentException('Maximum 12 total guests allowed.');
        }
    }
}