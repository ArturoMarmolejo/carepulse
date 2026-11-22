import { isValidPhoneNumber } from "react-phone-number-input"
import { z } from "zod"

export const UserFormValidation = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.email("Invalid email address"),
    // The phone input returns undefined until something is typed, hence the custom error
    phone: z
        .string({ error: "Invalid phone number" })
        .refine((phone) => isValidPhoneNumber(phone), "Invalid phone number"),
})
