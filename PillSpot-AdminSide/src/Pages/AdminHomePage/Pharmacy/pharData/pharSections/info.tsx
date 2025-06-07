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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        setFileContent(event.target.result);
      }
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

  const onSubmit = (data: PharType) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div className="h-[calc(88vh-9rem)] py-10 px-4 sm:px-6 lg:px-10 dark:text-gray-900 overflow-y-auto">
      <form
        className="flex flex-col lg:flex-row gap-5 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Image Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center gap-4 p-4">
          <div className="rounded-lg p-4 flex items-center justify-center">
            <img
              src="/6567dfgh.png"
              className="w-48 h-48 sm:w-60 sm:h-60 rounded-full object-cover"
              alt="Preview"
            />
          </div>
          <div className="flex justify-center gap-4">
            <button type="button" className="btn font-semibold px-4 py-2 rounded transition">
              Remove
            </button>
            <button type="button" className="btn font-semibold px-4 py-2 rounded transition">
              Update
            </button>
          </div>

          <div className="flex items-center gap-5">
            <input
              type="file"
              className="file-input w-full max-w-xs"
              onChange={handleFileChange}
            />
            <button type="button" onClick={handleDownload}>
              <BsDownload className="text-2xl cursor-pointer" />
            </button>
          </div>

          <div className="mt-8 lg:mt-40">
            <button type="submit" className="btn bg-blue-200 text-base-200 flex itemstar justify-end">
              save changes
            </button>
          </div>
        </div>

        {/* Form Fields Section */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

            <div className="flex gap-2 mt-5 col-span-1 sm:col-span-2">
              <input
                type="checkbox"
                {...register("isOpen24")}
                className="checkbox"
                id="open24"
              />
              <label htmlFor="open24">My Pharmacy works all 24 Hour</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PharInfo;
