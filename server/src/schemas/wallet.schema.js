import { z } from "zod";

export const adminCreditSchema = z.object({
    userId: z.string({ required_error: "User ID is required." }).min(1),
    amount: z.number({ required_error: "Amount is required.", invalid_type_error: "Amount must be a number." })
        .positive("Amount must be greater than 0.")
        .max(100000, "Cannot credit more than ₹1,00,000 at once."),
    reason: z.string({ required_error: "Reason is required." }).min(3, "Reason must be at least 3 characters.").max(200)
});

export const walletPaginationSchema = z.object({
    page: z.preprocess((val) => Number(val || 1), z.number().default(1)),
    limit: z.preprocess((val) => val ? Number(val) : 10, z.number().default(10))
});
