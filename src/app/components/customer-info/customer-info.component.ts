import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CustomerModel } from 'Models/CustomerModel';
import { VendorService } from 'Services/vendor.service';
import { CustomerService } from 'Services/customer.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  _customerService: CustomerService ;
  customerForm: FormGroup;
  submitted = false;
  headers: Headers;

  mobilePattern = '^[6-9][0-9]{9}$';
  test = new CustomerModel();


  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private customerService: CustomerService) {
    this._customerService = customerService;
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(this.mobilePattern)]],
      homePhone: ['', [Validators.required, Validators.pattern(this.mobilePattern)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      nickName: ['', Validators.required],
      referredBy: ['', Validators.required],
      alternateMobile: ['', [Validators.pattern(this.mobilePattern)]],
      email: ['', Validators.required]


  });
  // this.getContacts();
  this._customerService.getContacts('customer');
  }
// convenience getter for easy access to form fields
get f() { return this.customerForm.controls; }

// public getContacts()
//   {
//     this.httpClient.get('http://localhost:54436/api/Vendor').subscribe(
//       res => {
//         this.test.firstName =res["firstName"];
//         console.log('res :-'+ this.test.firstName);
//       },
//       (err: HttpErrorResponse) => {
//         console.log(err.error);
//         console.log(err.name);
//         console.log(err.message);
//         console.log(err.status);
//       }
//     );

//   }

  onSubmit() {
    this.submitted = true;
    console.log('submitted true now.....')
    // stop here if form is invalid
    if (this.customerForm.invalid) {
        return;
    }
    const data = JSON.stringify(this.customerForm.value);
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.vendorForm.value))
    this._customerService.AddCustomer(data, 'Customer/AddCustomer');

   }

  // private AddCustomer(data: string,url:string) {
  //   var url = 'http://localhost:54436/api/Customer/AddCustomer';
  //   this.httpClient.post(url, data, httpOptions).subscribe(res => {
  //     this.test.firstName = res["firstName"];
  //     console.log('res ' + this.test.firstName);
  //   }, (err: HttpErrorResponse) => {
  //     console.log(err.error);
  //     console.log(err.name);
  //     console.log(err.message);
  //     console.log(err.status);
  //   });
  // }
}

