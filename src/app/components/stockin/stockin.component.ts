import { StockInModel } from 'Models/StockInLoad';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { VendorService } from 'Services/vendor.service';
import { VendorsModel } from 'Models/VendorsModel';
import { CommonService } from 'Services/common-service';
import {
  debounceTime,
  mergeMapTo,
  mergeMap,
  switchMap,
  catchError
} from 'rxjs/operators';

import { VendorComponent } from '../vendor/vendor.component';
import { stringify } from '@angular/compiler/src/util';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StockinService } from 'Services/stockin.service';
import { UIModel } from 'Models/UIModel';
import {DatePipe} from '@angular/common'

@Component({
  selector: 'app-stockin',
  templateUrl: './stockin.component.html',
  styleUrls: ['./stockin.component.css']
})

export class StockinComponent implements OnInit {
  stockinForm: FormGroup;
  submitted = false;
  vendorList: any;
  options: string[] = ['One', 'Two', 'Three', 'sdf', 'ee', 'aa', 'bb', 'cc', 'ff', 'gg', 'hh'];
  filteredOptions: Observable<string[]>;
  vendorAutoComplete = new FormControl();
  vendorNamesList: VendorsModel[];
  public githubAutoComplete$: Observable<VendorsModel[]> = null;
  public autoCompleteControl = new FormControl();
  vendorId: number;
  loadCount: string;
  isParamRouteInvoked = false;
  stockinId = 0;
  msg = '';
  showMsg = false;


  constructor(private formBuilder: FormBuilder, private vendorService: VendorService,
    private activatedRoute: ActivatedRoute, private stockInService: StockinService) {

  }

  changeClient(data) {
    alert('selected --->' + data.id);
  }

  lookup(value: string): Observable<VendorsModel[]> {
    return this.vendorService.searchVendorNames('Vendor/VendorNames',value.toLowerCase()).pipe(
      // map the item property of the github results as our return object
      map(results => results),
      // catch errors
      // catchError(_ => {
      //   return of();
      // })
    );
  }

  ngOnInit() {
    this.vendorList =
      [
        { id: 10, name: 'vendor1' },
        { id: 11, name: 'vendor2' }
      ];

    // read route parameters
    this.activatedRoute
      .params
      .subscribe(params => {
        console.log('Regular Params:', params);
        if (params) {
          this.stockinId = Number(params['id']) || 0;
          console.log('query string id:-' + this.stockinId)

          if (this.stockinId > 0) {
            this.isParamRouteInvoked = true;
            this.loadEditForm();
          } else {
            this.loadAddForm();
          }          
        }
      });

      if (!this.isParamRouteInvoked) {
        this.loadAddForm();
      }

    this.filteredOptions = this.vendorAutoComplete.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );    

    this.githubAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from github
          return this.lookup(value);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      })
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.stockinForm.controls; }

  loadAddForm() {
    console.log('loadAddForm invoked');
    this.stockinForm = this.formBuilder.group({
      nickName: ['', Validators.required],
      createdDate: ['', [Validators.required, Validators]],
      loadName: ['', [Validators.required, Validators]],
      totalQuantity: [null, [Validators.required, Validators.min(1)]],
    });
  }

  loadEditForm() {
    console.log('loadEditForm invoked');
    console.log(this.stockinId);

    this.stockInService.StockById('StockIn/StockById?id='+ this.stockinId).subscribe((res: StockInModel) => {
      console.log('results from StockById' + res);

      this.vendorId = res.vendorId;
      this.autoCompleteControl.setValue(res.firstName);
      this.autoCompleteControl.disable();
      let dp = new DatePipe(navigator.language);
      let p = 'y-MM-dd'; // YYYY-MM-DD
      let dtr = dp.transform(res.createdDate, p);

      this.stockinForm = this.formBuilder.group({
        nickName: [res.nickName, Validators.required],
        loadName: [res.loadName, [Validators.required, Validators]],        
        createdDate: [dtr, [Validators.required, Validators]],
        totalQuantity: [res.totalQuantity, [Validators.required, Validators.min(1)]],
      });
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
    });

  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    this.submitted = true;
    console.log('submitted true now.....');
    
    let stockinDetails = <StockInModel>(this.stockinForm.value);
    stockinDetails.id = this.stockinId;
    stockinDetails.vendorId = this.vendorId;

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(stockinDetails))
    if (this.stockinForm.invalid) {
      console.log('this.stockinForm.invalid')
      return;
    }

    this.stockInService.saveStock('StockIn/SaveStock', stockinDetails)
    .subscribe((response: UIModel.ResponseInfo) => {
      console.log('response', response);
      console.log(response.isSuccess);
      if (response.isSuccess) {
        if (response.recordId > 0) {
          this.stockinId = response.recordId;
          this.autoCompleteControl.disable();
        }
        this.showMsgAlert('Stockin details saved successfully.', 2000);
      } else {
        this.showMsgAlert('Failed to save Stockin details. Please try again.', 2000);
      }
    }, error => console.error(error));    

  }


  SelectedOption(value: VendorsModel) {
    console.log('SelectedOption----' + value.id);
    
    let count;
    this.stockinForm.controls['nickName'].setValue(value.nickName);
    const nickName = value.nickName;
    this.vendorId = value.id;

    let inputData = new StockInModel();
    inputData.vendorId = value.id;
    inputData.nickName = value.nickName;

    // Load string to be appended to textbox.. below logic is for that..............................
    const countdata =
    this.vendorService.getStockIn_LoadNumberCount('StockIn/StockInCount', inputData).subscribe(res => {
      console.log('results from getStockIn_LoadNumberCount' + res);

      // tslint:disable-next-line:radix
      count = parseInt(res.toString());
      count = count + 1
      console.log('count for number of records at stock in table:-' + count);
      let date: Date = new Date();
      this.stockinForm.controls['loadName'].setValue(nickName + '_Load' + count);

      return count;
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
    });
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

  isNullOrWhiteSpace(value: string) {
    if (value == null || value == undefined || value == '') return true;    
    return value.replace(/\s/g, '').length == 0;
  }

}
