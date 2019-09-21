import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public searchForm: FormGroup;
  public submitted: boolean = false;
  public dataSource: CustInfo[];
  public displayColInfo: any[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      customerName: ['']
    });

    this.displayColInfo = [
      { field: 'customerId', header: 'Customer Id' },
      { field: 'fullName', header: 'Customer Name' },
      { field: 'address', header: 'Address' },
      { field: 'email', header: 'Email' },
      { field: 'customerRefferedBy', header: 'Referred By' },
      { field: 'mobileno', header: 'Mobile' },
    ];
    
    this.dataSource = Customers;
  }

  get f(){ return this.searchForm.controls};

  performSearch(){
    console.log('performSearch invoked');
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.dataSource =  Customers;
    // filter data
    let customerName = this.searchForm.value.customerName;
    if (customerName != undefined && customerName != '') {
      this.dataSource =  this.dataSource.filter(item => item.fullName.toLowerCase().indexOf(customerName.toLowerCase()) !== -1);
    }

    console.log(this.dataSource);
  }
}

// models
export class CustInfo{
  customerId:number;
  firstName?:string;
  middleName?:string;
  lastName?:string;
  fullName: string;
  email:string;
  mobileno:string;
  homeTelephoneNo?:string;
  address:string;
  customerRefferedBy:string;
}

// mock data
export const Customers: CustInfo[] = [
  {customerId: 101, fullName: 'Krishna', email:'Krishna@abc.com', mobileno:'9999999999', address:'Hyderabad', customerRefferedBy:'Referrer 2'},
  {customerId: 102, fullName: 'Rams', email:'Rams@abc.com', mobileno:'8888888888', address:'Hyderabad', customerRefferedBy:'Referrer 1'},
  {customerId: 103, fullName: 'Ajay', email:'Ajay@abc.com', mobileno:'7777777777', address:'Hyderabad', customerRefferedBy:'Referrer 3'},
  {customerId: 104, fullName: 'Vijay', email:'Vijay@abc.com', mobileno:'6666666666', address:'Hyderabad', customerRefferedBy:'Referrer 2'},
  {customerId: 105, fullName: 'Anil', email:'Anil@abc.com', mobileno:'8888888888', address:'Hyderabad', customerRefferedBy:'Referrer 1'},
  {customerId: 106, fullName: 'Sunil', email:'Sunil@abc.com', mobileno:'9999999999', address:'Hyderabad', customerRefferedBy:'Referrer 1'},
  {customerId: 107, fullName: 'Akil', email:'Akil@abc.com', mobileno:'7777777777', address:'Hyderabad', customerRefferedBy:'Referrer 2'},
  {customerId: 108, fullName: 'Nikil', email:'Nikil@abc.com', mobileno:'7777777777', address:'Hyderabad', customerRefferedBy:'Referrer 1'},
  {customerId: 109, fullName: 'Aakas', email:'Aakas@abc.com', mobileno:'6666666666', address:'Hyderabad', customerRefferedBy:'Referrer 5'},
  {customerId: 110, fullName: 'Vikas', email:'Vikas@abc.com', mobileno:'8888888888', address:'Hyderabad', customerRefferedBy:'Referrer 4'},
];