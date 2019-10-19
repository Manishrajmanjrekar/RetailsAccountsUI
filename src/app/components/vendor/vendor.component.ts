import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlDirective, FormControlName } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { VendorsModel } from 'Models/VendorsModel';
import { VendorService } from 'Services/vendor.service';
import { UIModel } from 'Models/UIModel';
import { ActivatedRoute, Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})

export class VendorComponent implements OnInit {
  vendorForm: FormGroup;
  submitted = false;
  headers: Headers;
  _vendorService: VendorService;
  isParamRouteInvoked = false;
  mobilePattern = '^[6-9][0-9]{9}$';
  isDuplicateNickName = false;
  test = new VendorsModel();
  vendorId = 0;
  vendorDetails: VendorsModel;
  msg = '';
  showMsg = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient, private vendorService: VendorService) {
    this._vendorService = vendorService;
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
    /*this.activatedRoute
      .queryParams
      .subscribe(queryParams => {
        console.log('Query Params:', queryParams);
        if (queryParams){
          this.vendorId = Number(queryParams["id"]) || 0;
        }
        this.loadForm();
      });*/

    this.activatedRoute
      .params
      .subscribe(params => {
        console.log('Regular Params:', params);
        if (params) {
          this.vendorId = Number(params['id']) || 0;
        }

        if (this.vendorId > 0) {
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
    console.log(this.vendorId);

    this.getVendorDetails();
    // this.createFormGroup();
  }

  // create formgroup using formbuilder
  createFormGroup() {
    console.log('createFormGroup invoked');
    if (this.vendorDetails == null) {
      this.vendorDetails = new VendorsModel();
    }
    /*
    this.vendorForm = this.formBuilder.group({
      nickName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(this.mobilePattern)]],
      alternateMobile: ['', [Validators.pattern(this.mobilePattern)]],
      homePhone: ['', Validators.pattern(this.mobilePattern)],
      officePhone: ['', Validators.pattern(this.mobilePattern)],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      shopName: ['', Validators.required],
      shopLocation: ['', Validators.required],
      referredBy: ['']
    });
    */

    this.vendorForm = this.formBuilder.group({
      nickName: [this.vendorDetails.nickName, Validators.required],
      firstName: [this.vendorDetails.firstName, Validators.required],
      middleName: [this.vendorDetails.middleName],
      lastName: [this.vendorDetails.lastName, Validators.required],
      mobile: [this.vendorDetails.mobile, [Validators.required, Validators.pattern(this.mobilePattern)]],
      alternateMobile: [this.vendorDetails.alternateMobile, [Validators.pattern(this.mobilePattern)]],
      homePhone: [this.vendorDetails.homePhone, Validators.pattern(this.mobilePattern)],
      email: [this.vendorDetails.email, [Validators.email]],
      address: [this.vendorDetails.address, Validators.required],
      city: [this.vendorDetails.city, Validators.required],
      state: [this.vendorDetails.state, Validators.required],
      referredBy: [this.vendorDetails.referredBy]
    });

    setTimeout(() => {      
      if (this.vendorDetails.id > 0) {
       this.setElementfocusByIndex(1);
      }
      else {
        this.setElementfocusByIndex(0);
      }
    }, 50);
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

    // stop if duplicate NickName
    console.log('Add vendor checking for DuplicateNickName')
    // this.checkIsDuplicateNickName();
    console.log(this.isDuplicateNickName);

    if (this.isDuplicateNickName) {
      return;
    }

    const data = JSON.stringify(this.vendorForm.value);
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.vendorForm.value));

    this.vendorDetails = <VendorsModel>(this.vendorForm.value);
    this.vendorDetails.id = this.vendorId;

    this._vendorService.saveVendor(this.vendorDetails, 'Vendor/SaveVendor')
      .subscribe((response: UIModel.ResponseInfo) => {
        console.log('response', response);
        console.log(response.isSuccess);
        if (response.isSuccess) {
          this.vendorDetails.id = response.recordId;
          this.vendorId = response.recordId;
          this.showMsgAlert('Vendor details saved successfully.', 2000);
        } else {
          this.showMsgAlert('Failed to save Vendor details. Please try again.', 2000);
        }
      })
  }


  getVendorDetails() {
    if (this.vendorId > 0) {
      this._vendorService.getVendor('Vendor/' + this.vendorId)
        .subscribe((result: VendorsModel) => {
          this.vendorDetails = result;

          if (this.vendorDetails && this.vendorDetails.id > 0) {
            this.createFormGroup();
          } else {
            const msg = 'No details found for Vendor Id: ' + this.vendorId;
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
    const nickNameEntered: string = JSON.stringify(this.vendorForm.value.nickName);
    console.log(nickNameEntered);

    this.isDuplicateNickName = false;
    if (nickNameEntered != null && nickNameEntered.length > 1) {
      this._vendorService.checkIsDuplicateNickName(nickNameEntered, 'Vendor/CheckIsDuplicateNickName')
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
      this.router.navigate(['vendor']);
    }
    else {  
      console.log('resetting form');
      this.vendorId = 0;    
      this.vendorDetails = new VendorsModel();
      this.submitted = false;
      this.isDuplicateNickName = false;           

      this.vendorForm.reset();
      this.vendorForm.markAsUntouched();
      // Object.keys(this.vendorForm.controls).forEach(key => {
      //   this.vendorForm.get(key).clearValidators();
      // });
      setTimeout(() => {this.setElementfocusByIndex(0)},50);
    }
  }

  setElementfocusByIndex(index:number) {
    // set focus on formcontrol element
    console.log('setting focus on element ' + index);
    let firstElement = <any>this.vendorForm.get(Object.keys(this.vendorForm.controls)[index]);
    if (firstElement.nativeElement) firstElement.nativeElement.focus();
  }

}
