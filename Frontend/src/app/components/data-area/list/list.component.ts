import { Component, OnInit } from "@angular/core";
import { transactionsService } from "../../../services/transactions.service";
import { TransactionModel } from "../../../models/transaction-model";
import { CommonModule } from "@angular/common";
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.css",
})
export class ListComponent implements OnInit {
  public constructor(private transactionsServices: transactionsService) {}

  public transactions: TransactionModel[] =[]
  private originalTransactions:TransactionModel[] =[] 
  public searchValue: string =""

  async ngOnInit() {
    try {
      this.transactions = await this.transactionsServices.getAllTransactions();
      this.originalTransactions = [...this.transactions]
      this.replaceCategoryName();
    } catch (error: any) {
      alert(error.message);
    }
  }

  public async replaceCategoryName() {
    try {
      const namePromises = this.transactions.map(async (t) => {
        t.category = (await this.transactionsServices.getCategoryName(t.category)).name;
      });

      await Promise.all(namePromises);
      console.log(this.transactions);
    } catch (error: any) {
      console.log(error);
    }
  }

  private isStartDate: boolean = true;

  public onSortDate() {
    if (this.isStartDate) {
      this.transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.isStartDate = false;
    } else {
      this.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.isStartDate = true;
    }
  }

  private isStartAmount: boolean = true;

  public onSortAmount() {
    if (this.isStartAmount) {
      this.transactions.sort((a, b) => a.amount - b.amount);
      this.isStartAmount = false;
    } else {
      this.transactions.sort((a, b) => b.amount - a.amount);
      this.isStartAmount = true;
    }
  }

 

  public search(value: string) {
    if (value) {
      this.transactions = this.originalTransactions.filter(t => {
        const lowerCaseValue = value.toLowerCase();
  
        // Check if the search value matches any of the fields
        return (
          t.description.toLowerCase().includes(lowerCaseValue) ||
          t.amount.toString().includes(lowerCaseValue) || // Search on amount
          new Date(t.date).toLocaleDateString().includes(lowerCaseValue) // Search on date
        );
      });
    } else {
      // Restore original transactions if search value is cleared
      this.transactions = [...this.originalTransactions];
    }
  }
  
  
}
