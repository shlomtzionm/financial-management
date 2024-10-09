import express, { NextFunction, Request, Response } from "express";
import { transactionService } from "../4-services/transaction-service";
import { TransactionModel } from "../3-models/transaction-model";
import { StatusCode } from "../3-models/enums";
import mongoose from "mongoose";
import { CategoryModel } from "../3-models/category-model";
import { UploadedFile } from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";

class TransactionsController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/transactions", this.getAllTransaction);
    this.router.post("/transactions", this.addTransaction);
    this.router.post("/categories", this.addCategory);
    this.router.delete("/transactions/:_id", this.deleteTransaction);
    this.router.put("/transactions/:_id", this.updateTransaction);
    this.router.get("/transactions-by-category/:_id", this.getByCategory);
    this.router.get("/categories/:_id", this.getOneCategory);
    this.router.get("/categories", this.getCategories);
    this.router.get("/transactions/images/:imageName", this.getTransactionImage);
  }

  private async getAllTransaction(request: Request, response: Response, next: NextFunction) {
    try {
      const data = await transactionService.getAllTransactions();
      response.json(data);
    } catch (err: any) {
      next(err);
    }
  }

  private async addTransaction(request: Request, response: Response, next: NextFunction) {
    try {
      const file = request.files?.image as UploadedFile;
      if (file) request.body.imageName = await fileSaver.add(file);

      const transaction = new TransactionModel(request.body);
      const addedTransaction = await transactionService.addTransactions(transaction);
      response.status(StatusCode.Created).json(addedTransaction);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteTransaction(request: Request, response: Response, next: NextFunction) {
    try {
      const _id = request.params._id;
      const transactionToDelete = await TransactionModel.findById(_id);
      const imageName = transactionToDelete.imageName;

      fileSaver.delete(imageName);
      transactionService.deleteTransactions(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }

  public async getTransactionImage(request: Request, response: Response, next: NextFunction) {
    try {
      const imageName = request.params.imageName;
      const imagePath = fileSaver.getFilePath(imageName, true);
      response.sendFile(imagePath);
    } catch (error: any) {
      next(error);
    }
  }

  public async updateTransaction(req: Request, res: Response, next: NextFunction) {
    try {
    if(req.files) req.body.imageName = await fileSaver.add(req.files.image as UploadedFile)
      const _id = req.params._id;
      const transaction = new TransactionModel(req.body);

      const updatedTransaction = await transactionService.updateTransactions(_id, transaction);

      res.json(updatedTransaction);
      console.log((updatedTransaction));
      
    } catch (error) {
      next(error);
    }
  }

  private async getByCategory(request: Request, response: Response, next: NextFunction) {
    try {
      const category = request.params._id;
      const transactions = await transactionService.getByCategory(category);
      response.status(StatusCode.OK).send(transactions);
    } catch (err: any) {
      next(err);
    }
  }

  private async getOneCategory(request: Request, response: Response, next: NextFunction) {
    try {
      const _id = request.params._id;
      const category = await transactionService.getOneCategory(_id);
      response.status(StatusCode.OK).send(category);
    } catch (err: any) {
      next(err);
    }
  }

  private async getCategories(request: Request, response: Response, next: NextFunction) {
    try {
      const categories = await transactionService.getCategories();
      response.status(StatusCode.OK).send(categories);
    } catch (err: any) {
      next(err);
    }
  }

  private async addCategory(request: Request, response: Response, next: NextFunction) {
    try {
      const category = new CategoryModel(request.body);
      const addedCategory = await transactionService.addCategory(category);
      response.status(StatusCode.Created).json(addedCategory);
    } catch (err: any) {
      next(err);
    }
  }
}

const TransactionController = new TransactionsController();
export const transactionRouter = TransactionController.router;
