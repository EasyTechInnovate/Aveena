import { model, Schema } from "mongoose";

const userSchema = new Schema({

    firstName: {
        type: String,
        minlength: 2,
        maxlength: 72
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 72
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        sparse: true
    },
    phone: {
        countryCode: {
            type: String,
        },
        number: {
            type: String,
            unique: true,
            sparse: true
        }
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    nationality: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: false
    },
    address: {
        country: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        aptorsuiteorfloor: {
            type: String,
            required: false
        },
        fullAddress: {
            type: String,
            required: false
        },
        zipCode: {
            type: String,
            required: false
        }
    },
    verification: {
        code: {
            type: String,
            required: false
        },
        expiresAt: {
            type: Date,
            required: false
        }
    },
    type: {
        type: String,
        enum: ['customer', 'admin', 'property_owner', 'team_member'],
        default: 'customer'
    },
    aadhaarCard: {
        type: String,
        default: null
    },
    isProfileComplete: {
        type: Boolean,
        default: false
    },
    isIdentityVerified: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    profilePicture: {
        type: String,
        required: false
    },
    authProvider: {
        type: String,
        enum: ['email', 'phone', 'google'],
        default: 'email'
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }],
    password: {
        type: String,
        select: false
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    roleLabel: {
        type: String,
        default: null
    },
    permissions: {
        dashboard: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        analytics: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        allBookings: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        allCustomers: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        allProperty: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        propertyOwner: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        pendingKYC: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        offer: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        teamManagement: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        helpCenter: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        profile: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        }
    }
}, { timestamps: true });



export default model('User', userSchema);