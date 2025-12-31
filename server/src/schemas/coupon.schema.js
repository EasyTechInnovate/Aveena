import { z } from "zod";

export const createCouponSchema = z.object({
  code: z
    .string({
      required_error: "Coupon code is required.",
      invalid_type_error: "Coupon code must be a string."
    })
    .min(3, "Coupon code must be at least 3 characters.")
    .max(20, "Coupon code must not exceed 20 characters."),
  description: z
    .string({
      required_error: "Description is required.",
      invalid_type_error: "Description must be a string."
    })
    .min(1, "Description cannot be empty."),
  discountType: z
    .enum(['percentage', 'fixed'], {
      required_error: "Discount type is required.",
      invalid_type_error: "Discount type must be 'percentage' or 'fixed'."
    }),
  discountValue: z
    .number({
      required_error: "Discount value is required.",
      invalid_type_error: "Discount value must be a number."
    })
    .positive("Discount value must be greater than 0."),
  minBookingAmount: z
    .number({
      invalid_type_error: "Minimum booking amount must be a number."
    })
    .nonnegative("Minimum booking amount cannot be negative.")
    .optional(),
  maxDiscountAmount: z
    .number({
      invalid_type_error: "Maximum discount amount must be a number."
    })
    .positive("Maximum discount amount must be greater than 0.")
    .optional(),
  validFrom: z
    .string({
      required_error: "Valid from date is required.",
      invalid_type_error: "Valid from date must be a string."
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid valid from date format."
    }),
  validUntil: z
    .string({
      required_error: "Valid until date is required.",
      invalid_type_error: "Valid until date must be a string."
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid valid until date format."
    }),
  usageLimit: z
    .number({
      invalid_type_error: "Usage limit must be a number."
    })
    .int("Usage limit must be an integer.")
    .positive("Usage limit must be greater than 0.")
    .optional(),
  userUsageLimit: z
    .number({
      invalid_type_error: "User usage limit must be a number."
    })
    .int("User usage limit must be an integer.")
    .positive("User usage limit must be greater than 0.")
    .optional(),
  applicableFor: z
    .enum(['all', 'hotel', 'villa', 'apartment'], {
      invalid_type_error: "Applicable for must be 'all', 'hotel', 'villa', or 'apartment'."
    })
    .optional()
});

export const applyCouponSchema = z.object({
  code: z
    .string({
      required_error: "Coupon code is required.",
      invalid_type_error: "Coupon code must be a string."
    })
    .min(1, "Coupon code cannot be empty."),
  propertyId: z
    .string({
      required_error: "Property ID is required.",
      invalid_type_error: "Property ID must be a string."
    })
    .min(1, "Property ID cannot be empty."),
  bookingAmount: z
    .number({
      required_error: "Booking amount is required.",
      invalid_type_error: "Booking amount must be a number."
    })
    .positive("Booking amount must be greater than 0.")
});

export const toggleCouponStatusSchema = z.object({
  couponId: z
    .string({
      required_error: "Coupon ID is required.",
      invalid_type_error: "Coupon ID must be a string."
    })
    .min(1, "Coupon ID cannot be empty.")
});
