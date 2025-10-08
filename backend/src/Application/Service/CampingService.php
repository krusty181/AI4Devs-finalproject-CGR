<?php

declare(strict_types=1);

namespace BootBookingCamp\Application\Service;

use BootBookingCamp\Domain\Repository\CampingRepositoryInterface;
use BootBookingCamp\Domain\Entity\Camping;

class CampingService
{
    private CampingRepositoryInterface $campingRepository;

    public function __construct(CampingRepositoryInterface $campingRepository)
    {
        $this->campingRepository = $campingRepository;
    }

    public function getCampingInfo(int $campingId = 1): ?Camping
    {
        return $this->campingRepository->findById($campingId);
    }

    public function getAllCampings(): array
    {
        return $this->campingRepository->findAll();
    }
}