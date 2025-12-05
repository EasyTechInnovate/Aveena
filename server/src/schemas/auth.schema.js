import { z } from "zod";


export const sendOtpSchema = z.object({
  email: z.string().email().nullable().optional(),
  phone: z.object({
    countryCode: z.string({
      required_error: "Country code is required when using phone.",
      invalid_type_error: "Country code must be a string."
    }).regex(/^\+\d{1,4}$/, "Invalid country code."),
    number: z.string({
      required_error: "Phone number is required when using phone.",
      invalid_type_error: "Phone number must be a string."
    }).regex(/^\d{7,15}$/, "Invalid phone number.")
  }).nullable().optional()
})
.refine(
  (data) => {
    const hasEmail = data.email && data.email.trim().length > 0;
    const hasPhone = data.phone && data.phone.number && data.phone.countryCode;

    return (hasEmail && !hasPhone) || (!hasEmail && hasPhone);
  },
  {
    message: "Either email OR phone (with countryCode and number) is required, not both",
    path: ["email"]
  }
);

export const verifyOtpSchema = z.object({
  email: z.string().email().nullable().optional(),
  phone: z.object({
    countryCode: z.string({
      required_error: "Country code is required when using phone.",
      invalid_type_error: "Country code must be a string."
    }).regex(/^\+\d{1,4}$/, "Invalid country code."),
    number: z.string({
      required_error: "Phone number is required when using phone.",
      invalid_type_error: "Phone number must be a string."
    }).regex(/^\d{7,15}$/, "Invalid phone number.")
  }).nullable().optional(),
  verificationCode: z.preprocess(
    (val) => val !== undefined && val !== null ? String(val) : val,
    z.string({
        required_error: "Verification code is required.",
        invalid_type_error: "Verification code must be a string."
    }).length(6, "Verification code must be 6 digits.")
    .regex(/^\d{0,9}$/, "Invalid verification code.")
  )
})
.refine(
  (data) => {
    const hasEmail = data.email && data.email.trim().length > 0;
    const hasPhone = data.phone && data.phone.number && data.phone.countryCode;

    return (hasEmail && !hasPhone) || (!hasEmail && hasPhone);
  },
  {
    message: "Either email OR phone (with countryCode and number) is required, not both",
    path: ["email"]
  }
);

export const completeProfileSchema = z.object({
  firstName: z.string({
    required_error: "First name is required.",
    invalid_type_error: "First name must be a string."
  }).min(2, "First name must be at least 2 characters.").max(72, "First name must be at most 72 characters."),

  lastName: z.string({
    required_error: "Last name is required.",
    invalid_type_error: "Last name must be a string."
  }).min(2, "Last name must be at least 2 characters.").max(72, "Last name must be at most 72 characters."),

  email: z.string({
    required_error: "Email is required.",
    invalid_type_error: "Email must be a string."
  }).email("Email must be a valid email address."),

  phone: z.object({
    countryCode: z.string({
      required_error: "Country code is required.",
      invalid_type_error: "Country code must be a string."
    }).regex(/^\+\d{1,4}$/, "Invalid country code."),
    number: z.string({
      required_error: "Phone number is required.",
      invalid_type_error: "Phone number must be a string."
    }).regex(/^\d{7,15}$/, "Invalid phone number.")
  }),

  dateOfBirth: z.string({
    required_error: "Date of birth is required.",
    invalid_type_error: "Date of birth must be a string."
  }).optional(),

  nationality: z.string({
    required_error: "Nationality is required.",
    invalid_type_error: "Nationality must be a string."
  }).optional(),

  gender: z.enum(['male', 'female', 'other'], {
    required_error: "Gender is required.",
    invalid_type_error: "Gender must be one of male, female, or other."
  }).optional(),

  address: z.object({
    country: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    aptorsuiteorfloor: z.string().optional(),
    fullAddress: z.string().optional(),
    zipCode: z.string().optional()
  }).optional()
});