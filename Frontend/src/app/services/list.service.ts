import { Injectable } from "@angular/core";
import { TransactionModel } from "../models/transaction-model";

@Injectable({
  providedIn: "root",
})
export class ListService {
  constructor() {}

  // Sort transactions by amount
  public sortByAmount(transactions: TransactionModel[], arrow: boolean): TransactionModel[] {
    return transactions.sort((a, b) => {
      return arrow ? a.amount - b.amount : b.amount - a.amount;
    });
  }

  // Sort transactions by date
  public sortByDate(transactions: TransactionModel[], arrow: boolean): TransactionModel[] {
    return transactions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return arrow ? dateA - dateB : dateB - dateA;
    });
  }

  public search(transaction: TransactionModel, searchValue: string):boolean{
    return (
      transaction.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchValue.toLowerCase()) ||
      transaction.amount.toString().includes(searchValue)
    );
  }

}
