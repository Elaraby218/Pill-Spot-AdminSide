import { PharmacyRequest } from './types';

export const mockRequests: PharmacyRequest[] = [
  {
    id: 1,
    name: "MedPlus Pharmacy",
    pharmacistLicense: "LIC123456",
    location: {
      longitude: 31.2357,
      latitude: 30.0444,
      additionalInfo: "Near City Center",
      cityName: "Cairo",
      governmentName: "Cairo Governorate"
    },
    licenseId: "PHARM123",
    contactNumber: "+201234567890",
    openingTime: "09:00",
    closingTime: "22:00",
    isOpen24: false,
    daysOpen: "Monday-Saturday",
    logo: "https://via.placeholder.com/150",
    status: "pending"
  },
  {
    id: 2,
    name: "HealthCare Pharmacy",
    pharmacistLicense: "LIC789012",
    location: {
      longitude: 31.2357,
      latitude: 30.0444,
      additionalInfo: "Main Street",
      cityName: "Alexandria",
      governmentName: "Alexandria Governorate"
    },
    licenseId: "PHARM456",
    contactNumber: "+201234567891",
    openingTime: "08:00",
    closingTime: "23:00",
    isOpen24: true,
    daysOpen: "All Days",
    logo: "https://via.placeholder.com/150",
    status: "pending"
  }
]; 