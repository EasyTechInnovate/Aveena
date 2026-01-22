import { z } from "zod";

export const createEnquirySchema = z.object({
    fullName: z.string({
        required_error: "Full name is required",
        invalid_type_error: "Full name must be a string"
    }).min(2, "Full name must be at least 2 characters").max(100, "Full name must be at most 100 characters"),

    phoneNumber: z.string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a string"
    }),

    hotelName: z.string({
        required_error: "Hotel name is required",
        invalid_type_error: "Hotel name must be a string"
    }).max(200, "Hotel name must be at most 200 characters"),

    cityName: z.string({
        required_error: "City name is required",
        invalid_type_error: "City name must be a string"
    }).max(100, "City name must be at most 100 characters")
});

export const getEnquiriesSchema = z.object({
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
