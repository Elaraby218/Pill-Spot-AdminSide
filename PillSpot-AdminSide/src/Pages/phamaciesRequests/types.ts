export interface Location {
  longitude: number;
  latitude: number;
  additionalInfo: string;
  cityName: string;
  governmentName: string;
}

export interface PharmacyRequest {
  id: number;
  name: string;
  pharmacistLicense: string;
  location: Location;
  licenseId: string;
  contactNumber: string;
  openingTime: string;
  closingTime: string;
  isOpen24: boolean;
  daysOpen: string;
  logoUrl: string;
  status: 'pending' | 'accepted' | 'rejected';
} 