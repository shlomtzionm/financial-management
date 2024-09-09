import mongoose, { Document, ObjectId, Schema, model } from 'mongoose';
import { CategoryModel } from './category-model'; // Import Category Model

// Define the Transaction Interface
export interface ITransactionModel extends Document {
    date: string;
    amount: number;
    description: string;
    category: string;
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
        type: String,
        required: [true, "missing category"]
    }
}, {
    versionKey: false,
 
});




export const TransactionModel = model<ITransactionModel>("TransactionModel", TransactionSchema, "Transactions");
