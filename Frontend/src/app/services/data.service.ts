import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../app.config';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    public async getAll___() {
        const observable = this.http.get(appConfig.___url);
        const data = await firstValueFrom(observable);
        return data;
    }
}
