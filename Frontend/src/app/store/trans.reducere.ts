import { createReducer, on, State } from "@ngrx/store";
import { TransactionModel } from "../models/transaction-model";
import { initTransactions } from "./trans.actions";

export interface TransactionsState{
    transactions:TransactionModel[],
    error: string,
    status: "pending" | "loading"  | "error" | "success"
}

export const initialState : TransactionsState = {
    transactions: [],
    error:null,
    status:"pending"
}

export const transactionsReducer = createReducer(
    initialState,
    
    on(initTransactions, (state, {content})=>({
        ...state,
        transactions:content,
        error:null,
        status:"success" as const,
    } ))
)