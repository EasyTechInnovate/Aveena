import { z } from "zod";

const permissionSchema = z.object({
    read: z.boolean().optional(),
    edit: z.boolean().optional()
});

export const addTeamMemberSchema = z.object({
    firstName: z.string().min(2).max(72),
    lastName: z.string().min(2).max(72),
    email: z.string().email(),
    password: z.string().min(6), // Enforce strong password policy if needed
    permissions: z.object({
        dashboard: permissionSchema.optional(),
        analytics: permissionSchema.optional(),
        allBookings: permissionSchema.optional(),
        allCustomers: permissionSchema.optional(),
        allProperty: permissionSchema.optional(),
        propertyOwner: permissionSchema.optional(),
        pendingKYC: permissionSchema.optional(),
        offer: permissionSchema.optional(),
        teamManagement: permissionSchema.optional(),
        helpCenter: permissionSchema.optional(),
        profile: permissionSchema.optional()
    })
});

export const updateTeamMemberSchema = z.object({
    firstName: z.string().min(2).max(72).optional(),
    lastName: z.string().min(2).max(72).optional(),
    permissions: z.object({
        dashboard: permissionSchema.optional(),
        analytics: permissionSchema.optional(),
        allBookings: permissionSchema.optional(),
        allCustomers: permissionSchema.optional(),
        allProperty: permissionSchema.optional(),
        propertyOwner: permissionSchema.optional(),
        pendingKYC: permissionSchema.optional(),
        offer: permissionSchema.optional(),
        teamManagement: permissionSchema.optional(),
        helpCenter: permissionSchema.optional(),
        profile: permissionSchema.optional()
    }).optional()
});
