import { createAction, props } from "@ngrx/store";
import { TransactionModel } from "../models/transaction-model";

export const initTransactions = createAction(
    '[Transactions] Init transactions')

export const initTransactionsSuccess = createAction(
    '[Transactions] Init Transactions Success',
    props<{transactions:TransactionModel[]}>())

export const  initTransactionsFailure  = createAction(
    '[Transactions] Init Transactions Failure',
    props<{error: string}>()
)

