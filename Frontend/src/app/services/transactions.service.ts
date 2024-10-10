import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../app.config';
import { firstValueFrom } from 'rxjs';
import { TransactionModel } from '../models/transaction-model';
import { categoryModel } from '../models/category-model';

@Injectable({
    providedIn: 'root'
})
export class transactionsService {

    constructor(private http: HttpClient) { }

    public async getAllTransactions() {
        const observable = this.http.get<TransactionModel[]>(appConfig.transactionUrl);
        const data = await firstValueFrom(observable);
        return data;
    }

    
    public async getOneCategory(category:string) {
        const observable = this.http.get<categoryModel>(appConfig.categoriesUrl+category);
        const data = await firstValueFrom(observable);
        return data;
    }


    public async getCategories() {
        const observable = this.http.get<categoryModel[]>(appConfig.categoriesUrl);
        const data = await firstValueFrom(observable);
        return data;
    }

    public async addTransaction(transaction:TransactionModel) {
        const observable = this.http.post<TransactionModel>(appConfig.transactionUrl,transaction);
        const data = await firstValueFrom(observable);
        return data;
    }

    public async getCategoriesSum(){
        const observable = this.http.get<{_id:string,totalAmount:number}[]>(appConfig.categoriesSumUrl)
        const data = await firstValueFrom(observable)
        return data
    }
}
