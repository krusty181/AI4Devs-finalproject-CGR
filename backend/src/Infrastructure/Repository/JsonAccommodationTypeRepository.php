<?php

declare(strict_types=1);

namespace BootBookingCamp\Infrastructure\Repository;

use BootBookingCamp\Domain\Repository\AccommodationTypeRepositoryInterface;
use BootBookingCamp\Domain\Entity\AccommodationType;

class JsonAccommodationTypeRepository implements AccommodationTypeRepositoryInterface
{
    private string $dataPath;

    public function __construct()
    {
        $this->dataPath = __DIR__ . '/../../../../data/mock/accommodation_types.json';
    }

    public function findById(int $accommodationTypeId): ?AccommodationType
    {
        $this->simulateDelay();

        $data = $this->loadData();
        
        foreach ($data as $item) {
            if ($item['accommodation_type_id'] === $accommodationTypeId) {
                return $this->createAccommodationTypeFromData($item);
            }
        }

        return null;
    }

    public function findAll(): array
    {
        $this->simulateDelay();

        $data = $this->loadData();
        
        $accommodationTypes = [];
        foreach ($data as $item) {
            $accommodationTypes[] = $this->createAccommodationTypeFromData($item);
        }

        return $accommodationTypes;
    }

    private function loadData(): array
    {
        if (!file_exists($this->dataPath)) {
            return [];
        }

        $content = file_get_contents($this->dataPath);
        
        if ($content === false) {
            return [];
        }

        $data = json_decode($content, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            return [];
        }

        return $data;
    }

    private function createAccommodationTypeFromData(array $data): AccommodationType
    {
        return new AccommodationType(
            $data['accommodation_type_id'],
            $data['name'],
            $data['description'],
            $data['max_occupancy'],
            $data['base_price'],
            $data['amenities'],
            $data['images'],
            $data['features']
        );
    }

    private function simulateDelay(): void
    {
        if (($_ENV['MOCK_ENABLE_DELAYS'] ?? 'false') === 'true') {
            usleep(rand(30000, 100000));
        }
    }
}