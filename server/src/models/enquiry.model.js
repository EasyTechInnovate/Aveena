import { model, Schema } from "mongoose";

const enquirySchema = new Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    phoneNumber: {
        type: String,
        required: true
    },
    hotelName: {
        type: String,
        required: true,
        maxlength: 200
    },
    cityName: {
        type: String,
        required: true,
        maxlength: 100
    }
}, { timestamps: true });

export default model('Enquiry', enquirySchema);
