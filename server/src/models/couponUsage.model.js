import { model, Schema, Types } from "mongoose";

const couponUsageSchema = new Schema({
  couponId: {
    type: Types.ObjectId,
    ref: 'Coupon',
    required: true
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingId: {
    type: Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  discountAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

couponUsageSchema.index({ couponId: 1, userId: 1 });

export default model('CouponUsage', couponUsageSchema);
