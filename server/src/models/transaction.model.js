import { model, Schema } from "mongoose";


const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    txnId: String,
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    amount: Number,
    paymentMode: String,
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    addedOn: String

}, {timestamps: true});


export default model("Transaction", transactionSchema);