import {  provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { transactionsReducer } from './store/trans.reducere';

export const appConfig = {

    providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({ transactions: transactionsReducer }),
],
    transactionUrl: "http://localhost:4000/api/transactions/",
    categoriesUrl: "http://localhost:4000/api/categories/",
    categoriesSumUrl: "http://localhost:4000/api/categories-sum/",

};


