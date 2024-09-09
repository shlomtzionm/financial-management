import express, { NextFunction, Request, Response } from "express";
import { transactionService } from "../4-services/transaction-service";
import { TransactionModel } from "../3-models/transaction-model";
import { StatusCode } from "../3-models/enums";

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
        this.router.delete("/transactions/:_id", this.deleteTransaction);
    }

    private async getAllTransaction(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await transactionService.getAllTransactions();
            response.json(data);
        }
        catch (err: any) { next(err); }
    }


    private async addTransaction(request: Request, response: Response, next: NextFunction) {
        try {
            const transaction = new TransactionModel(request.body);
            const addedTransaction = await transactionService.addTransactions(transaction);
            response.status(StatusCode.Created).json(addedTransaction);
        }
        catch (err: any) { next(err); }
    }

    private deleteTransaction(request: Request, response: Response, next: NextFunction) {
        try {
            const _id = request.params._id
            transactionService.deleteTransactions(_id)
            response.sendStatus(StatusCode.NoContent);
        }
        catch (err: any) { next(err); }
    }




}



const TransactionController = new TransactionsController();
export const transactionRouter = TransactionController.router;
