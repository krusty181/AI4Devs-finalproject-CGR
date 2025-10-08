<?php

declare(strict_types=1);

namespace BootBookingCamp\Infrastructure\Repository;

use BootBookingCamp\Domain\Repository\CampingRepositoryInterface;
use BootBookingCamp\Domain\Entity\Camping;

class JsonCampingRepository implements CampingRepositoryInterface
{
    private string $dataPath;

    public function __construct()
    {
        $this->dataPath = __DIR__ . '/../../../../data/mock/camping.json';
    }

    public function findById(int $campingId): ?Camping
    {
        // Simulate delay if enabled
        $this->simulateDelay();

        $data = $this->loadData();
        
        if (!$data || $data['camping_id'] !== $campingId) {
            return null;
        }

        return $this->createCampingFromData($data);
    }

    public function findAll(): array
    {
        // Simulate delay if enabled
        $this->simulateDelay();

        $data = $this->loadData();
        
        if (!$data) {
            return [];
        }

        return [$this->createCampingFromData($data)];
    }

    private function loadData(): ?array
    {
        if (!file_exists($this->dataPath)) {
            return null;
        }

        $content = file_get_contents($this->dataPath);
        
        if ($content === false) {
            return null;
        }

        $data = json_decode($content, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            return null;
        }

        return $data;
    }

    private function createCampingFromData(array $data): Camping
    {
        return new Camping(
            $data['camping_id'],
            $data['name'],
            $data['description'],
            $data['address'],
            $data['city'],
            $data['state'],
            $data['postal_code'],
            $data['country'],
            $data['phone'],
            $data['email'],
            $data['website'],
            $data['location']['latitude'],
            $data['location']['longitude'],
            $data['services'],
            $data['images'],
            $data['check_in_rules'],
            $data['check_out_rules'],
            $data['policies'],
            $data['nearby_attractions']
        );
    }

    private function simulateDelay(): void
    {
        if (($_ENV['MOCK_ENABLE_DELAYS'] ?? 'false') === 'true') {
            // Simulate realistic API delay between 50-200ms
            usleep(rand(50000, 200000));
        }
    }
}