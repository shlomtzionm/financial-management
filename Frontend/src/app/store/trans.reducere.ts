import { TransactionModel } from "../models/transaction-model";

export interface TransactionsState{
    transactions:TransactionModel[],
    error: string,
    status: "pending" | "loading"  | "error" | "success"
}

export const initailState : TransactionsState = {
    transactions: [],
    error:null,
    status:"pending"
}

