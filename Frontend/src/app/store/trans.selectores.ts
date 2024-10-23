import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { TransactionsState } from "./trans.reducere";

export const selectTransactions = (state: AppState) => state.transactions;

export const selectAllTransactions = createSelector(
    selectTransactions,
    (state: TransactionsState) => state.transactions
);
