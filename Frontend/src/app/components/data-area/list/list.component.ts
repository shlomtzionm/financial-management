import { Component, inject, OnInit } from "@angular/core";
import { TransactionModel } from "../../../models/transaction-model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { TransactionsService } from "../../../services/transactions.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { initTransactions } from "../../../store/trans.actions";
import { forkJoin, of, map, catchError, take, BehaviorSubject } from "rxjs";
import { selectAllTransactions } from "../../../store/trans.selectors";
import { ListService } from "../../../services/list.service";
import { transition } from "@angular/animations";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  public transToDisplay$: BehaviorSubject<TransactionModel[]> = new BehaviorSubject<TransactionModel[]>([]);
  
  public isStartDate: boolean = true;
  public isStartAmount: boolean = true;
  public searchValue: string = "";

  constructor(
    private transactionsService: TransactionsService,
    private store: Store<AppState>,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.store.pipe(select(selectAllTransactions), take(1)).subscribe((transactions) => {
      if (transactions.length === 0) {
        this.store.dispatch(initTransactions());
      }
    });

    this.store.pipe(select(selectAllTransactions)).subscribe((transactions) => {
      forkJoin(
        transactions.map((t) =>
          this.transactionsService.getCategoryName(t.category).pipe(
            map((categoryName) => ({ ...t, category: categoryName.name })),
            catchError(() => of(t)) 
          )
        )
      ).subscribe((updatedTransactions) => {
        this.transToDisplay$.next(updatedTransactions); 
      });
    });
  }

 

  public onSortAmount() {
    const sortedTransactions = this.listService.sortByAmount(
      this.transToDisplay$.getValue(), 
      this.isStartAmount
    );
    this.isStartAmount = !this.isStartAmount; 
    this.transToDisplay$.next(sortedTransactions); 
  }


  public onSortDate() {
    const sortedTransactions = this.listService.sortByDate(
      this.transToDisplay$.getValue(), 
      this.isStartDate
    );
    this.isStartDate = !this.isStartDate; 
    this.transToDisplay$.next(sortedTransactions); 
  }

  public onSearch() {
    // Get transactions from the store
    this.store.pipe(select(selectAllTransactions)).subscribe(async (transactions) => {
      
      // First, we need to fetch the updated category names asynchronously
      const updatedTransactions = await Promise.all(
        transactions.map(async (transaction) => {
          try {
            const categoryName = await this.transactionsService.getCategoryName(transaction.category).toPromise();
            return { ...transaction, category: categoryName.name }; // Update the category
          } catch (error) {
            return { ...transaction }; // In case of error, return the original transaction
          }
        })
      );
  
      // Now, filter the transactions based on the search value
      const filteredTransactions = updatedTransactions.filter((transaction) => {
        return this.listService.search(transaction, this.searchValue);
      });
  
      // Update transToDisplay$ with the filtered transactions
      this.transToDisplay$.next(filteredTransactions);
    });
  }
  
  

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
