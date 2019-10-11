import { Injectable } from '@angular/core';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CustomerModel } from 'Models/CustomerModel';
import { environment } from 'environments/environment';
import { VendorsModel } from 'Models/VendorsModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    //'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})



export class VendorService {
  test = new VendorsModel();
  APIEndpoint = environment.accountApi;

  constructor(private httpClient: HttpClient,private formBuilder: FormBuilder) {
   
   }

   public getContacts(url:string,)
  {
    
    console.log('customerinfo Service call---'+this.APIEndpoint+url);
    this.httpClient.get(this.APIEndpoint+url).subscribe(
      res => {
        this.test.firstName =res["firstName"];
        console.log('res customer get call---- :-'+ this.test.firstName);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );

  }

  public AddVendor(data: string,url:string) {
    console.log('VendorService---AddVendor');
   //data is after stringfy of formdata........
    //this.AddCustomer(data);
    //var url = 'http://localhost:54436/api/Customer/AddCustomer';
    this.httpClient.post(this.APIEndpoint+url, data, httpOptions).subscribe(res => {
      console.log('VendorService---AddVendor---Success');

      this.test.firstName = res["firstName"];
      console.log('res ' + this.test.firstName);

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
    });
  }
}
