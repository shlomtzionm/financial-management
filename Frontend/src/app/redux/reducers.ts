import {  PayloadAction } from "@reduxjs/toolkit";
import { TransactionModel } from "../models/transaction-model";


export function initTransactions(currentState: TransactionModel[], action: PayloadAction<TransactionModel[]>): TransactionModel[] {
  const newState: TransactionModel[] = action.payload; // Here, action.payload is all products to init.
  return newState;
}


// Add product:
export function addTransaction(currentState: TransactionModel[], action: PayloadAction<TransactionModel>): TransactionModel[] {
  const newState: TransactionModel[] = [...currentState];
  newState.push(action.payload); // Here, action.payload is a product to add.
  return newState;
}



export function updateTransaction(currentState: TransactionModel[], action: PayloadAction<TransactionModel>): TransactionModel[] {
  return currentState.map((t) => (t._id === action.payload._id ? action.payload : t));
}

export function deleteTransaction(currentState: TransactionModel[], action: PayloadAction<string>): TransactionModel[] {
  return currentState.filter((t) => t._id !== action.payload);
}






