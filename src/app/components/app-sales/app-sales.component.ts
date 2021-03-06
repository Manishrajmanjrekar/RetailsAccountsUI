import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VendorsModel } from 'Models/VendorsModel';
import { Observable, of } from 'rxjs';
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { VendorService } from 'Services/vendor.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-sales',
  templateUrl: './app-sales.component.html',
  styleUrls: ['./app-sales.component.css']
})

export class AppSalesComponent implements OnInit {
  // tslint:disable-next-line:variable-name

  _ref: any;
  public sale: Sale;
  public addedSales: Sale[] = [];
  public selectedStockIns:  string[]
  public selectedStockIn: string;
  public githubAutoComplete$: Observable<VendorsModel[]> = null;
  public autoCompleteControl = new FormControl();
  stockIns: any[] = [
   {stockName: 'Load-santhosh', Quantity: 122},
   {stockName: 'Load-prashanth', Quantity: 100},
   {stockName: 'Load-manish', Quantity: 200},
  ];
  public displayColInfo: any[];
  displayedColumns = ['vendorNames', 'stockName', 'Price', 'Quantity', 'Total', 'action'];
  dataSource = new MatTableDataSource<Sale>(this.addedSales);

  constructor(private vendorService: VendorService) {

  }

  removeObject() {
    this._ref.destroy();
  }
  ngOnInit() {
    this.selectedStockIns = this.stockIns;
    // this.sales = new Sale();
    // this.sales.vendorNames = [
    //   { id: 1, name: 'rams' },
    //   { id: 2, name: 'ganesha....' },

    // ];
    // this.sales.customerNames = [
    //   { id: 1, name: 'rams' },
    //   { id: 2, name: 'ganesha....' },

    // ];
    this.sale = new Sale();

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
  save() {
    // alert('Saved Successfully!');
    if (this.sale.vendorNames) {
    const sales = new Sale();
    sales.stockName = this.sale.stockName;
    sales.vendorNames = this.sale.vendorNames;
    sales.Price = this.sale.Price;
    sales.Quantity = this.sale.Quantity;
    sales.Total = this.sale.Total;
    this.addedSales.push(sales);
    this.dataSource = new MatTableDataSource<Sale>(this.addedSales);
    this.sale = new Sale();

    }
  }

  cancel() {
    this.sale = new Sale();
  }

  UpdateData(sale) {
    this.sale = sale;
  }

  // addComponent() {
  //   const saledata = new Sale();
  //     this.newSales.push(saledata);
  // }

  calculate(event, sale: Sale) {
    sale.Total = sale.Price * sale.Quantity;
  }

  // removeSale(event, index) {
  //   if (confirm('Are you sure to remove the sale?')) {
  //     this.newSales.splice(index, 1);
  //   }
  // }

  SelectedOption() {}

  onKey(value) {
    console.log(this.selectedStockIn);
    this.selectedStockIns = this.search(value);
    }

  search(value: string) {
    const filter = value.toLowerCase();
    return this.stockIns.filter(option => option.toLowerCase().startsWith(filter));
  }

  lookup(value: string): Observable<VendorsModel[]> {
    return this.vendorService.searchVendorNames('/Vendor/VendorNames', value.toLowerCase()).pipe(
      // map the item property of the github results as our return object
      map(results => results),
      // catch errors
      // catchError(_ => {
      //   return of();
      // })
    );
  }
}

export class Sale {
  public vendorNames: string;
  public customerNames: string;
  public Price: number;
  public Quantity: number;
  public Total: number;
  public stockName: string;

}
