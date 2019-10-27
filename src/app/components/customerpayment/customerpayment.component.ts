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
import { CustomerModel } from 'Models/CustomerModel';
import { CustomerService } from 'Services/customer.service';
import { Sales } from '../model/sales';
import { CustomerAmountPaid } from 'Models/CustomerAmountPaid';
import { CustomerPurchases } from 'Models/CustomerPurchases';
@Component({
  selector: 'app-customerpayment',
  templateUrl: './customerpayment.component.html',
  styleUrls: ['./customerpayment.component.scss']
})
export class CustomerpaymentComponent implements OnInit {
  customerpaymentForm: FormGroup;
  _vendorService: VendorService;
  _customerService:CustomerService
  vendorDetails: VendorsModel;
  customerId:string;

   //sales model and customerPaymentModel
  public SalesdataSource: CustomerPurchases[];
  public CustomerAmountPaidList: CustomerAmountPaid[];

  //sales model and customerPaymentModel
  public SalesdisplayColInfo: UIModel.ColumnInfo[];
  public CustomerPaymentdisplayColInfo: UIModel.ColumnInfo[];

  salesItems: CustomerPurchases[];
  public submitted: boolean = false;

  
 public TotalSalesAmount:number;
 public CustomerPaidAmount:number;
 public BalanceDue:number;

  public accountsAutoComplete$: Observable<VendorsModel[]> = null;
  public autoCompleteControl = new FormControl();
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient, private vendorService: VendorService,private customerService:CustomerService) {
    this._vendorService = vendorService;
    this._customerService=customerService;
  }

  ngOnInit() {
    this.vendorDetails = new VendorsModel();
    this.customerpaymentForm = this.formBuilder.group({
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
    this.SalesdisplayColInfo = [
      { field: 'VendorName', header: 'Vendor Name',hyperlinkField:'' },
      { field: 'CustomerName', header: 'Customer Name', hyperlinkField:'' },
      { field: 'Quantity', header: 'Quantity' },
      { field: 'Price', header: 'Price' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'Total', header: 'Total' },
      { field: 'LoadName', header: 'LoadName' }
    ];

    //set the grid display columns for sales grid...
    this.CustomerPaymentdisplayColInfo = [
      { field: 'Comments', header: 'Comments',hyperlinkField:'' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'AmountPaid', header: 'AmountPaid' },
      { field: 'CustomerName', header: 'Customer Name' },
     
    ];
  }
  get f(){ return this.customerpaymentForm.controls};
  
  lookup(value: string): Observable<CustomerModel[]> {
    return this._customerService.searchCustomerNames('Customer/CustomerNames',value.toLowerCase()).pipe(
      // map the item property of the github results as our return object
      map(results => results),
      // catch errors
      // catchError(_ => {
      //   return of();
      // })
    );
  }
  SelectedOption(value:CustomerModel) {
    console.log('SelectedOption in customerpayment screen..----' + value.id);
    
   
    
   
    this.customerId =JSON.stringify(value.id);
 
    //Get Customer Purchased Items..as per the customerId..............................
    var countdata =  this.customerService.getCustomerPurchasedItems("Customer/CustomerPurchasedItems",this.customerId).subscribe(res => {
      console.log('results from getSalesByStockId'+res);
      this.salesItems=res;
      this.SalesdataSource = res;

      this.TotalSalesAmount = res.reduce((prev, cur) => prev + cur.Total, 0);
       
       console.log('TotalSalesAmount:-'+this.TotalSalesAmount);
      
        }, (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        });;

        //Load Sales expenses grid data as per the Stock Id or LoadId..............................
    var countdata =  this.customerService.CustomerAmountPaid("Customer/CustomerAmountPaid",this.customerId).subscribe(res => {
      console.log('results from CustomerAmountPaid'+res);
      this.CustomerAmountPaidList = res;
      this.CustomerPaidAmount = res.reduce((prev, cur) => prev + cur.AmountPaid, 0);
       
     this.BalanceDue = this.TotalSalesAmount - this.CustomerPaidAmount 

      console.log('BalanceDue:-'+this.BalanceDue);
      
      
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
    console.log('performSearch invoked'+this.salesItems);
    

    this.SalesdataSource =  this.salesItems;
    // filter data
    let filterVal = this.customerpaymentForm.value.CustomerName;
    console.log('performSearch invoked'+filterVal);

    if (filterVal != undefined && filterVal != '') {
      this.SalesdataSource =  this.SalesdataSource.filter(
        item => (item.CustomerName.toLowerCase().indexOf(filterVal.toLowerCase()) !== -1
        || item.Price === filterVal)
        //|| item.lastName.toLowerCase().indexOf(filterVal.toLowerCase()) !== -1)
      )};

    console.log(filterVal);
    console.log('filtered list..');
  }
  

}
