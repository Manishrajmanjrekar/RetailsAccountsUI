import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stockin-list',
  templateUrl: './stockin-list.component.html',
  styleUrls: ['./stockin-list.component.css']
})
export class StockinListComponent implements OnInit {
  public searchForm: FormGroup;
  public submitted: boolean = false;
  public dataSource: StockinInfo[];
  public displayColInfo: any[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      stockinName: [''],
      vendorName: ['']
    });

    this.displayColInfo = [
      { field: 'stockinId', header: 'Stockin Id' },
      { field: 'createdDate', header: 'Created Date' },
      { field: 'simpleName', header: 'Simple Name' },
      { field: 'vendor', header: 'Vendor Name' },      
      { field: 'totalCount', header: 'Total Count' }
    ];

    this.dataSource = Stockins;
  }

  get f(){ return this.searchForm.controls};

  performSearch(){
    console.log('performSearch invoked');
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.dataSource =  Stockins;
    // filter data
    let stockinName = this.searchForm.value.stockinName;
    let vendorName = this.searchForm.value.vendorName;

    if (stockinName != undefined && stockinName != '') {
      this.dataSource =  this.dataSource.filter(item => item.simpleName.toLowerCase().indexOf(stockinName.toLowerCase()) !== -1);
    }

    if (vendorName != undefined && vendorName != '') {
      this.dataSource =  this.dataSource.filter(item => item.vendor.toLowerCase().indexOf(vendorName.toLowerCase()) !== -1);
    }

    console.log(this.dataSource);
  }
}

// models
export class StockinInfo{
  stockinId: number;
  vendor: string;
  simpleName: string;
  createdDate: string;
  totalCount: number
}

// mock data
export const Stockins: StockinInfo[] = [
  {stockinId: 11, vendor: 'Vendor2', simpleName:'stockin 1', createdDate:'01/01/2019', totalCount:100},
  {stockinId: 12, vendor: 'Vendor1', simpleName:'stockin 2', createdDate:'15/01/2019', totalCount:210},
  {stockinId: 13, vendor: 'Vendor3', simpleName:'stockin 3', createdDate:'01/02/2019', totalCount:115},
  {stockinId: 14, vendor: 'Vendor1', simpleName:'stockin 4', createdDate:'15/02/2019', totalCount:120},
  {stockinId: 15, vendor: 'Vendor2', simpleName:'stockin 5', createdDate:'01/03/2019', totalCount:111},
  {stockinId: 16, vendor: 'Vendor2', simpleName:'stockin 6', createdDate:'15/04/2019', totalCount:200},
  {stockinId: 17, vendor: 'Vendor3', simpleName:'stockin 7', createdDate:'01/05/2019', totalCount:180},
  {stockinId: 18, vendor: 'Vendor1', simpleName:'stockin 8', createdDate:'01/06/2019', totalCount:300},
];