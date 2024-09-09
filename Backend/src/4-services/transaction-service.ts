import { log } from "console";
import { ValidationError } from "../3-models/client-errors";
import {
  ITransactionModel,
  TransactionModel,
} from "../3-models/transaction-model";
import { ObjectId } from "mongoose";

class TransactionService {
  public getAllTransactions() {
    return TransactionModel.find().populate("category").exec();
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
    

  public async getByCategory(category: ObjectId) {
    return await TransactionModel.find({ category: category }).exec();
  }
            

}

export const transactionService = new TransactionService();
