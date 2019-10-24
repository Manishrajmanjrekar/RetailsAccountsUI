import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControlDirective, FormControlName } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'Services/common-service';
import { UIModel } from 'Models/UIModel';
import { ActivatedRoute, Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Component({
  selector: 'app-expenses-category',
  templateUrl: './expenses-category.component.html',
  styleUrls: ['./expenses-category.component.css']
})
export class ExpensesCategoryComponent implements OnInit {ng  
expensesTypeId_Vendor: number = UIModel.ExpensesTypeEnum.Vendor;
expensesTypeId_CommissionAgent: number = UIModel.ExpensesTypeEnum.CommissionAgent;

    expensesCategoryForm: FormGroup;
    submitted = false;
    headers: Headers;
    _commonService: CommonService;
    isParamRouteInvoked = false;
    isDuplicateName = false;
    expensesCategoryId = 0;
    expensesCategoryDetails: UIModel.ExpensesCategoryModel;
    expensesTypes:any[];
    msg = '';
    showMsg = false;
    defaultExpenseTypeId = UIModel.ExpensesTypeEnum.Vendor;
  
    constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
      private httpClient: HttpClient, private commonService: CommonService) {
      this._commonService = commonService;
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

      console.log('getting expenses types..');
      this._commonService.get('ExpensesTypes')
      .subscribe((result: UIModel.ExpensesTypeModel[]) => {
        console.log('fetched ExpensesTypes successfully');      
        this.expensesTypes = result;
      }, error => console.error(error));

      // read route parameters
      this.activatedRoute
        .params
        .subscribe(params => {
          console.log('Regular Params:', params);          
          if (params) {
            this.expensesCategoryId = Number(params['id']) || 0;
          }
  
          if (this.expensesCategoryId > 0) {
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
      console.log(this.expensesCategoryId);
  
      this.getExpensesCategoryDetails();
      // this.createFormGroup();
    }
  
    // create formgroup using formbuilder
    createFormGroup() {
      console.log('createFormGroup invoked');
      if (this.expensesCategoryDetails == null) {
        this.expensesCategoryDetails = new UIModel.ExpensesCategoryModel();
      }

      this.expensesCategoryForm = this.formBuilder.group({
        name: [this.expensesCategoryDetails.name, Validators.required],
        expensesTypeId: [this.defaultExpenseTypeId > 0 ? this.defaultExpenseTypeId : '', Validators.required]
      });

      setTimeout(() => {      
          this.setElementfocusByIndex(0);
      }, 50);
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.expensesCategoryForm.controls; }
  
    onSubmit() {
      this.submitted = true;
      console.log('submitted true now.....')
      // stop here if form is invalid
      if (this.expensesCategoryForm.invalid) {
        return;
      }
  
      // stop if duplicate Name
      console.log('Add expensesCategory checking for Duplicate Name')
      this.checkIsDuplicateName();
      console.log(this.isDuplicateName);
  
      if (this.isDuplicateName) {
        console.log('found duplicate');
        return;
      }
  
      //const data = JSON.stringify(this.expensesCategoryForm.value);
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.expensesCategoryForm.value));
      
      this.expensesCategoryDetails = <UIModel.ExpensesCategoryModel>(this.expensesCategoryForm.value);
      this.expensesCategoryDetails.id = this.expensesCategoryId;
      
      this._commonService.post(this.expensesCategoryDetails, 'ExpensesCategory/SaveExpensesCategory')
      .subscribe((response: UIModel.ResponseInfo) => {
        console.log('response', response);
        console.log(response.isSuccess);
        if (response.isSuccess) {
          //this.expensesCategoryDetails.id = response.recordId;
          //this.expensesCategoryId = response.recordId;
          this.clear();
          this.showMsgAlert('ExpensesCategory details saved successfully.', 2000);
        } else {
          this.showMsgAlert('Failed to save ExpensesCategory details. Please try again.', 2000);
        }
      })
      
    }  
  
    getExpensesCategoryDetails() {
      if (this.expensesCategoryId > 0) {
        this._commonService.get('ExpensesCategory/' + this.expensesCategoryId)
          .subscribe((result: UIModel.ExpensesCategoryModel) => {
            this.expensesCategoryDetails = result;
  
            if (this.expensesCategoryDetails && this.expensesCategoryDetails.id > 0) {
              this.createFormGroup();
            } else {
              const msg = 'No details found for ExpensesCategory Id: ' + this.expensesCategoryId;
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
  
    checkIsDuplicateName() {
      console.log('checkIsDuplicateName raised');
      let nameEntered: string = this.expensesCategoryForm.value.name;
      let filterExpensesTypeId = Number(this.expensesCategoryForm.value.expensesTypeId);
      console.log(nameEntered);

      if (nameEntered != null && nameEntered.length > 0 && filterExpensesTypeId > 0) {
        const inputData = {
          name: nameEntered,
          expensesTypeId: filterExpensesTypeId,
          id: this.expensesCategoryId
        }
        var jsonInput = JSON.stringify(inputData);
        this._commonService.post(jsonInput, 'ExpensesCategory/CheckIsDuplicate')
          .subscribe((data: boolean) => {
          this.isDuplicateName = data;
            console.log(this.isDuplicateName);
          }, error => console.error(error));
      }
    }

    clear() {
      console.log('clear function invoked');
      if (this.isParamRouteInvoked) {
        console.log('re-navigating form');
        this.router.navigate(['expensesCategory']);
      }
      else {      
        console.log('resetting form');
        this.expensesCategoryId = 0;
        this.expensesCategoryDetails = new UIModel.ExpensesCategoryModel();
        this.submitted = false;
        this.isDuplicateName = false;

        this.expensesCategoryForm.reset();    
        this.createFormGroup();
        this.setElementfocusByIndex(0);
      }
    }

    setElementfocusByIndex(index:number) {
      // set focus on formcontrol element
      console.log('setting focus on element ' + index);
      let firstElement = <any>this.expensesCategoryForm.get(Object.keys(this.expensesCategoryForm.controls)[index]);
      if (firstElement.nativeElement) firstElement.nativeElement.focus();
    } 
  }