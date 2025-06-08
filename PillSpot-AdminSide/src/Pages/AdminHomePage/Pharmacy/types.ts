export interface IPharmacy {
    pharmacyId: string;
    name: string;
    logoURL: string;
    logo: string | null;
    locationDto: {
      longitude: number;
      latitude: number;
      additionalInfo: string;
      cityDto: {
        cityName: string;
        governmentReferenceDto: {
          governmentName: string;
        };
      };
    };
    contactNumber: string;
    openingTime: string; 
    closingTime: string; 
    isOpen24: boolean;
    daysOpen: string;
}

export interface IEmployee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    imageUrl: string | null;
}

export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    imageUrl?: string;
}
  