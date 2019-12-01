import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CustomerModel } from 'Models/CustomerModel';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    //'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})


export class CommonService {

  APIEndpoint = environment.accountApi;
  constructor(private httpClient: HttpClient) { }

  // search(query: string,url:string): Observable<any[]> {
  //   //const url = 'https://api.github.com/search/repositories';
  //   //const url = 'http://localhost:57956/api/Vendor/VendorNames';

  //   return this.httpClient
  //     .post<any[]>(this.APIEndpoint+url, { q:query, sort: 'stars', order: 'desc' })
  //     .pipe(
  //       map(res => {
  //         return res;
  //       })
  //     );
  // }

  public get(url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.get(this.APIEndpoint + url);
  }

  public post(data: any, url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.post(this.APIEndpoint + url, data, httpOptions);
  } 

  public postUrl(url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.post(this.APIEndpoint + url, httpOptions);
  } 

}
