import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sales',
  templateUrl: './app-sales.component.html',
  styleUrls: ['./app-sales.component.css']
})

export class AppSalesComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  _ref: any;
  public sales: Sale;
  public newSales: Sale[] = [];
  public selectedStockIns:  string[]
  public selectedStockIn: string;
  stockIns: any[] = [
   {stockName: 'Load-santhosh', Quantity: 122},
   {stockName: 'Load-prashanth', Quantity: 100},
   {stockName: 'Load-manish', Quantity: 200},
  ];

  removeObject() {
    this._ref.destroy();
  }
  ngOnInit() {
    this.selectedStockIns = this.stockIns;
    this.sales = new Sale();
    this.sales.vendorNames = [
      { id: 1, name: 'rams' },
      { id: 2, name: 'ganesha....' },

    ];
    this.sales.customerNames = [
      { id: 1, name: 'rams' },
      { id: 2, name: 'ganesha....' },

    ];
    const saledata = new Sale();
    this.newSales.push(saledata);
  }
  save() {
    alert('Saved Successfully!');
  }

  addComponent() {
    const saledata = new Sale();
      this.newSales.push(saledata);
  }

  calculate(event, sale: Sale) {
    sale.Total = sale.Price * sale.Quantity;
  }

  removeSale(event, index) {
    if (confirm('Are you sure to remove the sale?')) {
      this.newSales.splice(index, 1);
    }
  }

  onKey(value) {
    console.log(this.selectedStockIn);
    this.selectedStockIns = this.search(value);
    }

  search(value: string) {
    const filter = value.toLowerCase();
    return this.stockIns.filter(option => option.toLowerCase().startsWith(filter));
  }
}

export class Sale {
  public vendorNames: Array<any>;
  public customerNames: Array<any>;
  public Price: number;
  public Quantity: number;
  public Total: number;

}
