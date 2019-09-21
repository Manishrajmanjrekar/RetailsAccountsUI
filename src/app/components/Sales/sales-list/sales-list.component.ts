import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor';

import { SalesListSearchModel } from 'src/app/model/SalesListSearchModel';
import { SalesList } from 'src/app/model/saleslist';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {
   vendorId:number;
  searchData: string;
  vendorList: Array<Vendor>;
  salesList: SalesList[];
  salesColumns:Array<string>;
  gridData:Array<SalesList>;
  public displayColInfo: any[];
  constructor() {


  }

  ngOnInit() {
    this.vendorList = this.getVendorList();
    this.salesList =this.getSalesByVendor(null);
    if (this.salesList.length > 0) {
      const temp = this.salesList[0];
      this.salesColumns = Object.getOwnPropertyNames(temp);
      console.log(this.salesColumns);
      this.gridData = this.salesList;
    }
    this.displayColInfo = [
      { field: 'vendorName', header: 'vendor Name' },
      { field: 'customerName', header: 'customer Name' },
      { field: 'Price', header: 'Price' },
      { field: 'Quantity', header: 'Quantity' },      
      { field: 'Total', header: 'Total' }
    ];
  }
  

  getVendorList(): Array<Vendor> {
    this.vendorList = new Array<Vendor>();
    for (let i = 0; i < 10; i++) {
      this.vendorList.push({ Id: i, Name: "vendor" + i });
    }
    return this.vendorList;

  }

  public vendorChangeEvent(){
    console.log(this.vendorId);
    this.gridData =  this.salesList.filter(item => item.VendorId==this.vendorId);
  }

  clearData(){
    this.vendorId=null;
    //this.vendorList = this.getVendorList();
    this.gridData = this.salesList;
    
  }
 
  getSalesByVendor(searchData:SalesList):Array<SalesList>{
    console.log("event is called");
    this.salesList = new Array<SalesList>();
    for(let i =0;i<10;i++){
           this.salesList.push({vendorName:"vendor"+i,customerName :"customer"+i,
           Price:7,Quantity:100,Total:1745,VendorId:i });
    }

    return this.salesList;
  }

}




