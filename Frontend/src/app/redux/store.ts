import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TransactionModel } from "../models/transaction-model";
import { deleteTransaction, initTransactions, updateTransaction } from "./reducers";

export type AppState = {
  transactions: TransactionModel[];
 
};

const initialTransactionsState: TransactionModel[] = [];

const transactionsSlice = createSlice({
  name: "transactions", // Internal use
  initialState: initialTransactionsState,
  reducers: { initTransactions, updateTransaction, deleteTransaction },
});




// Creating action creators:
export const transactionActions = transactionsSlice.actions;


// Main redux object:
export const store = configureStore<AppState>({
  reducer: {
    transactions: transactionsSlice.reducer, // Product state.
  
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Optionally, you can also define `AppDispatch` type
export type AppDispatch = typeof store.dispatch;
