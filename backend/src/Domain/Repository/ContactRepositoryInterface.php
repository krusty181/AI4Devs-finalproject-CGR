<?php

declare(strict_types=1);

namespace BootBookingCamp\Domain\Repository;

use BootBookingCamp\Domain\Entity\Contact;

interface ContactRepositoryInterface
{
    public function save(Contact $contact): Contact;
    public function findById(int $contactId): ?Contact;
    public function findAll(): array;
}