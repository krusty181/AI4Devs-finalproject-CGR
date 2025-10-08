<?php

declare(strict_types=1);

namespace BootBookingCamp\Infrastructure\Repository;

use BootBookingCamp\Domain\Repository\ContactRepositoryInterface;
use BootBookingCamp\Domain\Entity\Contact;

class JsonContactRepository implements ContactRepositoryInterface
{
    private string $dataPath;

    public function __construct()
    {
        $this->dataPath = __DIR__ . '/../../../../data/mock/contact_requests.json';
    }

    public function save(Contact $contact): Contact
    {
        $this->simulateDelay();

        $data = $this->loadData();
        
        // Generate new ID
        $maxId = 0;
        foreach ($data as $item) {
            if ($item['contact_id'] > $maxId) {
                $maxId = $item['contact_id'];
            }
        }
        $newId = $maxId + 1;

        // Create new contact with ID
        $newContact = new Contact(
            $newId,
            $contact->getFullName(),
            $contact->getEmail(),
            $contact->getPhone(),
            $contact->getCheckInDate(),
            $contact->getCheckOutDate(),
            $contact->getNumAdults(),
            $contact->getNumChildren(),
            $contact->getMessage(),
            $contact->getStatus(),
            $contact->getCreatedAt(),
            $contact->getRespondedAt()
        );

        // Add to data array
        $data[] = $newContact->toArray();

        // Save to file
        $this->saveData($data);

        return $newContact;
    }

    public function findById(int $contactId): ?Contact
    {
        $this->simulateDelay();

        $data = $this->loadData();
        
        foreach ($data as $item) {
            if ($item['contact_id'] === $contactId) {
                return $this->createContactFromData($item);
            }
        }

        return null;
    }

    public function findAll(): array
    {
        $this->simulateDelay();

        $data = $this->loadData();
        
        $contacts = [];
        foreach ($data as $item) {
            $contacts[] = $this->createContactFromData($item);
        }

        return $contacts;
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

    private function saveData(array $data): void
    {
        $content = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        
        // Ensure directory exists
        $dir = dirname($this->dataPath);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        file_put_contents($this->dataPath, $content);
    }

    private function createContactFromData(array $data): Contact
    {
        return new Contact(
            $data['contact_id'],
            $data['full_name'],
            $data['email'],
            $data['phone'],
            $data['check_in_date'],
            $data['check_out_date'],
            $data['num_adults'],
            $data['num_children'],
            $data['message'],
            $data['status'],
            $data['created_at'],
            $data['responded_at']
        );
    }

    private function simulateDelay(): void
    {
        if (($_ENV['MOCK_ENABLE_DELAYS'] ?? 'false') === 'true') {
            usleep(rand(100000, 300000)); // Slightly longer for write operations
        }
    }
}