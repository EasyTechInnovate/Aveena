import { model, Schema, Types } from "mongoose";


const bookedDateSchema = new Schema({
  entityType: { type: String, enum: ['property', 'room'], required: true },
  entityId: { type: Types.ObjectId, required: true },

  date: { type: Date, required: true },
  bookingId: { type: Types.ObjectId, ref: "Booking", required: true },

  unitsBooked: { type: Number, default: 1 } 

}, { timestamps: true });


export default model("BookedDates", bookedDateSchema);

