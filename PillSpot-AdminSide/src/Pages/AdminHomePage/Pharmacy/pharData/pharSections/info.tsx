import { z } from "zod";
import { PharmacySchema } from "../validation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import TextInput from "../../../../../components/input";
import { BsDownload } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";

type PharType = z.infer<typeof PharmacySchema>;
const PharInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PharType>({
    mode: "onBlur",
    resolver: zodResolver(PharmacySchema),
  });

  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (!fileContent || !fileName) {
      alert("Please upload a file first.");
      return;
    }

    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <form
      className="flex flex-bol gap-5 w-full"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex-1 flex-col dark:text-black">
        <div className=" flex  flex-col items-center">
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
          <div className="flex gap-2 mt-5 ">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox"
              id="open24"
            />
            <label htmlFor="open24">My Pharmacy works all 24 Hour</label>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center gap-4 p-4">
        <div className="rounded-lg p-4 flex items-center justify-center">
          <img
            src="/6567dfgh.png"
            className="w-60 h-60 rounded-full object-cover"
            alt="Preview"
          />
        </div>
        <div className="flex justify-center gap-4">
          <button className="btn  font-semibold px-4 py-2 rounded transition">
            Remove
          </button>
          <button className="btn  font-semibold px-4 py-2 rounded transition">
            Update
          </button>
        </div>

        <div className="flex items-center gap-5">
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
          />
          <button onClick={handleDownload}>
            <BsDownload className="text-2xl cursor-pointer" />
          </button>
        </div>

        <div className="mt-40">
          <div className="btn bg-blue-200 text-base-200 flex itemstar justify-end">
            save changes
          </div>
        </div>
      </div>
    </form>
  );
};

export default PharInfo;
