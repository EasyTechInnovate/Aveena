import { Schema } from "mongoose";


const availabilityExceptionSchema = new Schema({
  entityType: { type: String, enum: ['property', 'room'], required: true },
  entityId: { type: Types.ObjectId, required: true },

  date: { type: Date, required: true },

  isBlocked: { type: Boolean, default: false },
  specialPrice: Number,
  overrideUnits: Number,

}, { timestamps: true });

