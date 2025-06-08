import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import TextInput from "../../../../../components/input";
import { BsDownload } from "react-icons/bs";
import { IPharmacy } from "../../types";

interface FormData {
  name: string;
  contactNumber: string;
  OpeningTime: string;
  ClosingTime: string;
  isOpen24: boolean;
  daysOpen: string;
}

interface PharInfoProps {
  pharmacy?: IPharmacy;
}

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PharInfo = ({ pharmacy }: PharInfoProps) => {
  const {
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  useEffect(() => {
    if (pharmacy) {
      reset({
        name: pharmacy.name,
        contactNumber: pharmacy.contactNumber,
        OpeningTime: pharmacy.openingTime,
        ClosingTime: pharmacy.closingTime,
        isOpen24: pharmacy.isOpen24,
        daysOpen: pharmacy.daysOpen,
      });
      setSelectedDays(pharmacy.daysOpen ? pharmacy.daysOpen.split(", ") : []);
    }
  }, [pharmacy, reset]);

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

  if (!pharmacy) {
    return null;
  }

  return (
    <div className="h-[calc(88vh-9rem)] py-10 px-4 sm:px-6 lg:px-10 dark:text-gray-900 overflow-y-auto">
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        {/* Image Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center gap-4 p-4">
          <div className="rounded-lg p-4 flex items-center justify-center">
            <img
              src={pharmacy.logoURL ? `https://localhost:7298/${pharmacy.logoURL}` : "/6567dfgh.png"}
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
        </div>

        {/* Form Fields Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextInput
            name="name"
            label="Pharmacy Name"
            register={register}
            errors={errors}
            disabled
          />
          <TextInput
            name="contactNumber"
            label="Contact Number"
            register={register}
            errors={errors}
            disabled
          />
          <TextInput
            name="OpeningTime"
            label="Opening Time"
            register={register}
            errors={errors}
            type="time"
            disabled
          />
          <TextInput
            name="ClosingTime"
            label="Closing Time"
            register={register}
            errors={errors}
            type="time"
            disabled
          />

          <div className="flex gap-2 mt-5 col-span-1 sm:col-span-2">
            <input
              type="checkbox"
              {...register("isOpen24")}
              className="checkbox"
              id="open24"
              disabled
            />
            <label htmlFor="open24">My Pharmacy works all 24 Hour</label>
          </div>

          {/* Days Open Section */}
          <div className="col-span-1 sm:col-span-2 mt-5">
            <h3 className="text-lg font-semibold mb-3">Open Days</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={day}
                    checked={selectedDays.includes(day)}
                    disabled
                    className="checkbox checkbox-primary"
                  />
                  <label htmlFor={day} className="cursor-pointer">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharInfo;
