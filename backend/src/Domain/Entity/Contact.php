<?php

declare(strict_types=1);

namespace BootBookingCamp\Domain\Entity;

class Contact
{
    private ?int $contactId;
    private string $fullName;
    private string $email;
    private string $phone;
    private string $checkInDate;
    private string $checkOutDate;
    private int $numAdults;
    private int $numChildren;
    private string $message;
    private string $status;
    private string $createdAt;
    private ?string $respondedAt;

    public function __construct(
        ?int $contactId,
        string $fullName,
        string $email,
        string $phone,
        string $checkInDate,
        string $checkOutDate,
        int $numAdults,
        int $numChildren,
        string $message,
        string $status = 'pending',
        ?string $createdAt = null,
        ?string $respondedAt = null
    ) {
        $this->contactId = $contactId;
        $this->fullName = $fullName;
        $this->email = $email;
        $this->phone = $phone;
        $this->checkInDate = $checkInDate;
        $this->checkOutDate = $checkOutDate;
        $this->numAdults = $numAdults;
        $this->numChildren = $numChildren;
        $this->message = $message;
        $this->status = $status;
        $this->createdAt = $createdAt ?? date('Y-m-d H:i:s');
        $this->respondedAt = $respondedAt;
    }

    public function getContactId(): ?int
    {
        return $this->contactId;
    }

    public function getFullName(): string
    {
        return $this->fullName;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPhone(): string
    {
        return $this->phone;
    }

    public function getCheckInDate(): string
    {
        return $this->checkInDate;
    }

    public function getCheckOutDate(): string
    {
        return $this->checkOutDate;
    }

    public function getNumAdults(): int
    {
        return $this->numAdults;
    }

    public function getNumChildren(): int
    {
        return $this->numChildren;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getCreatedAt(): string
    {
        return $this->createdAt;
    }

    public function getRespondedAt(): ?string
    {
        return $this->respondedAt;
    }

    public function toArray(): array
    {
        return [
            'contact_id' => $this->contactId,
            'full_name' => $this->fullName,
            'email' => $this->email,
            'phone' => $this->phone,
            'check_in_date' => $this->checkInDate,
            'check_out_date' => $this->checkOutDate,
            'num_adults' => $this->numAdults,
            'num_children' => $this->numChildren,
            'message' => $this->message,
            'status' => $this->status,
            'created_at' => $this->createdAt,
            'responded_at' => $this->respondedAt
        ];
    }
}