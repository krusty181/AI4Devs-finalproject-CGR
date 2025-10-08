<?php

declare(strict_types=1);

namespace BootBookingCamp\Infrastructure\Repository;

use BootBookingCamp\Domain\Repository\AvailabilityRepositoryInterface;
use DateTime;
use DateInterval;

class JsonAvailabilityRepository implements AvailabilityRepositoryInterface
{
    private string $availabilityPath;
    private string $accommodationTypesPath;
    private string $pricingRulesPath;

    public function __construct()
    {
        $this->availabilityPath = __DIR__ . '/../../../../data/mock/availability.json';
        $this->accommodationTypesPath = __DIR__ . '/../../../../data/mock/accommodation_types.json';
        $this->pricingRulesPath = __DIR__ . '/../../../../data/mock/pricing_rules.json';
    }

    public function searchAvailability(
        string $checkInDate,
        string $checkOutDate,
        int $adults,
        int $children = 0
    ): array {
        $this->simulateDelay();

        // Simulate error rate if configured
        $this->simulateError();

        $availabilityData = $this->loadAvailabilityData();
        $accommodationTypes = $this->loadAccommodationTypesData();
        $pricingRules = $this->loadPricingRulesData();

        $checkIn = new DateTime($checkInDate);
        $checkOut = new DateTime($checkOutDate);
        $totalGuests = $adults + $children;

        $availableAccommodations = [];

        foreach ($accommodationTypes as $accommodationType) {
            // Check if accommodation can handle the number of guests
            if ($accommodationType['max_occupancy'] < $totalGuests) {
                continue;
            }

            // Check availability for each day in the date range
            $availableUnits = $this->getAvailableUnits(
                $accommodationType['accommodation_type_id'],
                $checkIn,
                $checkOut,
                $availabilityData
            );

            if ($availableUnits > 0) {
                // Calculate pricing
                $pricing = $this->calculatePricing(
                    $accommodationType,
                    $checkIn,
                    $checkOut,
                    $adults,
                    $children,
                    $pricingRules
                );

                $availableAccommodations[] = [
                    'accommodation_type_id' => $accommodationType['accommodation_type_id'],
                    'name' => $accommodationType['name'],
                    'description' => $accommodationType['description'],
                    'max_occupancy' => $accommodationType['max_occupancy'],
                    'available_units' => $availableUnits,
                    'amenities' => $accommodationType['amenities'],
                    'images' => $accommodationType['images'],
                    'features' => $accommodationType['features'],
                    'pricing' => $pricing
                ];
            }
        }

        return [
            'search_params' => [
                'check_in_date' => $checkInDate,
                'check_out_date' => $checkOutDate,
                'num_adults' => $adults,
                'num_children' => $children,
                'total_guests' => $totalGuests,
                'nights' => $checkOut->diff($checkIn)->days
            ],
            'available_accommodations' => $availableAccommodations,
            'total_results' => count($availableAccommodations)
        ];
    }

    private function getAvailableUnits(
        int $accommodationTypeId,
        DateTime $checkIn,
        DateTime $checkOut,
        array $availabilityData
    ): int {
        $minAvailable = PHP_INT_MAX;

        $current = clone $checkIn;
        while ($current < $checkOut) {
            $dateStr = $current->format('Y-m-d');
            
            $dayAvailability = null;
            foreach ($availabilityData as $day) {
                if ($day['date'] === $dateStr) {
                    $dayAvailability = $day;
                    break;
                }
            }

            if (!$dayAvailability) {
                return 0; // No data for this date means no availability
            }

            foreach ($dayAvailability['accommodations'] as $accommodation) {
                if ($accommodation['accommodation_type_id'] === $accommodationTypeId) {
                    $availableUnits = $accommodation['total_units'] - $accommodation['booked_units'];
                    $minAvailable = min($minAvailable, $availableUnits);
                    break;
                }
            }

            $current->add(new DateInterval('P1D'));
        }

        return $minAvailable === PHP_INT_MAX ? 0 : max(0, $minAvailable);
    }

    private function calculatePricing(
        array $accommodationType,
        DateTime $checkIn,
        DateTime $checkOut,
        int $adults,
        int $children,
        array $pricingRules
    ): array {
        $nights = $checkOut->diff($checkIn)->days;
        $basePrice = $accommodationType['base_price'];
        $totalPrice = 0;
        $priceBreakdown = [];
        $appliedRules = [];

        $current = clone $checkIn;
        while ($current < $checkOut) {
            $dailyPrice = $basePrice;
            $dayRules = [];

            // Apply pricing rules
            foreach ($pricingRules as $rule) {
                if ($this->ruleApplies($rule, $current, $nights, $adults, $children)) {
                    if ($rule['type'] === 'percentage') {
                        $dailyPrice *= (1 + $rule['value'] / 100);
                    } else {
                        $dailyPrice += $rule['value'];
                    }
                    $dayRules[] = $rule['name'];
                    $appliedRules[$rule['name']] = $rule;
                }
            }

            $priceBreakdown[] = [
                'date' => $current->format('Y-m-d'),
                'base_price' => $basePrice,
                'final_price' => round($dailyPrice, 2),
                'applied_rules' => $dayRules
            ];

            $totalPrice += $dailyPrice;
            $current->add(new DateInterval('P1D'));
        }

        return [
            'base_price_per_night' => $basePrice,
            'total_price' => round($totalPrice, 2),
            'average_price_per_night' => round($totalPrice / $nights, 2),
            'currency' => 'EUR',
            'nights' => $nights,
            'price_breakdown' => $priceBreakdown,
            'applied_pricing_rules' => array_values($appliedRules)
        ];
    }

    private function ruleApplies(
        array $rule,
        DateTime $date,
        int $nights,
        int $adults,
        int $children
    ): bool {
        // Check date conditions
        if (!empty($rule['conditions']['date_range'])) {
            $start = new DateTime($rule['conditions']['date_range']['start']);
            $end = new DateTime($rule['conditions']['date_range']['end']);
            
            if ($date < $start || $date > $end) {
                return false;
            }
        }

        // Check day of week conditions
        if (!empty($rule['conditions']['days_of_week'])) {
            $dayOfWeek = strtolower($date->format('l'));
            if (!in_array($dayOfWeek, $rule['conditions']['days_of_week'])) {
                return false;
            }
        }

        // Check minimum nights
        if (!empty($rule['conditions']['min_nights']) && $nights < $rule['conditions']['min_nights']) {
            return false;
        }

        // Check advance booking (simplified - we'll assume 0 days advance for mock)
        // In real implementation, this would compare booking date with stay date

        return true;
    }

    private function loadAvailabilityData(): array
    {
        return $this->loadJsonFile($this->availabilityPath);
    }

    private function loadAccommodationTypesData(): array
    {
        return $this->loadJsonFile($this->accommodationTypesPath);
    }

    private function loadPricingRulesData(): array
    {
        return $this->loadJsonFile($this->pricingRulesPath);
    }

    private function loadJsonFile(string $path): array
    {
        if (!file_exists($path)) {
            return [];
        }

        $content = file_get_contents($path);
        
        if ($content === false) {
            return [];
        }

        $data = json_decode($content, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            return [];
        }

        return $data;
    }

    private function simulateDelay(): void
    {
        if (($_ENV['MOCK_ENABLE_DELAYS'] ?? 'false') === 'true') {
            // Availability search is more complex, simulate longer delay
            usleep(rand(200000, 500000));
        }
    }

    private function simulateError(): void
    {
        $errorRate = (float) ($_ENV['MOCK_ERROR_RATE'] ?? 0.05);
        
        if ($errorRate > 0 && rand(1, 100) <= ($errorRate * 100)) {
            throw new \Exception('Mock error: Availability service temporarily unavailable');
        }
    }
}