import { model, Schema } from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    mediaUrls: [{
        type: String
    }],
    readBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const ticketSchema = new Schema({
    ticketId: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'resolved', 'closed'],
        default: 'open'
    },
    isClosed: {
        type: Boolean,
        default: false
    },
    lastMessageAt: {
        type: Date,
        default: Date.now
    },
    messages: [messageSchema]
}, { timestamps: true });

export default model('Ticket', ticketSchema);
