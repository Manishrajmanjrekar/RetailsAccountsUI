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
  public sales: Sales;
  removeObject() {
    this._ref.destroy();
  }
  ngOnInit() {
    this.sales = new Sales();
    this.sales.vendorNames = [
      { id: 1, name: 'rams' },
      { id: 2, name: 'ganesha....' },

    ];
    this.sales.customerNames = [
      { id: 1, name: 'rams' },
      { id: 2, name: 'ganesha....' },

    ];
  }
  save() {
    alert('Saved Successfully!');
  }
  calculate(event, value) {
    this.sales.Total = this.sales.Price * this.sales.Quantity;
    console.log(event);
    console.log(this.sales.Total);

  }
}

export class Sales {
  public vendorNames: Array<any>;
  public customerNames: Array<any>;
  public Price: number;
  public Quantity: number;
  public Total: number;

}
