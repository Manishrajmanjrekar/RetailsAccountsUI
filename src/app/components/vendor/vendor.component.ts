import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { VendorsModel } from 'Models/VendorsModel';
import { VendorService } from 'Services/vendor.service';
import { UIModel } from 'Models/UIModel';
import { ActivatedRoute } from '@angular/router';

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
  mobilePattern = '^[6-9][0-9]{9}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  isDuplicateNickName = false;
  test = new VendorsModel();
  vendorId = 0;
  vendorDetails: VendorsModel;
  msg = '';
  showMsg = false;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient, private vendorService: VendorService) {
    this._vendorService = vendorService;
  }

  ngOnInit() {
    let isParamRouteInvoked = false;

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
        isParamRouteInvoked = true;
        if (params) {
          this.vendorId = Number(params['id']) || 0;
        }

        if (this.vendorId > 0) {
          this.loadEditForm();
        } else {
          this.loadAddForm();
        }
      });

    if (!isParamRouteInvoked) {
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
      middleName: [this.vendorDetails.middleName, Validators.required],
      lastName: [this.vendorDetails.lastName, Validators.required],
      mobile: [this.vendorDetails.mobile, [Validators.required, Validators.pattern(this.mobilePattern)]],
      alternateMobile: [this.vendorDetails.alternateMobile, [Validators.pattern(this.mobilePattern)]],
      homePhone: [this.vendorDetails.homePhone, Validators.pattern(this.mobilePattern)],
      // officePhone: [this.vendorDetails.officePhone, Validators.pattern(this.mobilePattern)],
      // email: [this.vendorDetails.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      email: [this.vendorDetails.email, Validators.required],
      address: [this.vendorDetails.address, Validators.required],
      city: [this.vendorDetails.city, Validators.required],
      state: [this.vendorDetails.state, Validators.required],
      // shopName: [this.vendorDetails.shopName, Validators.required],
      // shopLocation: [this.vendorDetails.shopLocation, Validators.required],
      referredBy: ['']
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

    // stop if duplicate NickName
    console.log('Add vendor checking for DuplicateNickName')
    // this.checkIsDuplicateNickName();
    console.log(this.isDuplicateNickName);

    if (this.isDuplicateNickName) {
      return;
    }

    const data = JSON.stringify(this.vendorForm.value);
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.vendorForm.value));
    // this._vendorService.AddVendor(data,'Vendor/AddVendor');

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

}
