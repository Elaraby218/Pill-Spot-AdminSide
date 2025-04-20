import {z} from 'zod'

export const PharmacySchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters long")
    .nonempty("Name is required"),

  contactNumber: z
    .string()
    .nonempty("Contact number is required")
    .regex(/^\+?[0-9]{7,15}$/, "Invalid contact number"),

  governorate: z.string().nonempty("Governorate is required"),

  city: z.string().nonempty("City is required"),

  licenceId: z.string().nonempty("License ID is required"),

  daysOpen: z.string().nonempty("Days open is required"),

  isOpen24: z.boolean(),

  timeOpen: z
    .string()
    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Open time must be in HH:MM format",
    }),

  timeClose: z
    .string()
    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Close time must be in HH:MM format",
    }),
});
