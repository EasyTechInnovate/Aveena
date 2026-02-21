import { z } from "zod";

export const createPropertyOwnerSchema = z.object({
    firstName: z.string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string"
    }).min(2, "First name must be at least 2 characters").max(72, "First name must be at most 72 characters"),

    lastName: z.string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string"
    }).min(2, "Last name must be at least 2 characters").max(72, "Last name must be at most 72 characters"),

    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email("Invalid email format"),

    phone: z.object({
        countryCode: z.string().optional(),
        number: z.string({
            required_error: "Phone number is required",
            invalid_type_error: "Phone number must be a string"
        })
    }).optional()
});
