import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TransactionsService } from '../services/transactions.service'; // Ensure correct casing for the service
import { initTransactions, initTransactionsFailure, initTransactionsSuccess } from './trans.actions';
import { catchError, map, mergeMap, of } from 'rxjs'; // Import 'from'

@Injectable()
export class TransactionsEffects {
    constructor(
        private actions$: Actions, 
        private transactionsService: TransactionsService // Corrected casing for the service
    ) { console.log('Actions:', actions$);
        console.log('Transactions Service:', transactionsService);}

        initTransactions$ = createEffect(() =>
            this.actions$.pipe(
                ofType(initTransactions), // Listen for the initTransactions action
                mergeMap(() =>
                    this.transactionsService.getAllTransactions().pipe( // Use the observable directly
                        map(transactions => initTransactionsSuccess({ transactions })), // Dispatch success action with transactions
                        catchError(error => of(initTransactionsFailure({ error }))) // Dispatch failure action with error
                    )
                )
            )
        );
}