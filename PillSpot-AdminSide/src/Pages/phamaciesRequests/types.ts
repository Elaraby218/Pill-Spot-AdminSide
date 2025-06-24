export interface GovernmentReferenceDto {
  governmentName: string;
}

export interface CityDto {
  cityName: string;
  governmentReferenceDto: GovernmentReferenceDto;
}

export interface LocationDto {
  longitude: number;
  latitude: number;
  additionalInfo: string;
  cityDto: CityDto;
}

export interface PharmacyRequest {
  requestId: string;
  name: string;
  logoURL: string;
  locationDto: LocationDto;
  licenseId: string;
  contactNumber: string;
  openingTime: string;
  closingTime: string;
  isOpen24: boolean;
  daysOpen: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  adminMessage: string | null;
  requestDate: string;
  decisionDate: string | null;
} 