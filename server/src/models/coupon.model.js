import { model, Schema, Types } from "mongoose";

const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minBookingAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  maxDiscountAmount: {
    type: Number,
    min: 0
  },
  validFrom: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: null
  },
  usageCount: {
    type: Number,
    default: 0
  },
  userUsageLimit: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicableFor: {
    type: String,
    enum: ['all', 'hotel', 'villa'],
    default: 'all'
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

couponSchema.index({ code: 1 });
couponSchema.index({ validFrom: 1, validUntil: 1 });

export default model('Coupon', couponSchema);
