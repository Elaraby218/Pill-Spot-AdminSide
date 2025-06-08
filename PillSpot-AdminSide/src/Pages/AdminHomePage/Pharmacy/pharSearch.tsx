import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "../../../components/input";
import PreviewCard from "../Dashboard/PreviewCard";
import axiosInstance from "../../../axiosInstance";
import { useTransaction } from "../../../hooks/useTransaction";
import { IPharmacy } from "./types";

type TFormIntput = {
  pharmacyName: string;
  cityName: string;
  governorate: string;
};

interface Iprops {
  setPharmacies: React.Dispatch<React.SetStateAction<IPharmacy[] | undefined>>;
}

const PharSearch = ({ setPharmacies }: Iprops) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormIntput>();

  const { execute, loading, error } = useTransaction<IPharmacy[]>();

  const getPhars: SubmitHandler<TFormIntput> = async (data) => {
    try {
      const searchTerm = `${data.pharmacyName}`.trim();
      const response = await execute(
        axiosInstance.get<IPharmacy[]>(`/api/pharmacies/AllPharmacies`, {
          params: {
            SearchTerm: searchTerm
          }
        }).then(res => res.data)
      );
      setPharmacies(response);
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
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </PreviewCard>
  );
};

export default PharSearch;
