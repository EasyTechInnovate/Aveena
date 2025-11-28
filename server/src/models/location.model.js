import { model, Schema } from "mongoose";


const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String,
        enum: ['area', 'city', 'state', 'country'],
        required: true
    },
    parentLocationId: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
    },
    placeId: String,
    isPopular: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
   
locationSchema.index({ name: "text" });
locationSchema.index({ type: 1 });


export default model('Location', locationSchema);