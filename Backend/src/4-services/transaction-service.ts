import { log } from "console";
import { ValidationError } from "../3-models/client-errors";
import {
  ITransactionModel,
  TransactionModel,
} from "../3-models/transaction-model";
import { ObjectId } from "mongoose";
import { CategoryModel, ICategoryModel } from "../3-models/category-model";

class TransactionService {
  public getAllTransactions() {
    return TransactionModel.find().exec();
  }

  public addTransactions(transaction: ITransactionModel) {
    
    const err = transaction.validateSync();
    if (err) {console.log(err.message);
     throw new ValidationError(err.message);}

    return transaction.save();
  }


  public deleteTransactions(_id: string) {
    TransactionModel.findByIdAndDelete(_id).exec()
  }

  public async updateTransactions(_id: string, transaction: ITransactionModel) {
      const existingTransaction = await TransactionModel.findById(_id).exec();
      
      if (!existingTransaction) {
        throw new ValidationError("We couldn't find this transaction");
      }
  
      return await TransactionModel.findByIdAndUpdate(_id, transaction, { new: true, runValidators: true }).exec();
   
  }
    

  public async getByCategory(category: string) {
    return await TransactionModel.find({ category }).exec();
  }
  
  public async getCategories(){
    return await CategoryModel.find().exec()
  }

  public async getOneCategory(_id:string){
    return await CategoryModel.findById(_id).exec()
  }

  public addCategory(category: ICategoryModel) {
    
    const err = category.validateSync();
    if (err) {console.log(err.message);
     throw new ValidationError(err.message);}

    return category.save();
  }




}

export const transactionService = new TransactionService();
