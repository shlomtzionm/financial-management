import { ValidationError } from "../3-models/client-errors";
import { ITransactionModel, TransactionModel } from "../3-models/transaction-model";
import { CategoryModel, ICategoryModel } from "../3-models/category-model";

class TransactionService {
  public getAllTransactions() {
    return TransactionModel.find().exec();
  }

  public addTransactions(transaction: ITransactionModel) {
    const err = transaction.validateSync();
    if (err) {
      console.log(err.message);
      throw new ValidationError(err.message);
    }

    return transaction.save();
  }

  public deleteTransactions(_id: string) {
    TransactionModel.findByIdAndDelete(_id).exec();
  }

  public async updateTransactions(_id: string, transaction: ITransactionModel) {
<<<<<<< HEAD
    const err = transaction.validateSync()
    if(err) throw new ValidationError(err.message)

    return await TransactionModel.findByIdAndUpdate(_id,{$set:transaction},{new:true});
=======
    const existingTransaction = await TransactionModel.findById(_id).exec();

    if (!existingTransaction) {
      throw new ValidationError("We couldn't find this transaction");
    }

    return await TransactionModel.findByIdAndUpdate(_id, transaction, { new: true, runValidators: true }).exec();
>>>>>>> 3b63604196baa38a0883bba005b8549bccd59832
  }

  public async getByCategory(category: string) {
    return await TransactionModel.find({ category }).exec();
  }

<<<<<<< HEAD
  public async getOneCategory(_id: string) {
    return await CategoryModel.findById(_id).select("name").exec();
=======
  public async getCategories() {
    return await CategoryModel.find().exec();
  }

  public async getOneCategory(_id: string) {
    return await CategoryModel.findById(_id).exec();
>>>>>>> 3b63604196baa38a0883bba005b8549bccd59832
  }

  public async getCategories() {
    return await CategoryModel.find().exec();
  }


  public addCategory(category: ICategoryModel) {
    const err = category.validateSync();
    if (err) {
      console.log(err.message);
      throw new ValidationError(err.message);
    }

    return category.save();
  }
<<<<<<< HEAD
=======

  public async getCategoriesSum(){
    const result = await TransactionModel.aggregate([
      {
          $group: {
              _id: "$category",         // Group by category
              totalAmount: { $sum: "$amount" } // Sum the amounts
          }
      }
  ]);

  return result;

  }
>>>>>>> 3b63604196baa38a0883bba005b8549bccd59832
}

export const transactionService = new TransactionService();
