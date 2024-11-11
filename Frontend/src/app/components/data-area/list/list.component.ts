import { Component, inject, OnInit } from "@angular/core";
import { TransactionModel } from "../../../models/transaction-model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { TransactionsService } from "../../../services/transactions.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActionMenuComponent } from "../action-menu/action-menu.component";
import {  provideStore, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectAllTransactions } from "../../../store/trans.selectores"; // Correct the import name
import { AppState } from "../../../store/app.state";
import { initTransactions } from "../../../store/trans.actions";


@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule
    , ActionMenuComponent],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {

  public transactions$: Observable<TransactionModel[]>;
  public transToDisplay: TransactionModel[] = [];

  public isStartDate: string = "arrow_downward";
  public isStartAmount: boolean = true;
  public searchValue: string = "";
  public loading: boolean = false;
  private _snackBar = inject(MatSnackBar);

  constructor(private transactionsService: TransactionsService, private store: Store<AppState>) {
    this.transactions$ = this.store.select(selectAllTransactions);
  console.log(transactionsService);
  
  }

  async ngOnInit() {
    this.loading = true; // Set loading to true
    console.log("dispatch");
    
    this.store.dispatch(initTransactions()); // Dispatch the action to fetch transactions
    console.log("after dispatch");
  
    // Subscribe to the transactions observable
    this.transactions$.subscribe(
      async (transactions) => {
        if (transactions.length > 0) {
          
          this.transToDisplay = transactions; 
          await this.replaceCategoryNames();
        } else {
          this.openSnackBar("No transactions found", "X");
          console.log(transactions);

        }
        this.loading = false; // Set loading to false when data is processed
      },
      (error) => {
        this.openSnackBar("Something went wrong", "X");
        console.log(error); // Log the error for debugging
        this.loading = false; // Set loading to false on error
      }
    );
  }

  private async replaceCategoryNames() {
    try {
      this.transToDisplay = await Promise.all(this.transToDisplay.map(async (t) => {
        const categoryName = (await this.transactionsService.getCategoryName(t.category)).name;
        return {
          ...t,
          category: categoryName,
        };
      }));
    } catch (error: any) {
      this.openSnackBar("Something went wrong", "X");
      console.log(error);
    }
  }

  public onSortDate() {
    this.transToDisplay.sort((a, b) =>
      this.isStartDate === "arrow_downward" ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.isStartDate = this.isStartDate === "arrow_downward" ? "arrow_upward" : "arrow_downward";
  }

  public onSortAmount() {
    this.transToDisplay.sort((a, b) => (this.isStartAmount ? a.amount - b.amount : b.amount - a.amount));
    this.isStartAmount = !this.isStartAmount;
  }

  public async search(value: string) {
    const lowerCaseValue = value.toLowerCase();
    
    this.transactions$.subscribe(transactions => {
      this.transToDisplay = transactions.filter((t) => {
        return (
          t.description.toLowerCase().includes(lowerCaseValue) ||
          t.amount.toString().includes(lowerCaseValue) ||
          new Date(t.date).toLocaleDateString().includes(lowerCaseValue)
        );
      });
    });
    await this.replaceCategoryNames()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
