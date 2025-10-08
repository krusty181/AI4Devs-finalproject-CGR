<?php

declare(strict_types=1);

namespace BootBookingCamp\Domain\Repository;

interface AvailabilityRepositoryInterface
{
    public function searchAvailability(
        string $checkInDate,
        string $checkOutDate,
        int $adults,
        int $children = 0
    ): array;
}