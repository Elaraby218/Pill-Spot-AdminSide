import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "../../../components/input";
import PreviewCard from "../Dashboard/PreviewCard";
type TFormIntput = {
  pharmacyName: string;
  cityName: string;
  governorate: string;
};

const PharSearch = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormIntput>();

  const getPhars: SubmitHandler<TFormIntput> = (data) => {
    console.log(data);
  };
  return (
    <PreviewCard w={20} h={40} title="Pharmacy Search :">
      <form
        className="w-full flex flex-col items-center"
        onSubmit={handleSubmit(getPhars)}
      >
        <TextInput
          name="Name"
          type="text"
          label="Name"
          register={register}
          errors={errors}
        />
        <TextInput
          name="city"
          type="text"
          label="city"
          register={register}
          errors={errors}
        />
        <TextInput
          name="Governorate"
          type="text"
          label="Governorate"
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          className="btn mt-2 flex items-center rounded-3xl p-5 border-1 border-gray-700"
        >
          Search
        </button>
      </form>
    </PreviewCard>
  );
};

export default PharSearch;
