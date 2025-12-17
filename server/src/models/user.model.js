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
        enum: ['customer', 'admin', 'property_owner'],
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
    }
}, { timestamps: true });



export default model('User', userSchema);