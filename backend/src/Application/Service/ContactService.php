<?php

declare(strict_types=1);

namespace BootBookingCamp\Application\Service;

use BootBookingCamp\Domain\Repository\ContactRepositoryInterface;
use BootBookingCamp\Domain\Entity\Contact;
use InvalidArgumentException;

class ContactService
{
    private ContactRepositoryInterface $contactRepository;

    public function __construct(ContactRepositoryInterface $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }

    public function submitContactForm(array $data): Contact
    {
        $this->validateContactData($data);

        $contact = new Contact(
            null, // ID will be generated
            $data['full_name'],
            $data['email'],
            $data['phone'],
            $data['check_in_date'],
            $data['check_out_date'],
            (int) $data['num_adults'],
            (int) ($data['num_children'] ?? 0),
            $data['message']
        );

        return $this->contactRepository->save($contact);
    }

    private function validateContactData(array $data): void
    {
        $required = ['full_name', 'email', 'phone', 'check_in_date', 'check_out_date', 'num_adults', 'message'];
        
        foreach ($required as $field) {
            if (empty($data[$field])) {
                throw new InvalidArgumentException("Field '{$field}' is required.");
            }
        }

        // Validate email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email format.');
        }

        // Validate phone (basic validation)
        if (!preg_match('/^[\+]?[0-9\s\-\(\)]{9,15}$/', $data['phone'])) {
            throw new InvalidArgumentException('Invalid phone format.');
        }

        // Validate dates
        try {
            $checkIn = new \DateTime($data['check_in_date']);
            $checkOut = new \DateTime($data['check_out_date']);
        } catch (\Exception $e) {
            throw new InvalidArgumentException('Invalid date format.');
        }

        if ($checkOut <= $checkIn) {
            throw new InvalidArgumentException('Check-out date must be after check-in date.');
        }

        // Validate occupancy
        $adults = (int) $data['num_adults'];
        $children = (int) ($data['num_children'] ?? 0);

        if ($adults < 1 || $adults > 10) {
            throw new InvalidArgumentException('Number of adults must be between 1 and 10.');
        }

        if ($children < 0 || $children > 8) {
            throw new InvalidArgumentException('Number of children must be between 0 and 8.');
        }

        // Validate message length
        if (strlen($data['message']) > 1000) {
            throw new InvalidArgumentException('Message cannot exceed 1000 characters.');
        }

        // Validate name length
        if (strlen($data['full_name']) > 100) {
            throw new InvalidArgumentException('Full name cannot exceed 100 characters.');
        }
    }
}