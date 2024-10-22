import { createAction, props } from "@ngrx/store";
import { TransactionModel } from "../models/transaction-model";

export const initTransactions = createAction(
    '[List] init transactions',
props<{content:TransactionModel[]}>())

