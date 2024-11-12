import { Component, inject, OnInit } from "@angular/core";
import { TransactionModel } from "../../../models/transaction-model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { TransactionsService } from "../../../services/transactions.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActionMenuComponent } from "../action-menu/action-menu.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { initTransactions } from "../../../store/trans.actions";
import { provideEffects } from "@ngrx/effects";
import { TransactionsEffects } from "../../../store/trans.effects";
import { importProvidersFrom } from '@angular/core';
import { Observable, of, switchMap } from "rxjs";
import { selectAllTransactions } from "../../../store/trans.selectores";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, ActionMenuComponent],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {

  public transToDisplay$: Observable<TransactionModel[]>
  public isStartDate: string = "arrow_downward";
  public isStartAmount: boolean = true;
  public searchValue: string = "";
  public loading: boolean = false;
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  constructor(private transactionsService: TransactionsService, private store: Store<AppState>) {}

  async ngOnInit() {
    this.loading = true; // Set loading to true
    this.store.dispatch(initTransactions()); // Dispatch the action to fetch transactions
    this.transToDisplay$ = this.store.select(selectAllTransactions)

    this.transToDisplay$.subscribe(transactions => {
      console.log('Transactions:', transactions);  // Log the actual transactions here
      this.loading = false; // Stop loading once transactions are available
    });
    this.replaceCategoryNames()
    
  }

  private replaceCategoryNames() {
    this.transToDisplay$.pipe(
      switchMap(transactions => {
        return Promise.all(
          transactions.map(async (t) => {
            const categoryName = (await this.transactionsService.getCategoryName(t.category)).name;
            return {
              ...t,
              category: categoryName,
            };
          })
        );
      })
    ).subscribe(
      updatedTransactions => {
        this.transToDisplay$ = of(updatedTransactions); // Update the observable with the new transactions
      },
      error => {
        this.openSnackBar("Something went wrong", "X");
        console.log(error);
      }
    );
  }

  // public onSortDate() {
  //   this.transToDisplay.sort((a, b) => (this.isStartDate === "arrow_downward" ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime()));
  //   this.isStartDate = this.isStartDate === "arrow_downward" ? "arrow_upward" : "arrow_downward";
  // }

  // public onSortAmount() {
  //   this.transToDisplay.sort((a, b) => (this.isStartAmount ? a.amount - b.amount : b.amount - a.amount));
  //   this.isStartAmount = !this.isStartAmount;
  // }

  // public search(value: string) {
  //   const lowerCaseValue = value.toLowerCase();
  //   this.transToDisplay = this.transToDisplay.filter((t) => {
  //     return t.description.toLowerCase().includes(lowerCaseValue) || t.amount.toString().includes(lowerCaseValue) || new Date(t.date).toLocaleDateString().includes(lowerCaseValue);
  //   });
  //   // Update the category names after filtering
  //   this.replaceCategoryNames();
  // }

  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action);
  // }
}