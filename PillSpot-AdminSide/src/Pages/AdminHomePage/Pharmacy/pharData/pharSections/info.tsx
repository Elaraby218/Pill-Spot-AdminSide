import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import TextInput from "../../../../../components/input";
import { IPharmacy } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../../App/Store";
import { editPharmacy } from "../../../../../Featurs/pharmacy/editPhar";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  contactNumber: z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
  OpeningTime: z.string(),
  ClosingTime: z.string(),
  isOpen24: z.boolean(),
  daysOpen: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface PharInfoProps {
  pharmacy?: IPharmacy;
  onPharmacyUpdate?: (updatedPharmacy: IPharmacy) => void;
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

const PharInfo = ({ pharmacy, onPharmacyUpdate }: PharInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, message } = useSelector((state: RootState) => state.editPharmacySlice);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
      setPreviewUrl(pharmacy.logoURL ? `https://localhost:7298/${pharmacy.logoURL}` : "/6567dfgh.png");
    }
  }, [pharmacy, reset]);

  useEffect(() => {
    if (status === "success") {
      toast.success(message);
    } else if (status === "error") {
      toast.error(message);
    }
  }, [status, message]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL for the selected file
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(pharmacy?.logoURL ? `https://localhost:7298/${pharmacy.logoURL}` : "/6567dfgh.png");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!pharmacy?.pharmacyId) return;

    try {
      const result = await dispatch(editPharmacy({
        pharmacyId: pharmacy.pharmacyId,
        data: {
          name: data.name,
          contactNumber: data.contactNumber,
          openingTime: data.OpeningTime,
          closingTime: data.ClosingTime,
          isOpen24: data.isOpen24,
          daysOpen: selectedDays.join(", "),
          logo: selectedFile || undefined,
        }
      })).unwrap();

      if (onPharmacyUpdate && result) {
        onPharmacyUpdate(result);
      }
    } catch (error) {
      console.error("Error updating pharmacy:", error);
    }
  };

  if (!pharmacy) {
    return null;
  }

  return (
    <div className="h-[calc(88vh-9rem)] py-10 px-4 sm:px-6 lg:px-10 dark:text-gray-900 overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-5 w-full">
        {/* Image Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center gap-4 p-4">
          <div className="rounded-lg p-4 flex items-center justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                className="w-48 h-48 sm:w-60 sm:h-60 rounded-full object-cover"
                alt="Preview"
              />
            ) : (
              <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <button 
              type="button" 
              className="btn font-semibold px-4 py-2 rounded transition"
              onClick={handleRemoveImage}
            >
              Remove
            </button>
          </div>

          <div className="flex items-center gap-5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="file-input w-full max-w-xs"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Form Fields Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextInput
            name="name"
            label="Pharmacy Name"
            register={register}
            errors={errors}
          />
          <TextInput
            name="contactNumber"
            label="Contact Number"
            register={register}
            errors={errors}
          />
          <TextInput
            name="OpeningTime"
            label="Opening Time"
            register={register}
            errors={errors}
            type="time"
          />
          <TextInput
            name="ClosingTime"
            label="Closing Time"
            register={register}
            errors={errors}
            type="time"
          />

          <div className="flex gap-2 mt-5 col-span-1 sm:col-span-2">
            <input
              type="checkbox"
              {...register("isOpen24")}
              className="checkbox"
              id="open24"
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
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDays([...selectedDays, day]);
                      } else {
                        setSelectedDays(selectedDays.filter(d => d !== day));
                      }
                    }}
                    className="checkbox checkbox-primary"
                  />
                  <label htmlFor={day} className="cursor-pointer">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="col-span-1 sm:col-span-2 mt-5">
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-primary w-full"
            >
              {status === "loading" ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PharInfo;
