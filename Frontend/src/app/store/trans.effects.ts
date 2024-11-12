import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TransactionsService } from "../services/transactions.service"; // Ensure correct casing for the service
import { initTransactions, initTransactionsFailure, initTransactionsSuccess } from "./trans.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs"; // Import 'from'

@Injectable()
export class TransactionsEffects  {
  constructor(
    private actions$: Actions,
    private transactionsService: TransactionsService // Corrected casing for the service
  ) {console.log(actions$);
  }

  initTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initTransactions),
      tap(action => console.log('Received action:', action)),  // Log the action to check if it's triggered
      mergeMap(() =>
        this.transactionsService.getAllTransactions().pipe(
          map(transactions => initTransactionsSuccess({ transactions })),
          catchError(error => of(initTransactionsFailure({ error })))
        )
      )
    )
  );
  
}
