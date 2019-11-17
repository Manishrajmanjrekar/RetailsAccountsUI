import { Injectable } from '@angular/core';


import { Component, OnInit } from '@angular/core';
import { map, tap, catchError, count } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CustomerModel } from 'Models/CustomerModel';
import { environment } from 'environments/environment';
import { VendorsModel } from 'Models/VendorsModel';

import { Observable, of } from 'rxjs';
import { StockInLoad, StockInModel } from 'Models/StockInLoad';

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

  public StockById(url: string): any {
    return this.httpClient.post(this.APIEndpoint + url, httpOptions);
  }

  public searchLoadNames(url: string, query: string): Observable<StockInLoad[]> {
    console.log(this.APIEndpoint + url + 'query:-' + query);

    return this.httpClient
      .post<StockInLoad[]>(this.APIEndpoint + url, {
        q: query, sort: 'stars', order: 'desc'

      })
      .pipe(
        map(res => {
          return res;
        },
          catchError(_ => {
            return of(null);
          })
        ))
  }

  public getStockInList(url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.post(this.APIEndpoint + url, httpOptions);
  }
  
  public saveStock(url: string, data: StockInModel) {
    console.log(this.APIEndpoint + url)
    return this.httpClient.post(this.APIEndpoint + url, data, httpOptions);
  }

}