import { ValidationError } from "../3-models/client-errors";
import {
  ITransactionModel,
  TransactionModel,
} from "../3-models/transaction-model";

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

  public updateTransactions(_id: string, transaction:ITransactionModel) {
  }
}

export const transactionService = new TransactionService();
