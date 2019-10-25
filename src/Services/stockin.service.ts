import { Injectable } from '@angular/core';


import { Component, OnInit } from '@angular/core';
import { map, tap, catchError, count } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CustomerModel } from 'Models/CustomerModel';
import { environment } from 'environments/environment';
import { VendorsModel } from 'Models/VendorsModel';

import { Observable, of } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': 'my-auth-token'
    })
};

@Injectable({
    providedIn: 'root'
})
export class StockinService {
    APIEndpoint = environment.accountApi;
    constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {

    }

    public StockById(url: string, id: number): any {
        console.log(this.APIEndpoint + url + id);
        const data: string = JSON.stringify(id);
        return this.httpClient.post(this.APIEndpoint + url, data, httpOptions);
    }
}
