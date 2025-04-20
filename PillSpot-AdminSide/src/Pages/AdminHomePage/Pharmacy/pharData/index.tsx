import React from "react";
import { PharmacySchema } from "./validation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../../components/input";

type PharType = z.infer<typeof PharmacySchema>;

const PharData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PharType>({
    mode: "onBlur",
    resolver: zodResolver(PharmacySchema),
  });

  return (
    <>
      <form className="flex flex-bol gap-5">
        <div className="flex-1 flex-col">
          <TextInput
            name="name"
            label="Pharmacy Name"
            register={register}
            errors={errors}
          ></TextInput>
          <TextInput
            name="contactNumber"
            label="Contact Number"
            register={register}
            errors={errors}
          ></TextInput>
          <TextInput
            name="licenceId"
            label="Licence Id"
            register={register}
            errors={errors}
          ></TextInput>

          <TextInput
            name="timeOpen"
            label="Opening Time"
            register={register}
            errors={errors}
            type={"time"}
          ></TextInput>
          <TextInput
            name="timeClose"
            label="Closing Time"
            register={register}
            errors={errors}
            type={"time"}
          ></TextInput>
          <div className="flex gap-2 ">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox"
              id="open24"
            />
            <label htmlFor="open24">Open 24</label>
          </div>
        </div>
        <div className="flex-1">
          <TextInput
            name="governorate"
            label="Governorate"
            register={register}
            errors={errors}
          ></TextInput>
          <TextInput
            name="city"
            label="City"
            register={register}
            errors={errors}
          ></TextInput>
        </div>
      </form>
    </>
  );
};

export default PharData;
