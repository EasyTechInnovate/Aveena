import { z } from "zod";

export const createBookingSchema = z.object({
  propertyId: z
    .string({
      required_error: "Property ID is required.",
      invalid_type_error: "Property ID must be a string."
    })
    .min(1, "Property ID cannot be empty."),
  checkInDate: z
    .string({
      required_error: "Check-in date is required.",
      invalid_type_error: "Check-in date must be a string."
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid check-in date format."
    }),
  checkOutDate: z
    .string({
      required_error: "Check-out date is required.",
      invalid_type_error: "Check-out date must be a string."
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid check-out date format."
    }),
  adults: z
    .number({
      required_error: "Number of adults is required.",
      invalid_type_error: "Number of adults must be a number."
    })
    .int("Number of adults must be an integer.")
    .positive("At least 1 adult is required."),
  childrens: z
    .number({
      invalid_type_error: "Number of children must be a number."
    })
    .int("Number of children must be an integer.")
    .nonnegative("Number of children cannot be negative.")
    .optional()
    .default(0),
  noOfRooms: z
    .number({
      required_error: "Number of rooms is required.",
      invalid_type_error: "Number of rooms must be a number."
    })
    .int("Number of rooms must be an integer.")
    .positive("At least 1 room is required."),
  couponCode: z
    .string({
      invalid_type_error: "Coupon code must be a string."
    })
    .optional()
});

export const paymentSuccessSchema = z.object({
  txnid: z
    .string({
      required_error: "Transaction ID is required.",
      invalid_type_error: "Transaction ID must be a string."
    })
    .min(1, "Transaction ID cannot be empty."),
  mode: z
    .string({
      invalid_type_error: "Payment mode must be a string."
    })
    .optional(),
  amount: z
    .union([z.string(), z.number()], {
      invalid_type_error: "Amount must be a string or number."
    })
    .optional()
});

export const paymentFailureSchema = z.object({
  txnid: z
    .string({
      required_error: "Transaction ID is required.",
      invalid_type_error: "Transaction ID must be a string."
    })
    .min(1, "Transaction ID cannot be empty.")
});
