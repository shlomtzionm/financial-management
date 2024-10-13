import { Component, inject, OnInit } from "@angular/core";
import { TransactionModel } from "../../../models/transaction-model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { transactionsService } from "../../../services/transactions.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActionMenuComponent } from "../action-menu/action-menu.component";
import { appConfig } from "../../../app.config";


@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule,ActionMenuComponent],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {

  public transactions: TransactionModel[] = [];
  private originalTransactions: TransactionModel[] = [];
  public searchValue: string = "";
  public isStartDate: string = "arrow_downward";
  public isStartAmount: boolean = true;

  constructor(private transactionsService: transactionsService) {}

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  async ngOnInit() {
    try {
      this.transactions = await this.transactionsService.getAllTransactions();
      this.originalTransactions = [...this.transactions];
      await this.replaceCategoryName();
    } catch (error: any) {
      this.openSnackBar("Something went wrong", "X")
    }
  }



  private async replaceCategoryName() {
    try {
      const namePromises = this.transactions.map(async (t) => {
        t.category = (await this.transactionsService.getOneCategory(t.category)).name;
      });

      await Promise.all(namePromises);
    } catch (error: any) {
      console.log(error);
    }
  }

  public onSortDate() {
    this.transactions.sort((a, b) => (this.isStartDate === "arrow_downward" ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime()));
    this.isStartDate = this.isStartDate === "arrow_downward" ? "arrow_upward" : "arrow_downward";
  }

  public onSortAmount() {
    this.transactions.sort((a, b) => (this.isStartAmount ? a.amount - b.amount : b.amount - a.amount));
    this.isStartAmount = !this.isStartAmount;
  }

  public search(value: string) {
    if (value) {
      this.transactions = this.originalTransactions.filter((t) => {
        const lowerCaseValue = value.toLowerCase();
        return t.description.toLowerCase().includes(lowerCaseValue) || t.amount.toString().includes(lowerCaseValue) || new Date(t.date).toLocaleDateString().includes(lowerCaseValue);
      });
    } else {
      this.transactions = [...this.originalTransactions];
    }
  }

  public deleteTransaction = async (_id: string) => {
    try {
        await this.transactionsService.deleteTransaction(_id);
        this.transactions = this.transactions.filter((t) => t._id !== _id);

        this.openSnackBar("Transaction deleted successfully","X")
    } catch (error: any) {
      console.log(error);
      this.openSnackBar("Something went wrong", "X")
    }
  };



  public updateTransaction= async(_id:string, transaction: TransactionModel)=> {
   const updatedTransaction:TransactionModel= await this.transactionsService.updateTransaction(_id, transaction)
    const index = this.transactions.findIndex(t => t._id === _id);
    if (index !== -1) {
  updatedTransaction.category =(await this.transactionsService.getOneCategory(updatedTransaction.category)).name
      this.transactions[index] = updatedTransaction;
      this.openSnackBar("well done", "X")
    } else {
  this.openSnackBar("something went wrong", "X")
    }
  }
}
