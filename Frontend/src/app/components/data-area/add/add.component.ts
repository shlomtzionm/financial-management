import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { categoryModel } from '../../../models/category-model';
import { transactionsService } from '../../../services/transactions.service';
import { CommonModule } from '@angular/common';
import { TransactionModel } from '../../../models/transaction-model';
import { Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [MatIconModule,MatDatepickerModule,FormsModule,CommonModule,MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class AddComponent implements OnInit {

public constructor(private transactionsServices: transactionsService,private router: Router){}

public categories: categoryModel[]
public transaction = new TransactionModel()

public currentDate:string

private _snackBar = inject(MatSnackBar);

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action);
}

public async ngOnInit(){
  try {
    this.categories = await this.transactionsServices.getCategories()
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  } catch (error:any) {
    this.openSnackBar("Something went wrong", "X")
    
    
  }
}

public async send(){
  try {
    await this.transactionsServices.addTransaction(this.transaction)
    this.openSnackBar("You added a transaction", "X")
    this.router.navigateByUrl("/list")
  } catch (error:any) {
    this.openSnackBar("Something went wrong", "X")
    
  }
}


}
