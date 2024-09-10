import {  provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient()
    ],
    transactionUrl: "http://localhost:4000/api/transactions/",
    categoriesUrl: "http://localhost:4000/api/category-name/",

};
