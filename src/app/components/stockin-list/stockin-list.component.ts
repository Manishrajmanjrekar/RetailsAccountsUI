import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataSource} from '@angular/cdk/collections';


import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-stockin-list',
  templateUrl: './stockin-list.component.html',
  styleUrls: ['./stockin-list.component.css']
})
export class StockinListComponent implements OnInit {
  public searchForm: FormGroup;
  public submitted: boolean = false;
 // public dataSource: StockinInfo[];
  public displayColInfo: any[];
  // displayedColumns = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  displayedColumns = ['stockinId', 'createdDate', 'simpleName', 'vendor','action'];
  dataSource = new MatTableDataSource<StockinInfo>(Stockins);

 


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private fb: FormBuilder,private activatedRoute: ActivatedRoute,private router: Router) {
    console.log('displayedColumns'+this.displayedColumns);
    console.log('dataSource'+this.dataSource);

   }

   UpdateData(id){
     //this.activatedRoute.url ='../stockin/?id=id';
     this.router.navigate(['/../stockin/id?=',{ id } ]);
      console.log('UpdateData'+id);

      if(id>0){
          // Get the data from the api and load the form group....
          
      }
   }

  ngOnInit() {
    this.searchForm = this.fb.group({
      stockinName: [''],
      vendorName: ['']
    });
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  get f(){ return this.searchForm.controls};

  
}

// models
export interface StockinInfo{
  stockinId: number;
  vendor: string;
  simpleName: string;
  createdDate: string;
  totalCount: number
}

// mock data
 const Stockins: StockinInfo[] = [
  {stockinId: 11, vendor: 'Vendor2', simpleName:'stockin 1', createdDate:'01/01/2019', totalCount:100},
  {stockinId: 12, vendor: 'Vendor1', simpleName:'stockin 2', createdDate:'15/01/2019', totalCount:210},
  {stockinId: 13, vendor: 'Vendor3', simpleName:'stockin 3', createdDate:'01/02/2019', totalCount:115},
  {stockinId: 14, vendor: 'Vendor1', simpleName:'stockin 4', createdDate:'15/02/2019', totalCount:120},
  {stockinId: 15, vendor: 'Vendor2', simpleName:'stockin 5', createdDate:'01/03/2019', totalCount:111},
  {stockinId: 16, vendor: 'Vendor2', simpleName:'stockin 6', createdDate:'15/04/2019', totalCount:200},
  {stockinId: 17, vendor: 'Vendor3', simpleName:'stockin 7', createdDate:'01/05/2019', totalCount:180},
  {stockinId: 18, vendor: 'Vendor1', simpleName:'stockin 8', createdDate:'01/06/2019', totalCount:300},
];

export class ExampleDataSource extends DataSource<any> {

  connect(): Observable<StockinInfo[]> {
    return Observable.of(Stockins);  
  }

  disconnect() {}
}


