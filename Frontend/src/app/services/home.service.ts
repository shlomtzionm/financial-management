import { Injectable } from "@angular/core";
import { TransactionsService } from "./transactions.service";
import { combineLatest, map, Observable } from "rxjs";
import { TransactionModel } from "../models/transaction-model";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  public transactions$: Observable<TransactionModel[]>;

  constructor(public transactionsService: TransactionsService) {
   this.transactions$ = this.transactionsService.getAllTransactions();
  }

  public monthlyIncome(): Observable<number> {
    return this.transactions$.pipe(map(trans => trans.reduce((acc, t) => (t.amount > 0 ? acc + t.amount : acc), 0)));
  }

  public monthlyOutcome(): Observable<number> {
    return this.transactions$.pipe(map(trans => trans.reduce((acc, t) => (t.amount < 0 ? acc + t.amount : acc), 0)));
  }

  public monthlySaved(): Observable<number> {
    return combineLatest([this.monthlyIncome(), this.monthlyOutcome()]).pipe(
      map(([income, outcome]) => income + outcome) // Add outcome since it's negative
    );
  }
}
