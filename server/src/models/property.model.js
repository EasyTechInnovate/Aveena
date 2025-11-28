import { model, Schema, Types } from "mongoose";


const propertySchema = new Schema({
    ownerId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: String,
    type: {
        type: String,
        enum: ['hotel', 'villa'],
        required: true
    },
    address: {
        fullAddress: String,
        zipCode: String
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    basePrice: Number,
    totalUnits: Number,
    amenties: [String],
    description: String,
    coverImage: String,
    capacity: {
        adults: Number,
        childrens: Number
    },
    noOfRooms: Number,
    noOfBaths: Number,
    rating: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    locationId: {
        type: Types.ObjectId,
        ref: 'Location',
        required: true
    }
}, { timestamps: true })


export default model('Property', propertySchema);