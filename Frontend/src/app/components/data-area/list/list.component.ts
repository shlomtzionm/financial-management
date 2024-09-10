import { Component, OnInit } from "@angular/core";
import { transactionsService } from "../../../services/transactions.service";
import { TransactionModel } from "../../../models/transaction-model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.css",
})
export class ListComponent implements OnInit {
  public constructor(private transactionsServices: transactionsService) {}

  public transactions: TransactionModel[];

  async ngOnInit() {
    try {

      this.transactions = await this.transactionsServices.getAllTransactions();
this.replaceCategoryName()

    } catch (error: any) {
      alert(error.message);
    }
  }

  public async replaceCategoryName() {
    try {
      const namePromises = this.transactions.map(async t => {
        t.category = (await (this.transactionsServices.getCategoryName(t.category))).name;
      });
      
      await Promise.all(namePromises);  
console.log(this.transactions);

    } catch (error: any) {
      console.log(error);
    }
  }
}
