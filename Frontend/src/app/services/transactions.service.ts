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
        const myFormData = new FormData()

        myFormData.append("date",transaction.date.toString())
        myFormData.append("amount",transaction.amount.toString())
        myFormData.append("category",transaction.category)
        myFormData.append("description",transaction.description)
        myFormData.append("image",transaction.image)
        const observable = this.http.post<TransactionModel>(appConfig.transactionUrl,myFormData);
        const data = await firstValueFrom(observable);
        return data;
    }

    public async deleteTransaction(_id:string):Promise<void> {
        try {
         
        const observable = this.http.delete<void>(appConfig.transactionUrl+_id);
        await firstValueFrom(observable);
      
        } catch (error:any) {
            console.log(error);
            throw error
            
        }   
    }



    public async updateTransaction(_id:string,transaction:TransactionModel) {

        const myFormData = new FormData()

        myFormData.append("_id",transaction._id)
        myFormData.append("amount",transaction.amount.toString())
        myFormData.append("category",transaction.category)
        myFormData.append("date",transaction.date.toString())
        myFormData.append("description",transaction.description)
        myFormData.append("image",transaction.image)
        const observable = this.http.put<TransactionModel>(appConfig.transactionUrl+_id,myFormData);
      const date =  await firstValueFrom(observable);
console.log(date);
      
      return date
    }


    public async getCategoriesSum(){
        const observable = this.http.get(appConfig.categoriesSumUrl)
        const data = await firstValueFrom(observable)
        return data
    }
}
