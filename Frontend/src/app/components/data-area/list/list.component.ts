import { Component, inject, OnInit } from "@angular/core";
import { TransactionModel } from "../../../models/transaction-model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { TransactionsService } from "../../../services/transactions.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActionMenuComponent } from "../action-menu/action-menu.component";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { initTransactions } from "../../../store/trans.actions";
import { forkJoin, Observable, of, switchMap, map, catchError, distinctUntilChanged, take } from "rxjs";
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

  ngOnInit() {
    this.loading = true; // Set loading to true
    
    this.store.pipe(
      select(selectAllTransactions),
      take(1)  // Only take the first emission
    ).subscribe(transactions => {
      if (transactions.length === 0) {
        this.store.dispatch(initTransactions()); // Dispatch the action only if no transactions are present
      }
    });
  
    this.transToDisplay$ = this.store.pipe(
      select(selectAllTransactions),
      distinctUntilChanged(), // Prevent unnecessary re-emissions if data doesn't change
      switchMap(transactions => {
        return forkJoin(
          transactions.map(t =>
            this.transactionsService.getCategoryName(t.category).pipe(
              map(categoryName => {
                return { ...t, category: categoryName.name };  // Add category name to the transaction
              }),
              catchError(() => of(t))  // Return the original transaction if there's an error fetching category
            )
          )
        );
      })
    );
  
    this.transToDisplay$.subscribe(transactions => {
      console.log('Updated Transactions:', transactions);
      this.loading = false; // Set loading to false when data is available
    });
  }
  
}
