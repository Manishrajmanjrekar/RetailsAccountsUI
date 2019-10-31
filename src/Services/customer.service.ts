import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CustomerModel } from 'Models/CustomerModel';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap, catchError, count } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  test = new CustomerModel();
  APIEndpoint = environment.accountApi;



  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {

  }

  public getContacts(url: string, ) {

    console.log('customerinfo Service call---' + this.APIEndpoint + url);
    this.httpClient.get(this.APIEndpoint + url).subscribe(
      res => {
        this.test.firstName = res['firstName'];
        console.log('res customer get call---- :-' + this.test.firstName);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );

  }

  public AddCustomer(data: string, url: string) {
    // data is after stringfy of formdata........
    // this.AddCustomer(data);
    // var url = 'http://localhost:54436/api/Customer/AddCustomer';
    this.httpClient.post(this.APIEndpoint + url, data, httpOptions).subscribe(res => {

      this.test.firstName = res['firstName'];
      console.log('res ' + this.test.firstName);

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
    });
  }

  public checkIsDuplicateNickName(data: string, url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.post(this.APIEndpoint + url, data, httpOptions);
  }

  public saveCustomer(data: CustomerModel, url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.post(this.APIEndpoint + url, data, httpOptions);
  }

  public getCustomer(url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.get(this.APIEndpoint + url);
  }

  public getCustomerList(url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.get(this.APIEndpoint + url);
  }

  public searchCustomerNames(url: string, query: string): Observable<CustomerModel[]> {
    return this.httpClient
      .post<CustomerModel[]>(this.APIEndpoint + url, {
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

  public getCustomerPurchasedItems(url: string, customerId: string): any {
    const data: string = JSON.stringify(customerId);

    console.log(this.APIEndpoint + url + ' getCustomerPUrchasedItems:-' + data)
    return this.httpClient.post(this.APIEndpoint + url, data, httpOptions);
  }

  public CustomerAmountPaid(url: string, customerId: string): any {
    const data: string = JSON.stringify(customerId);

    console.log(this.APIEndpoint + url + ' CustomerAmountPaid:-' + data)
    return this.httpClient.post(this.APIEndpoint + url, data, httpOptions);
  }


}
