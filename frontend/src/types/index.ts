// Tipos compartidos para la aplicación LIDR-AI4Devs

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  description: string;
  capacity: {
    adults: number;
    children: number;
  };
  price_per_night: number;
  size_m2?: number;
  bedrooms?: number;
  beds?: string;
  amenities: string[];
  rules?: {
    check_in?: string;
    check_out?: string;
    pets?: boolean;
    noise_curfew?: string;
    minimum_stay?: string;
  };
  location?: string;
  images: string[];
  services_nearby?: string[];
  reviews?: Array<{
    author: string;
    rating: number;
    comment: string;
  }>;
}

export interface CampingInfo {
  name: string;
  location: string;
  rating: number;
  total_reviews: number;
}

export interface SearchParams {
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
}

export interface AvailabilityData {
  available_accommodations?: Accommodation[];
  exact_matches?: Accommodation[];
  random_suggestions?: Accommodation[];
  has_random_suggestions?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  arrivalDate: string;
  departureDate: string;
  people: string;
  accommodationType: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  contact_id?: string;
  error?: string;
  details?: string[];
}

export interface ApiResponse {
  accommodation: Accommodation;
  camping: CampingInfo;
}