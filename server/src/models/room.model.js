import { model, Schema, Types } from "mongoose";


const roomSchema = new Schema({
    propertyId: {
        type: Types.ObjectId,
        ref: 'Property',
        required: true
    },
    title: String,
    description: String,
    basePrice: Number,
    totalUnits: Number,
    amenties: [String],
    capacity: {
        adults: Number,
        childrens: Number
    }
    
}, { timestamps: true })


export default model("Room", roomSchema);