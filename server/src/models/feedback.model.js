import { model, Schema } from "mongoose";

const feedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['bug', 'suggestion', 'complaint', 'other'],
        required: true
    },
    message: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

feedbackSchema.index({ userId: 1, isActive: 1 });

export default model('Feedback', feedbackSchema);
