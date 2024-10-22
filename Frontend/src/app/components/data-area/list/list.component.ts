import { Component, inject, OnInit } from "@angular/core";
import { TransactionModel } from "../../../models/transaction-model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { transactionsService } from "../../../services/transactions.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionMenuComponent } from "../action-menu/action-menu.component";
import { Store } from "@ngrx/store";


@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, ActionMenuComponent],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {



  constructor(private transactionsService: transactionsService, private store: Store) {}

  public allTransactions: TransactionModel[] = []


  public transactionsToDisplay: TransactionModel[] = [];

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  async ngOnInit() {
    try {
      await this.transactionsService.getAllTransactions();
    } catch (error: any) {
      this.openSnackBar("Something went wrong", "X");
    }
  }
}