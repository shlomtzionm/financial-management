import { createReducer, on } from "@ngrx/store";
import { TransactionModel } from "../models/transaction-model";
import { initTransactions, initTransactionsFailure, initTransactionsSuccess } from "./trans.actions";

export interface TransactionsState {
    transactions: TransactionModel[];
    error: string | null; // Allow error to be null
    status: "pending" | "loading" | "error" | "success";
}

export const initialState: TransactionsState = {
    transactions: [],
    error: null,
    status: "pending"
};

export const transactionsReducer = createReducer(
    initialState,
    
    on(initTransactions, (state) => ({
        ...state,
        status: "loading" as const
    })),

    on(initTransactionsSuccess, (state, { transactions }) => ({
        ...state,
        transactions: transactions,
        error: null,
        status: "success" as const
    })),

    on(initTransactionsFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: "error" as const
    }))
);