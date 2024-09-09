import mongoose, { Document, ObjectId, Schema, model } from 'mongoose';
import { CategoryModel } from './category-model'; // Import Category Model

// Define the Transaction Interface
export interface ITransactionModel extends Document {
    date: string;
    amount: number;
    description: string;
    category: ObjectId;
}

// Define the Transaction Schema
const TransactionSchema = new Schema<ITransactionModel>({
    date: {
        type: String,
        required: [true, "missing date"]
    },
    amount: {
        type: Number,
        required: [true, "missing amount"]
    },
    description: {
        type: String,
        required: [true, "missing description"]
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: [true, "missing category"]
    }
}, {
    versionKey: false,
    toJSON:{virtuals:true},
    id:false
});


TransactionSchema.virtual("categoryId",{
    ref: CategoryModel,
    localField:"category",
    foreignField:"_id",
    justOne:true
})

export const TransactionModel = model<ITransactionModel>("TransactionModel", TransactionSchema, "Transactions");
