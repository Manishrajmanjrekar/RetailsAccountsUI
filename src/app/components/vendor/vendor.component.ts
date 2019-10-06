import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { VendorsModel } from 'Models/VendorsModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    //'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})



export class VendorComponent implements OnInit 


{
  
  vendorForm: FormGroup;
  submitted = false;
  headers: Headers;

  mobilePattern = "^[6-9][0-9]{9}$";
  test = new VendorsModel();
  
  constructor(private formBuilder: FormBuilder,private httpClient: HttpClient) { }

  ngOnInit() {
    this.vendorForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      referredBy: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(this.mobilePattern)]],
      alternateMobile: ['', [Validators.pattern(this.mobilePattern)]],
    });
    this.getContacts();

   
  }

  
  public getContacts(){
    

    this.httpClient.get('http://localhost:54436/api/Vendor').subscribe(data => {
      console.log(data);
    });
  }

  // convenience getter for easy access to form fields
 get f() { return this.vendorForm.controls; }

 onSubmit() {
  this.submitted = true;
  console.log('submitted true now.....')
  // stop here if form is invalid
  if (this.vendorForm.invalid) {
      return;


  }
 var data =JSON.stringify(this.vendorForm.value);
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.vendorForm.value))
 var url='http://localhost:54436/api/Vendor/AddVendor';


     
  this.httpClient.post(url, data,httpOptions).subscribe(
    res => {
      this.test.name =res["name"];
      console.log('res'+ this.test.name);
    },
    (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
    }
  );
 
 }
}
