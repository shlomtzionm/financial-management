import { Component, OnInit } from '@angular/core';
import { transactionsService } from '../../../services/transactions.service';
import { TransactionModel } from '../../../models/transaction-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{


public constructor(private transactionsServices: transactionsService){}
  
public transactions: TransactionModel[]

async ngOnInit() {
try {
  this.transactions = await this.transactionsServices.getAllTransactions()
} catch (error:any) {
  alert(error.message)
}
}


public async replaceCategoryName(){
try {
  const categories
} catch (error:any) {
alert(error.message)  
}
}


}
