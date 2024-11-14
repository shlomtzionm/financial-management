import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { appConfig } from "../app.config";
import { firstValueFrom, Observable } from "rxjs";
import { TransactionModel } from "../models/transaction-model";
import { categoryModel } from "../models/category-model";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  public getAllTransactions(): Observable<TransactionModel[]> {
    return this.http.get<TransactionModel[]>(appConfig.transactionUrl);
  }

  public getCategoryName(category: string): Observable<categoryModel> {
    return this.http.get<categoryModel>(appConfig.categoriesUrl + category);
  }

  public async getCategories() {
    return this.http.get<categoryModel[]>(appConfig.categoriesUrl);
  }

  public async addTransaction(transaction: TransactionModel) {
    const myFormData = new FormData();
    myFormData.append("date", transaction.date.toString());
    myFormData.append("amount", transaction.amount.toString());
    myFormData.append("category", transaction.category);
    myFormData.append("description", transaction.description);
    myFormData.append("image", transaction.image);
    const observable = this.http.post<TransactionModel>(appConfig.transactionUrl, myFormData);
    const data = await firstValueFrom(observable);
    return data;
  }

  public  deleteTransaction(_id: string): Observable<void> {
    return this.http.delete<void>(appConfig.transactionUrl + _id);
    
  }

  public updateTransaction(_id: string, transaction: TransactionModel):Observable<TransactionModel> {
    const myFormData = new FormData();
    myFormData.append("_id", transaction._id);
    myFormData.append("amount", transaction.amount.toString());
    myFormData.append("category", transaction.category);
    myFormData.append("date", transaction.date.toString());
    myFormData.append("description", transaction.description);
    myFormData.append("image", transaction.image);
    return this.http.put<TransactionModel>(appConfig.transactionUrl + _id, myFormData);
    
  }

  public async getCategoriesSum() {
    const observable = this.http.get<{ _id: string; totalAmount: number }[]>(appConfig.categoriesSumUrl);
    const data = await firstValueFrom(observable);
    return data;
  }
}
