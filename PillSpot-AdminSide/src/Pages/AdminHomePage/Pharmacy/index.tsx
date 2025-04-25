
import { SubmitHandler, useForm } from "react-hook-form";
import PharmacyCard from "../../../components/PharmacyCard/PharmacyCard";
import PreviewCard from "../Dashboard/PreviewCard";
import PharHeader from "./header";
import PharSearch from "./pharSearch";
import PharData from "./pharData";



const Pharmacy = () => {
  
  return (
    <div className="flex items-center justify-center gap-10">
      <div className="flex flex-col gap-5">
        
        <PharSearch/>
        
        <PreviewCard w={20} h={44} title="Result :">
          <PharmacyCard />
          <PharmacyCard />
          <PharmacyCard />
          <PharmacyCard />
        
        </PreviewCard>
      </div>

      <div>
        <PreviewCard w={65} h={86} title="">
          <div className="flex flex-col items-center justify-center text-white gap-5">
            <PharHeader/>

            <div className="w-full">
                <PharData/>
            </div>

          </div>
        </PreviewCard>
      </div>
    </div>
  );
};

export default Pharmacy;
