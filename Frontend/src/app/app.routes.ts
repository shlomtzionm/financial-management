import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ListComponent } from './components/data-area/list/list.component';
import { AddComponent } from './components/data-area/add/add.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "list", component: ListComponent },
    { path: "add", component: AddComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    // 404
];
