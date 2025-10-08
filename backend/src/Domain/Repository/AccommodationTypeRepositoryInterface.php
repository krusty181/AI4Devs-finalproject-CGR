<?php

declare(strict_types=1);

namespace BootBookingCamp\Domain\Repository;

use BootBookingCamp\Domain\Entity\AccommodationType;

interface AccommodationTypeRepositoryInterface
{
    public function findById(int $accommodationTypeId): ?AccommodationType;
    public function findAll(): array;
}