<?php

declare(strict_types=1);

namespace BootBookingCamp\Domain\Repository;

use BootBookingCamp\Domain\Entity\Camping;

interface CampingRepositoryInterface
{
    public function findById(int $campingId): ?Camping;
    public function findAll(): array;
}