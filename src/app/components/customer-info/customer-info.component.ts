import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControlDirective, FormControlName } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CustomerModel } from 'Models/CustomerModel';
import { CustomerService } from 'Services/customer.service';
import { UIModel } from 'Models/UIModel';
import { ActivatedRoute, Router } from '@angular/router';

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
    customerForm: FormGroup;
    submitted = false;
    headers: Headers;
    _customerService: CustomerService;
    isParamRouteInvoked = false;
    mobilePattern = '^[6-9][0-9]{9}$';
    isDuplicateNickName = false;
    test = new CustomerModel();
    customerId = 0;
    customerDetails: CustomerModel;
    msg = '';
    showMsg = false;
  
    constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
      private httpClient: HttpClient, private customerService: CustomerService) {
      this._customerService = customerService;
    }
  
    ngOnInit() {
      // adding nativeElement property to FormControl
      const originFormControlNgOnChanges = FormControlDirective.prototype.ngOnChanges;
      FormControlDirective.prototype.ngOnChanges = function () {
          this.form.nativeElement = this.valueAccessor._elementRef.nativeElement;
          return originFormControlNgOnChanges.apply(this, arguments);
      };

      const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
      FormControlName.prototype.ngOnChanges = function () {
          const result = originFormControlNameNgOnChanges.apply(this, arguments);
          this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
          return result;
      };    
  
      // read route parameters
      this.activatedRoute
        .params
        .subscribe(params => {
          console.log('Regular Params:', params);          
          if (params) {
            this.customerId = Number(params['id']) || 0;
          }
  
          if (this.customerId > 0) {
            this.isParamRouteInvoked = true;
            this.loadEditForm();            
          } else {
            this.loadAddForm();
          }
        });
  
      if (!this.isParamRouteInvoked) {
        this.loadAddForm();
      }
    }
  
    loadAddForm() {
      console.log('loadAddForm invoked');
      this.createFormGroup();
    }
  
    loadEditForm() {
      console.log('loadEditForm invoked');
      console.log(this.customerId);
  
      this.getCustomerDetails();
      // this.createFormGroup();
    }
  
    // create formgroup using formbuilder
    createFormGroup() {
      console.log('createFormGroup invoked');
      if (this.customerDetails == null) {
        this.customerDetails = new CustomerModel();
      }

      this.customerForm = this.formBuilder.group({
        nickName: [this.customerDetails.nickName, Validators.required],
        firstName: [this.customerDetails.firstName, Validators.required],
        middleName: [this.customerDetails.middleName],
        lastName: [this.customerDetails.lastName, Validators.required],
        mobile: [this.customerDetails.mobile, [Validators.required, Validators.pattern(this.mobilePattern)]],
        alternateMobile: [this.customerDetails.alternateMobile, [Validators.pattern(this.mobilePattern)]],
        homePhone: [this.customerDetails.homePhone, Validators.pattern(this.mobilePattern)],
        officePhone: [this.customerDetails.officePhone, Validators.pattern(this.mobilePattern)],
        email: [this.customerDetails.email, [Validators.email]],
        address: [this.customerDetails.address, Validators.required],
        city: [this.customerDetails.city, Validators.required],
        state: [this.customerDetails.state, Validators.required],
        shopName: [this.customerDetails.shopName, Validators.required],
        shopLocation: [this.customerDetails.shopLocation, Validators.required],
        referredBy: [this.customerDetails.referredBy]
      });

      setTimeout(() => {      
        if (this.customerDetails.id > 0) {
        this.setElementfocusByIndex(1);
        }
        else {
          this.setElementfocusByIndex(0);
        }
      }, 50);
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.customerForm.controls; }
  
    onSubmit() {
      this.submitted = true;
      console.log('submitted true now.....')
      // stop here if form is invalid
      if (this.customerForm.invalid) {
        return;
      }
  
      // stop if duplicate NickName
      console.log('Add customer checking for DuplicateNickName')
      // this.checkIsDuplicateNickName();
      console.log(this.isDuplicateNickName);
  
      // if (this.isDuplicateNickName) {
      //   return;
      // }
  
      const data = JSON.stringify(this.customerForm.value);
       alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.customerForm.value));
      // this._customerService.AddCustomer(data,'Customer/AddCustomer');
  
      this.customerDetails = <CustomerModel>(this.customerForm.value);
      this.customerDetails.id = this.customerId;

      let postUrl = 'Customer/PostCustomer';
      if (this.customerId > 0)
      {
        postUrl = 'Customer/UpdateCustomer'
      }
  
      this._customerService.saveCustomer(this.customerDetails, postUrl)
        .subscribe((response: UIModel.ResponseInfo) => {
          console.log('response', response);
          console.log(response.isSuccess);
          if (response.isSuccess) {
            this.customerDetails.id = response.recordId;
            this.customerId = response.recordId;
            this.showMsgAlert('Customer details saved successfully.', 2000);
          } else {
            this.showMsgAlert('Failed to save Customer details. Please try again.', 2000);
          }
        })
    }  
  
    getCustomerDetails() {
      if (this.customerId > 0) {
        this._customerService.getCustomer('Customer/GetCustomerById?id=' + this.customerId)
          .subscribe((result: CustomerModel) => {
            this.customerDetails = result;
  
            if (this.customerDetails && this.customerDetails.id > 0) {
              this.createFormGroup();
            } else {
              const msg = 'No details found for Customer Id: ' + this.customerId;
              this.showMsgAlert(msg, 0);
            }
          }, error => console.error(error));
      }
    }
  
    showMsgAlert(msg: string, timeInterval: number) {
      this.msg = msg;
      this.showMsg = true;
  
      if (timeInterval > 0) {
        setTimeout(() => {
          this.showMsg = false;
          this.msg = '';
        }, timeInterval);
      }
    }
  
    checkIsDuplicateNickName() {
      console.log('onNickNameChange raised');
      const nickNameEntered: string = JSON.stringify(this.customerForm.value.nickName);
      console.log(nickNameEntered);
  
      this.isDuplicateNickName = false;
      if (nickNameEntered != null && nickNameEntered.trim().length > 1) {
        this._customerService.checkIsDuplicateNickName(nickNameEntered, 'Customer/CheckIsDuplicateNickName')
          .subscribe((data: boolean) => {
          this.isDuplicateNickName = data;
            console.log(this.isDuplicateNickName);
          });
      }
    }

    clear() {
      console.log('clear function invoked');
      if (this.isParamRouteInvoked) {
        console.log('re-navigating form');
        this.router.navigate(['customer']);
      }
      else {      
        console.log('resetting form');
        this.customerId = 0;
        this.customerDetails = new CustomerModel();
        this.submitted = false;
        this.isDuplicateNickName = false;

        this.customerForm.reset();    
        this.setElementfocusByIndex(0);
      }
    }

    setElementfocusByIndex(index:number) {
      // set focus on formcontrol element
      console.log('setting focus on element ' + index);
      let firstElement = <any>this.customerForm.get(Object.keys(this.customerForm.controls)[index]);
      if (firstElement.nativeElement) firstElement.nativeElement.focus();
    }
  
  }