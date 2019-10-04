import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  vendorForm: FormGroup;
  submitted = false;

  mobilePattern = "^[6-9][0-9]{9}$";

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
    var obj = this.httpClient.get<string[]>("http://localhost:54436/api/Values");
    console.log(obj[0]);
    alert(obj);
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

  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.vendorForm.value))
 }
}
