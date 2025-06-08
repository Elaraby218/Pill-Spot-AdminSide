import PharmacyCard from "../../../components/PharmacyCard/PharmacyCard";
import PreviewCard from "../Dashboard/PreviewCard";
import PharSearch from "./pharSearch";
import PharData from "./pharData";
import { useState } from "react";
import { IPharmacy } from "./types";

const Pharmacy = () => {
  const [pharmacies, setPharmacies] = useState<IPharmacy[]>();
  const [selectedPharmacy, setSelectedPharmacy] = useState<IPharmacy>();
  
  const handlePharmacySelect = (pharmacy: IPharmacy) => {
    setSelectedPharmacy(pharmacy);
  };
  
  return (
    <div className="flex items-center justify-center gap-10">
      <div className="flex flex-col gap-5">
        <PharSearch setPharmacies={setPharmacies} />
        
        <PreviewCard w={20} h={44} title="Result :">
          {pharmacies?.map((pharmacy) => (
            <PharmacyCard 
              key={pharmacy.pharmacyId} 
              pharmacy={pharmacy} 
              onSelect={handlePharmacySelect}
              isSelected={selectedPharmacy?.pharmacyId === pharmacy.pharmacyId}
            />
          ))}
        </PreviewCard>
      </div>

      <div>
        <PreviewCard w={65} h={86} title="">
          <div className="flex flex-col items-center justify-center text-white gap-5">
            <div className="w-full">
              <PharData pharmacy={selectedPharmacy}/>
            </div>
          </div>
        </PreviewCard>
      </div>
    </div>
  );
};

export default Pharmacy;
