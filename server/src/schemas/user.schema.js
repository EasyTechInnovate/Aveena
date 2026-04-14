import { z } from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z.string({ required_error: "Current password is required." }).min(1),
    newPassword: z.string({ required_error: "New password is required." }).min(8, "Password must be at least 8 characters.")
});

export const updateContactSchema = z.object({
    verificationCode: z.preprocess(
        (val) => val !== undefined && val !== null ? String(val) : val,
        z.string({ required_error: "Verification code is required." }).length(6, "Verification code must be 6 digits.")
    ),
    email: z.string().email().optional(),
    phone: z.object({
        countryCode: z.string().regex(/^\+\d{1,4}$/, "Invalid country code."),
        number: z.string().regex(/^\d{7,15}$/, "Invalid phone number.")
    }).optional()
}).refine(
    (data) => data.email || data.phone,
    { message: "Either email or phone is required.", path: ["email"] }
);

export const uploadIdentitySchema = z.object({
    documentType: z.enum(['aadhaar', 'pan', 'passport', 'drivingLicence'], {
        required_error: "Document type is required.",
        invalid_type_error: "documentType must be one of: aadhaar, pan, passport, drivingLicence."
    }),
    documentUrl: z.string({ required_error: "Document URL is required." }).url("Must be a valid URL.")
});

export const submitFeedbackSchema = z.object({
    type: z.enum(['bug', 'suggestion', 'complaint', 'other'], {
        required_error: "Feedback type is required."
    }),
    message: z.string({ required_error: "Message is required." })
        .min(10, "Message must be at least 10 characters.")
        .max(1000, "Message must be at most 1000 characters.")
});

export const paginationSchema = z.object({
    page: z.preprocess((val) => Number(val || 1), z.number().default(1)),
    limit: z.preprocess((val) => val ? Number(val) : 10, z.number().default(10))
});

export const toggleWishlistSchema = z.object({
    propertyId: z.string({
        required_error: "Property ID is required",
        invalid_type_error: "Property ID must be a string."
    }),
});

export const getWishlistSchema = z.object({
    page: z.preprocess(
        (val) => Number(val || 1),
        z.number({
            required_error: "Page is required.",
            invalid_type_error: "Page must be a number."
        }).default(1)
    ),

    limit: z.preprocess(
        (val) => val ? Number(val) : 10,
        z.number().default(10)
    )
});
