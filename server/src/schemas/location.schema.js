import { z } from "zod";

export const searchLocationSchema = z.object({
  query: z.string({
    required_error: "Search query is required.",
    invalid_type_error: "Search query must be a string."
  }).min(1, "Search query must be at least 1 character.")
});
