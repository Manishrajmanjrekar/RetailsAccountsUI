import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { VendorsModel } from 'Models/VendorsModel';
import { VendorService } from 'Services/vendor.service';

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
  _vendorService:VendorService;
  mobilePattern = "^[6-9][0-9]{9}$";
  test = new VendorsModel();
  
  constructor(private formBuilder: FormBuilder,private httpClient: HttpClient,private vendorService:VendorService) { 
    this._vendorService =vendorService;
  }

  ngOnInit() 
  {
    this.vendorForm = this.formBuilder.group({
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

    //this.getContacts();
    this._vendorService.getContacts('Vendor');

   
  }

  
  // public getContacts()
  // {
  //   this.httpClient.get('http://localhost:54436/api/Vendor').subscribe(
  //     res => {
  //       this.test.firstName =res["firstName"];
  //       console.log('res :-'+ this.test.firstName);
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.log(err.error);
  //       console.log(err.name);
  //       console.log(err.message);
  //       console.log(err.status);
  //     }
  //   );

  // }

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
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.vendorForm.value))


    this._vendorService.AddVendor(data,'Vendor/AddVendor');


  // var url='http://localhost:54436/api/Vendor/AddVendor';
  //   this.httpClient.post(url, data,httpOptions).subscribe(
  //     res => {
  //       this.test.firstName =res["firstName"];
  //       console.log('res '+ this.test.firstName);
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.log(err.error);
  //       console.log(err.name);
  //       console.log(err.message);
  //       console.log(err.status);
  //     }
  //   );
 
 }

}
