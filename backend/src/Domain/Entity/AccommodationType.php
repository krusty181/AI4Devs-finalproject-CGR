<?php

declare(strict_types=1);

namespace BootBookingCamp\Domain\Entity;

class AccommodationType
{
    private int $accommodationTypeId;
    private string $name;
    private string $description;
    private int $maxOccupancy;
    private float $basePrice;
    private array $amenities;
    private array $images;
    private array $features;

    public function __construct(
        int $accommodationTypeId,
        string $name,
        string $description,
        int $maxOccupancy,
        float $basePrice,
        array $amenities,
        array $images,
        array $features
    ) {
        $this->accommodationTypeId = $accommodationTypeId;
        $this->name = $name;
        $this->description = $description;
        $this->maxOccupancy = $maxOccupancy;
        $this->basePrice = $basePrice;
        $this->amenities = $amenities;
        $this->images = $images;
        $this->features = $features;
    }

    public function getAccommodationTypeId(): int
    {
        return $this->accommodationTypeId;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getMaxOccupancy(): int
    {
        return $this->maxOccupancy;
    }

    public function getBasePrice(): float
    {
        return $this->basePrice;
    }

    public function getAmenities(): array
    {
        return $this->amenities;
    }

    public function getImages(): array
    {
        return $this->images;
    }

    public function getFeatures(): array
    {
        return $this->features;
    }

    public function toArray(): array
    {
        return [
            'accommodation_type_id' => $this->accommodationTypeId,
            'name' => $this->name,
            'description' => $this->description,
            'max_occupancy' => $this->maxOccupancy,
            'base_price' => $this->basePrice,
            'amenities' => $this->amenities,
            'images' => $this->images,
            'features' => $this->features
        ];
    }
}