import { Component, inject, OnInit } from "@angular/core";
import { TransactionModel } from "../../../models/transaction-model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { transactionsService } from "../../../services/transactions.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActionMenuComponent } from "../action-menu/action-menu.component";
import { AppState,  store } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";



@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule,ActionMenuComponent],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {

  public transactionsFromRedux = useSelector<AppState, TransactionModel[]>(store => store.transactions);
  public transactionsToDisplay: TransactionModel[] = [];
  // public searchValue: string = "";
  // public isStartDate: string = "arrow_downward";
  // public isStartAmount: boolean = true;

  constructor(private transactionsService: transactionsService) {}

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  async ngOnInit() {
    try {
       await this.transactionsService.getAllTransactions();
       this.transactionsToDisplay = this.transactionsFromRedux
      // await this.replaceCategoryName();
    } catch (error: any) {
      this.openSnackBar("Something went wrong", "X")
    }
  }



  // private async replaceCategoryName() {
  //   try {
  //     const namePromises = this.transactionsToDisplay.map(async (t) => {
  //       t.category = (await this.transactionsService.getCategoryName(t.category)).name;
  //  console.log(t.category);
   
  //     });

  //     await Promise.all(namePromises);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // }

  // public onSortDate() {
  //   this.transactionsToDisplay.sort((a, b) => (this.isStartDate === "arrow_downward" ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime()));
  //   this.isStartDate = this.isStartDate === "arrow_downward" ? "arrow_upward" : "arrow_downward";
  // }

  // public onSortAmount() {
  //   this.transactionsToDisplay.sort((a, b) => (this.isStartAmount ? a.amount - b.amount : b.amount - a.amount));
  //   this.isStartAmount = !this.isStartAmount;
  // }

  // public search(value: string) {
  
  //     this.transactionsToDisplay.filter((t) => {
  //       const lowerCaseValue = value.toLowerCase();
  //       return t.description.toLowerCase().includes(lowerCaseValue) || t.amount.toString().includes(lowerCaseValue) || new Date(t.date).toLocaleDateString().includes(lowerCaseValue);
  //     });
 
  // }

  // public deleteTransaction = async (_id: string) => {
  //   try {
  //       await this.transactionsService.deleteTransaction(_id);
  //     this.transactionsToDisplay.filter((t) => t._id !== _id);

  //       this.openSnackBar("Transaction deleted successfully","X")
  //   } catch (error: any) {
  //     console.log(error);
  //     this.openSnackBar("Something went wrong", "X")
  //   }
  // };



//   public updateTransaction= async(_id:string, transaction: TransactionModel)=> {
//    const updatedTransaction:TransactionModel= await this.transactionsService.updateTransaction(_id, transaction)
//     const index = this.transactionsToDisplay.findIndex(t => t._id === _id);
//     if (index !== -1) {
//   updatedTransaction.category =(await this.transactionsService.getCategoryName(updatedTransaction.category)).name
//       this.transactionsToDisplay[index] = updatedTransaction;
//       this.openSnackBar("well done", "X")
//     } else {
//   this.openSnackBar("something went wrong", "X")
//     }
//   }
}


