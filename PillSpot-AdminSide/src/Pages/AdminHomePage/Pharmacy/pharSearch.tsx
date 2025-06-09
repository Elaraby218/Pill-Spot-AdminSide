import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "../../../components/input";
import PreviewCard from "../Dashboard/PreviewCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../App/Store";
import { getAllPharmacies } from "../../../Featurs/pharmacy/getAll";
import { IPharmacy } from "./types";
import { useEffect } from "react";

type TFormIntput = {
  pharmacyName: string;
  cityName: string;
  governorate: string;
};

interface Iprops {
  setPharmacies: React.Dispatch<React.SetStateAction<IPharmacy[] | undefined>>;
}

const PharSearch = ({ setPharmacies }: Iprops) => {
  const dispatch = useDispatch<AppDispatch>();
  const { pharmacies, status } = useSelector((state: RootState) => state.pharmacySlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormIntput>();

  useEffect(() => {
    if (pharmacies) {
      setPharmacies(pharmacies);
    }
  }, [pharmacies, setPharmacies]);

  const getPhars: SubmitHandler<TFormIntput> = async (data) => {
    try {
      const searchTerm = `${data.pharmacyName}`.trim();
      await dispatch(getAllPharmacies({ SearchTerm: searchTerm }));
    } catch (error) {
      console.error('Error searching pharmacies:', error);
    }
  };

  return (
    <PreviewCard w={20} h={40} title="Pharmacy Search :">
      <form
        className="w-full flex flex-col items-center"
        onSubmit={handleSubmit(getPhars)}
      >
        <TextInput
          name="pharmacyName"
          type="text"
          label="Name"
          register={register}
          errors={errors}
        />
        <TextInput
          name="cityName"
          type="text"
          label="city"
          register={register}
          errors={errors}
        />
        <TextInput
          name="governorate"
          type="text"
          label="Governorate"
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          className="btn mt-2 flex items-center rounded-3xl p-5 border-1 border-gray-700"
          disabled={status === "loading"}
        >
          {status === "loading" ? 'Searching...' : 'Search'}
        </button>
        {status === "error" && <p className="text-red-500 mt-2">Error searching pharmacies</p>}
      </form>
    </PreviewCard>
  );
};

export default PharSearch;
