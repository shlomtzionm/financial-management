import {  provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig = {

    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideAnimationsAsync()
    ],
    transactionUrl: "http://localhost:4000/api/transactions/",
    categoriesUrl: "http://localhost:4000/api/categories/",
<<<<<<< HEAD
    ImageUrl: "http://localhost:4000/api/transactions/images/"

=======
    categoriesSumUrl: "http://localhost:4000/api/categories-sum/",
>>>>>>> 3b63604196baa38a0883bba005b8549bccd59832

};
