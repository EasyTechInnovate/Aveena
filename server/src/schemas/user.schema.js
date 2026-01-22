import { z } from "zod";

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
