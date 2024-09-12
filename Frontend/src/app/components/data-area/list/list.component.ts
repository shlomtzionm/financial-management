import { Component, OnInit } from "@angular/core";
import { TransactionModel } from "../../../models/transaction-model";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { transactionsService } from "../../../services/transactions.service";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
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

  async ngOnInit() {
    try {
      this.transactions = await this.transactionsService.getAllTransactions();
      this.originalTransactions = [...this.transactions];
      await this.replaceCategoryName();
    } catch (error: any) {
      alert(error.message);
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
    this.transactions.sort((a, b) =>
      this.isStartDate === "arrow_downward"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.isStartDate = this.isStartDate === "arrow_downward" ? "arrow_upward" : "arrow_downward";
  }

  public onSortAmount() {
    this.transactions.sort((a, b) =>
      this.isStartAmount
        ? a.amount - b.amount
        : b.amount - a.amount
    );
    this.isStartAmount = !this.isStartAmount;
  }

  public search(value: string) {
    if (value) {
      this.transactions = this.originalTransactions.filter(t => {
        const lowerCaseValue = value.toLowerCase();
        return (
          t.description.toLowerCase().includes(lowerCaseValue) ||
          t.amount.toString().includes(lowerCaseValue) ||
          new Date(t.date).toLocaleDateString().includes(lowerCaseValue)
        );
      });
    } else {
      this.transactions = [...this.originalTransactions];
    }
  }
}
