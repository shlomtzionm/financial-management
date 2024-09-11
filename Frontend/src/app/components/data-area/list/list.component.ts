import { Component, OnInit } from "@angular/core";
import { transactionsService } from "../../../services/transactions.service";
import { TransactionModel } from "../../../models/transaction-model";
import { CommonModule } from "@angular/common";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule],
  providers:[NgbModal],
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

  private isStartDate: boolean = true

  public onSortDate(){
    if(this.isStartDate){
      this.transactions.sort((a,b)=>new Date(a.date).getTime()- new Date(b.date).getTime())
      this.isStartDate =false
    } else {
      this.transactions.sort((a,b)=>new Date(b.date).getTime()- new Date(a.date).getTime())
      this.isStartDate =true
    }
  }


  private isStartAmount: boolean = true

  public onSortAmount(){
    if(this.isStartAmount){
      this.transactions.sort((a,b)=>a.amount- b.amount)
      this.isStartAmount =false
    } else {
      this.transactions.sort((a,b)=>b.amount- a.amount)
      this.isStartAmount =true
    }
  }
  
}
