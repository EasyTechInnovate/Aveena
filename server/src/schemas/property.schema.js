import { z } from "zod";


export const roomSchema = z.object({
  title: z.string({
    required_error: "Room title is required.",
    invalid_type_error: "Room title must be a string."
  }),
  description: z.string({
    required_error: "Room description is required.",
    invalid_type_error: "Room description must be a string."
  }),
  basePrice: z
    .number({
      required_error: "Room base price is required.",
      invalid_type_error: "Room base price must be a number."
    })
    .positive("Room base price must be a positive number."),
  totalUnits: z
    .number({
      required_error: "Total units is required.",
      invalid_type_error: "Total units must be a number."
    })
    .positive("Total units must be a positive number."),
  amenties: z.array(z.string(), {
    required_error: "Room amenties are required.",
    invalid_type_error: "Room amenties must be an array of strings."
  }),
  capacity: z.object({
    adults: z
      .number({
        required_error: "Adults capacity is required.",
        invalid_type_error: "Adults capacity must be a number."
      })
      .positive("Adults capacity must be a positive number."),
    childrens: z
      .number({
        required_error: "Children capacity is required.",
        invalid_type_error: "Children capacity must be a number."
      })
      .nonnegative("Children capacity must be a nonnegative number.")
  })
})

export const createPropertySchema = z.object({
  propertyName: z
    .string({
      required_error: "Property name is required.",
      invalid_type_error: "Property name must be a string."
    })
    .min(2, "Property name must be at least 2 characters."),

  type: z
    .enum(["hotel", "villa", "apartment"], {
      required_error: "Property type is required.",
      invalid_type_error: "Type must be either 'hotel', 'villa' or 'apartment'."
    }),

  address: z.object({
    fullAddress: z
      .string({
        required_error: "Full address is required.",
        invalid_type_error: "Full address must be a string."
      })
      .min(5, "Full address must be at least 5 characters."),

    zipCode: z
      .string({ invalid_type_error: "Zip code must be a string." })
      .optional()
      .or(z.literal(""))
  }),

  location: z.object({
    latitude: z
      .number({
        required_error: "Latitude is required.",
        invalid_type_error: "Latitude must be a number."
      })
      .min(-90, "Latitude must be between -90 and 90.")
      .max(90, "Latitude must be between -90 and 90."),

    longitude: z
      .number({
        required_error: "Longitude is required.",
        invalid_type_error: "Longitude must be a number."
      })
      .min(-180, "Longitude must be between -180 and 180.")
      .max(180, "Longitude must be between -180 and 180.")
  }),

  capacity: z.object({
    adults: z.number({
      required_error: "Adults capacity is required.",
      invalid_type_error: "Adults capacity must be a number."
    })
      .positive("Adults capacity must be a positive number."),
    childrens: z.number({
      required_error: "Children capacity is required.",
      invalid_type_error: "Children capacity must be a number."
    })
      .nonnegative("Children capacity must be a nonnegetive number.")
  }),

  noOfRooms: z
    .number({
      required_error: "Number of rooms is required.",
      invalid_type_error: "Number of rooms must be a number."
    })
    .int("Number of rooms must be a whole number.")
    .positive("Number of rooms must be greater than 0."),

  noOfBaths: z
    .number({
      required_error: "Number of baths is required.",
      invalid_type_error: "Number of baths must be a number."
    })
    .int("Number of baths must be a whole number.")
    .positive("Number of baths must be greater than 0."),

  basePrice: z
    .number({
      required_error: "Base price is required.",
      invalid_type_error: "Base price must be a number."
    })
    .positive("Base price must be a positive number."),

  totalUnits: z
    .number({
      required_error: "Total units is required.",
      invalid_type_error: "Total units must be a number."
    })
    .int("Total units must be a whole number.")
    .positive("Total units must be greater than 0."),

  amenties: z
    .array(z.string(), {
      required_error: "Amenities are required.",
      invalid_type_error: "Amenities must be an array of strings."
    }),

  description: z
    .string({
      required_error: "Description is required.",
      invalid_type_error: "Description must be a string."
    })
    .min(5, "Description must be at least 5 characters."),

  coverImage: z
    .string({
      required_error: "Cover image is required.",
      invalid_type_error: "Cover image must be a string."
    })
    .url("Cover image must be a valid URL."),
  minimumRentalIncome: z.number({
    required_error: "Minimum rental income is required.",
    invalid_type_error: "Minimum rental income must be a number."
  }).positive("Minimum rental income must be a positive number."),
  saleTarget: z.number({
    required_error: "Sale target is required.",
    invalid_type_error: "Sale target must be a number."
  }).positive("Sale target must be a positive number."),
  kycDocument: z.string({
    required_error: "KYC document is required.",
    invalid_type_error: "KYC document must be a string."
  }).url("KYC document must be a valid URL."),
  rooms: z.array(roomSchema).optional().default([]),
}).refine(
  (data) => {
    if (data.type === "villa" || data.type === "apartment") {
      return data.totalUnits === 1;
    }
    return true;
  },
  {
    message: "For villas and apartments, total units must be exactly 1.",
    path: ["totalUnits"]
  }
)


export const getPropertiesSchema = z.object({
  whereTo: z.string({
    required_error: "Where to is required.",
    invalid_type_error: "Where to must be a string."
  }),

  checkIn: z.preprocess(
    (val) => val ? new Date(val) : undefined,
    z.date({
      required_error: "Check in is required.",
      invalid_type_error: "Check in must be a valid date."
    })
  ),

  checkOut: z.preprocess(
    (val) => val ? new Date(val) : undefined,
    z.date({
      required_error: "Check out is required.",
      invalid_type_error: "Check out must be a valid date."
    })
  ),

  adults: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: "Adults is required.",
      invalid_type_error: "Adults must be a number."
    }).default(1)
  ),

  childrens: z.preprocess(
    (val) => Number(val || 0),
    z.number({
      required_error: "Children is required.",
      invalid_type_error: "Children must be a number."
    }).nonnegative("Children must be a nonnegative number.").optional().default(0)
  ),

  rooms: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: "Rooms is required.",
      invalid_type_error: "Rooms must be a number."
    }).default(1)
  ),

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


export const mediaSchema = z.object({
  type: z.enum(["image", "video"]),
  url: z.string().url("Media URL must be a valid URL"),
});


export const propertyDetailsSchema = z.object({
  propertyId: z.string({
    required_error: "Property ID is required",
  }),

  propertyMedia: z.array(mediaSchema).default([]),

  spaces: z
    .array(
      z.object({
        image: z.string({
          required_error: "Space image is required",
        }),
        pointers: z.array(z.string()).default([]),
        title: z.string().optional(),
        header: z.string().optional(),
      })
    )
    .default([]),

  meals: z
    .object({
      options: z.array(z.string()).default([]),
      media: mediaSchema.optional(),
      description: z.string().optional(),
    })
    .optional(),

  locationDescription: z.string().optional(),

  experiences: z
    .object({
      media: z.array(mediaSchema).default([]),
      description: z.string().optional(),
    })
    .optional(),

  faqs: z
    .array(
      z.object({
        question: z.string().optional(),
        answer: z.string().optional(),
      })
    )
    .default([]),
});

export const toggleActiveSchema = z.object({
  propertyId: z.string({
    required_error: "Property ID is required",
  }),
});

export const getPropertyByIdSchema = z.object({
  id: z.string({
    required_error: "Property ID is required",
  }),
});

export const updatePropertySchema = z.object({
  propertyId: z.string({
    required_error: "Property ID is required",
  }),
  propertyName: z.string().min(2, "Property name must be at least 2 characters.").optional(),
  address: z.object({
    fullAddress: z.string().min(5, "Full address must be at least 5 characters.").optional(),
    zipCode: z.string().optional().or(z.literal("")),
  }).optional(),
  location: z.object({
    latitude: z.number().min(-90, "Latitude must be between -90 and 90.").max(90, "Latitude must be between -90 and 90.").optional(),
    longitude: z.number().min(-180, "Longitude must be between -180 and 180.").max(180, "Longitude must be between -180 and 180.").optional(),
  }).optional(),
  capacity: z.object({
    adults: z.number().positive("Adults capacity must be a positive number.").optional(),
    childrens: z.number().nonnegative("Children capacity must be a nonnegative number.").optional(),
  }).optional(),
  noOfRooms: z.number().int("Number of rooms must be a whole number.").positive("Number of rooms must be greater than 0.").optional(),
  noOfBaths: z.number().int("Number of baths must be a whole number.").positive("Number of baths must be greater than 0.").optional(),
  basePrice: z.number().positive("Base price must be a positive number.").optional(),
  totalUnits: z.number().int("Total units must be a whole number.").positive("Total units must be greater than 0.").optional(),
  amenties: z.array(z.string()).optional(),
  description: z.string().min(5, "Description must be at least 5 characters.").optional(),
  coverImage: z.string().url("Cover image must be a valid URL.").optional(),
  minimumRentalIncome: z.number().positive("Minimum rental income must be a positive number.").optional(),
  saleTarget: z.number().positive("Sale target must be a positive number.").optional(),
  kycDocument: z.string().url("KYC document must be a valid URL.").optional(),
});

export const getRandomPropertiesSchema = z.object({
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

