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
    children: Number
  },

  priceBreakdown: {
    base: Number,
    taxes: Number,
    discount: Number,
    total: Number
  },

  status: { 
    type: String, 
    enum: ['pending','confirmed','cancelled'], 
    default: 'pending'
  },

  cancellation: {
    cancelledAt: Date,
    refundAmount: Number
  },

}, { timestamps: true });


export default model("Booking", bookingSchema);

