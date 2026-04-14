import { model, Schema, Types } from "mongoose";

const walletTransactionSchema = new Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['credit', 'debit'], required: true },
    reason: { type: String, required: true },
    bookingId: { type: Types.ObjectId, ref: 'Booking', default: null },
    balanceAfter: { type: Number, required: true }
}, { timestamps: true });

const walletSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    transactions: [walletTransactionSchema]
}, { timestamps: true });

export default model('Wallet', walletSchema);
