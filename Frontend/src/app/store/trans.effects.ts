import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { transactionsService } from '../services/transactions.service'; // Ensure correct casing for the service
import { initTransactions, initTransactionsFailure, initTransactionsSuccess } from './trans.actions';
import { catchError, map, mergeMap, of, from } from 'rxjs'; // Import 'from'

@Injectable()
export class TransactionsEffects {
    constructor(
        private actions$: Actions, 
        private transactionsService: transactionsService // Corrected casing for the service
    ) {}

    initTransactions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(initTransactions), // Listen for the initTransactions action
            mergeMap(() =>
                from(this.transactionsService.getAllTransactions()).pipe( // Convert Promise to Observable
                    map(transactions => initTransactionsSuccess({ transactions })), // Dispatch success action with transactions
                    catchError(error => of(initTransactionsFailure({ error }))) // Dispatch failure action with error
                )
            )
        )
    );
}