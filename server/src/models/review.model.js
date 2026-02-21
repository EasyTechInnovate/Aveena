import { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    propertyId: {
        type: Types.ObjectId,
        ref: 'Property',
        required: true
    },
    bookingId: {
        type: Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    highlightedPoints: [{
        type: String
    }],
    helpfulness: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

reviewSchema.index({ bookingId: 1 }, { unique: true });

export default model('Review', reviewSchema);
