import { Component, OnInit } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { VendorsModel } from 'Models/VendorsModel';
import { VendorService } from 'Services/vendor.service';
import { UIModel } from 'Models/UIModel';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CommonService } from 'Services/common-service';
import { VendorComponent } from '../vendor/vendor.component';
import { stringify } from '@angular/compiler/src/util';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { StockinService } from 'Services/stockin.service';
import {

  debounceTime,
  mergeMapTo,
  mergeMap,
  switchMap,
  catchError
} from 'rxjs/operators';
import { StockInLoad } from 'Models/StockInLoad';








@Component({
  selector: 'app-vendorpayment',
  templateUrl: './vendorpayment.component.html',
  styleUrls: ['./vendorpayment.component.scss']
})
export class VendorpaymentComponent implements OnInit {
  vendorpaymentForm: FormGroup;
  _vendorService: VendorService;
  _stockInService:StockinService
  vendorDetails: VendorsModel;
  stockId:string;
  public dataSource: StockInLoad[];
  public displayColInfo: UIModel.ColumnInfo[];
  allStockInLoad: StockInLoad[];
  public submitted: boolean = false;
  public VendorExpensesdataSource: StockInLoad[];
  public VendorExpensesdisplayColInfo: UIModel.ColumnInfo[];

  public accountsAutoComplete$: Observable<VendorsModel[]> = null;
  public autoCompleteControl = new FormControl();
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient, private vendorService: VendorService,private stockInService:StockinService) {
    this._vendorService = vendorService;
    this._stockInService=stockInService;
  }

  ngOnInit() {
    this.vendorDetails = new VendorsModel();
    this.vendorpaymentForm = this.formBuilder.group({
      CustomerName: [''],
      firstName: [this.vendorDetails.firstName, Validators.required],
     
     
      
    });

    this.accountsAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
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

    //set the grid display columns for sales grid...
    this.displayColInfo = [
      { field: 'VendorName', header: 'Vendor Name',hyperlinkField:'' },
      { field: 'CustomerName', header: 'Customer Name', hyperlinkField:'' },
      { field: 'Quantity', header: 'Quantity' },
      { field: 'Price', header: 'Price' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'Total', header: 'Total' },
      { field: 'LoadName', header: 'LoadName' }
    ];

    //set the grid display columns for sales grid...
    this.VendorExpensesdisplayColInfo = [
      { field: 'ExpensesCategoryName', header: 'ExpensesCategoryName',hyperlinkField:'' },
      { field: 'VendorName', header: 'VendorName', hyperlinkField:'' },
      { field: 'CreatedDate', header: 'CreatedDate' },
      { field: 'Amount', header: 'Amount' }
     
    ];
  }
  get f(){ return this.vendorpaymentForm.controls};
  
  lookup(value: string): Observable<StockInLoad[]> {
    return this._stockInService.searchLoadNames('StockIn/LoadNames',value.toLowerCase()).pipe(
      // map the item property of the github results as our return object
      map(results => results),
      // catch errors
      // catchError(_ => {
      //   return of();
      // })
    );
  }
  SelectedOption(value:StockInLoad) {
    console.log('SelectedOption in vendorpayment screen..----' + value.StockInId);
    
   
    //var nickName=value.VendorId;
   
    this.stockId =JSON.stringify(value.StockInId);

    //Load Sales grid data as per the Stock Id or LoadId..............................
    var countdata =  this.vendorService.getSalesByStockId("Sales/SalesByStockId",this.stockId).subscribe(res => {
      console.log('results from getSalesByStockId'+res);
      this.allStockInLoad=res;
      this.dataSource = res;

      
      
        }, (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        });;

        //Load Sales expenses grid data as per the Stock Id or LoadId..............................
    var countdata =  this.vendorService.getExpensesByStockId("VendorExpenses/VendorExpensesByStockInId",this.stockId).subscribe(res => {
      console.log('results from getExpensesByStockId'+res);
      this.VendorExpensesdataSource = res;

      
      
        }, (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        });;

  }

  performSearch(){
    console.log('performSearch invoked');
    this.submitted = true;

    // if (this.vendorpaymentForm.invalid) {
    //   return;
    // }
    console.log('performSearch invoked'+this.allStockInLoad);
    

    this.dataSource =  this.allStockInLoad;
    // filter data
    let filterVal = this.vendorpaymentForm.value.CustomerName;
    console.log('performSearch invoked'+filterVal);

    if (filterVal != undefined && filterVal != '') {
      this.dataSource =  this.dataSource.filter(
        item => (item.CustomerName.toLowerCase().indexOf(filterVal.toLowerCase()) !== -1
        || item.Price === filterVal)
        //|| item.lastName.toLowerCase().indexOf(filterVal.toLowerCase()) !== -1)
      )};

    console.log(filterVal);
    console.log('filtered list..');
  }
  

}
