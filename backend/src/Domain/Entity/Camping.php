<?php

declare(strict_types=1);

namespace BootBookingCamp\Domain\Entity;

class Camping
{
    private int $campingId;
    private string $name;
    private string $description;
    private string $address;
    private string $city;
    private string $state;
    private string $postalCode;
    private string $country;
    private string $phone;
    private string $email;
    private string $website;
    private float $latitude;
    private float $longitude;
    private array $services;
    private array $images;
    private array $checkInRules;
    private array $checkOutRules;
    private array $policies;
    private array $nearbyAttractions;

    public function __construct(
        int $campingId,
        string $name,
        string $description,
        string $address,
        string $city,
        string $state,
        string $postalCode,
        string $country,
        string $phone,
        string $email,
        string $website,
        float $latitude,
        float $longitude,
        array $services,
        array $images,
        array $checkInRules,
        array $checkOutRules,
        array $policies,
        array $nearbyAttractions
    ) {
        $this->campingId = $campingId;
        $this->name = $name;
        $this->description = $description;
        $this->address = $address;
        $this->city = $city;
        $this->state = $state;
        $this->postalCode = $postalCode;
        $this->country = $country;
        $this->phone = $phone;
        $this->email = $email;
        $this->website = $website;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->services = $services;
        $this->images = $images;
        $this->checkInRules = $checkInRules;
        $this->checkOutRules = $checkOutRules;
        $this->policies = $policies;
        $this->nearbyAttractions = $nearbyAttractions;
    }

    public function getCampingId(): int
    {
        return $this->campingId;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function getState(): string
    {
        return $this->state;
    }

    public function getPostalCode(): string
    {
        return $this->postalCode;
    }

    public function getCountry(): string
    {
        return $this->country;
    }

    public function getPhone(): string
    {
        return $this->phone;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getWebsite(): string
    {
        return $this->website;
    }

    public function getLatitude(): float
    {
        return $this->latitude;
    }

    public function getLongitude(): float
    {
        return $this->longitude;
    }

    public function getServices(): array
    {
        return $this->services;
    }

    public function getImages(): array
    {
        return $this->images;
    }

    public function getCheckInRules(): array
    {
        return $this->checkInRules;
    }

    public function getCheckOutRules(): array
    {
        return $this->checkOutRules;
    }

    public function getPolicies(): array
    {
        return $this->policies;
    }

    public function getNearbyAttractions(): array
    {
        return $this->nearbyAttractions;
    }

    public function toArray(): array
    {
        return [
            'camping_id' => $this->campingId,
            'name' => $this->name,
            'description' => $this->description,
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'postal_code' => $this->postalCode,
            'country' => $this->country,
            'phone' => $this->phone,
            'email' => $this->email,
            'website' => $this->website,
            'location' => [
                'latitude' => $this->latitude,
                'longitude' => $this->longitude
            ],
            'services' => $this->services,
            'images' => $this->images,
            'check_in_rules' => $this->checkInRules,
            'check_out_rules' => $this->checkOutRules,
            'policies' => $this->policies,
            'nearby_attractions' => $this->nearbyAttractions
        ];
    }
}