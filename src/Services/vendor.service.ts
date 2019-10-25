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



export class VendorService {
  test = new VendorsModel();
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

  public getVendorData(url: string, ) {

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

  public AddVendor(data: string, url: string) {
    console.log('VendorService---AddVendor');
    // data is after stringfy of formdata........
    // this.AddCustomer(data);
    // var url = 'http://localhost:54436/api/Customer/AddCustomer';
    this.httpClient.post(this.APIEndpoint + url, data, httpOptions).subscribe(res => {
      console.log('VendorService---AddVendor---Success');

      this.test.firstName = res['firstName'];
      console.log('res ' + this.test.firstName);

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
    });
  }

  public searchVendorNames(query: string): Observable<VendorsModel[]> {
    // const url = 'https://api.github.com/search/repositories';
    const url = 'http://localhost:57956/api/Vendor/VendorNames';

    return this.httpClient
      .post<VendorsModel[]>(url, {
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

  public checkIsDuplicateNickName(data: string, url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.post(this.APIEndpoint + url, data, httpOptions);
  }

  public saveVendor(data: VendorsModel, url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.post(this.APIEndpoint + url, data, httpOptions);
  }

  public getVendor(url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.get(this.APIEndpoint + url);
  }

  public getStockIn_LoadNumberCount(url: string, vendorId: number, nickName: string): any {
    // console.log(this.APIEndpoint + url)
    // //number:count;
    const data = JSON.stringify({ Id: vendorId, NickName: nickName });

    return this.httpClient.post(this.APIEndpoint + url, data, httpOptions);
    // console.log('this.APIEndpoint + url '+data);

    //  this.httpClient.post(this.APIEndpoint + url,data,httpOptions).subscribe(res => {
    //   console.log('results from '+this.APIEndpoint + url+' '+res);
    //   var count =  parseInt(res.toString());
    //   console.log('results from '+this.APIEndpoint + url+':--- '+count);

    //        return count;
    //   }, (err: HttpErrorResponse) => {
    //     console.log(err.error);
    //     console.log(err.name);
    //     console.log(err.message);
    //     console.log(err.status);
    //   });
  }

  public AddStock(url: string, data: string) {
    console.log(this.APIEndpoint + url + ' AddStock')
    this.httpClient.post(this.APIEndpoint + url, data, httpOptions).subscribe(res => {
      console.log('AddStock-----Success');
      // console.log('res ' + this.test.firstName);


    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
    });
  }

  public getVendorList(url: string): any {
    console.log(this.APIEndpoint + url);
    return this.httpClient.get(this.APIEndpoint + url);
  }

}
