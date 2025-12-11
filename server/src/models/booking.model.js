import { model, Schema, Types } from "mongoose";

const bookingSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },

  propertyId: { type: Types.ObjectId, ref: 'Property', required: true },
  roomId: { type: Types.ObjectId, ref: 'Room' }, 

  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  nights: Number,

  guests: {
    adults: Number,
    childrens: Number
  },

  priceBreakdown: {
    base: Number,
    taxes: Number,
    discount: Number,
    total: Number
  },

  couponCode: {
    type: String,
    uppercase: true
  },

  couponId: {
    type: Types.ObjectId,
    ref: 'Coupon'
  },

  status: {
    type: String,
    enum: ['pending','confirmed','cancelled', 'failed'],
    default: 'pending'
  },

  cancellation: {
    cancelledAt: Date,
    refundAmount: Number,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },

}, { timestamps: true });


export default model("Booking", bookingSchema);

