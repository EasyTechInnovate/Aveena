import { model, Schema } from "mongoose";

const mediaSchema = new Schema({
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const propertyDetails = new Schema({
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    propertyMedia: [mediaSchema],
    spaces: [{
        image: {
            type: String,
            required: true
        },
        pointers: [String],
        title: String,
        header: String
    }],
    meals: {
        options: [String],
        media: mediaSchema,
        description: String
    },
    villaLocationDescription: String,
    experiences: {
        media: [mediaSchema],
        description: String
    },
    faqs: [{
        question: String,
        answer: String
    }]
}, { timestamps: true });


export default model("PropertyDetails", propertyDetails);