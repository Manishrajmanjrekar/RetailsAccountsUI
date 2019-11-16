import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'Services/customer.service';
import { CustomerModel } from 'Models/CustomerModel';
import { UIModel } from 'Models/UIModel';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  _customerService: CustomerService;
  public searchForm: FormGroup;
  public submitted: boolean = false;
  public dataSource: CustomerModel[];
  public displayColInfo: UIModel.ColumnInfo[];
  allCustomers: CustomerModel[];

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this._customerService = customerService;
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      customerName: ['']
    });

    this.displayColInfo = [
      { field: 'nickName', header: 'Nick Name',  hyperlinkField: 'url' },
      { field: 'firstName', header: 'First Name', hyperlinkField:'' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'mobile', header: 'Mobile' },
      
      { field: 'city', header: 'City' },
      { field: 'state', header: 'State' },      
      { field: 'address', header: 'Address' },
    ];

    this._customerService.getCustomerList('Customer/GetAllCustomers')
      .subscribe((result: CustomerModel[]) => {
        console.log('fetched unfiltered list successfully');
        this.allCustomers = result;
        for (let customer of this.allCustomers) {
          customer.url = '#/customer/' + customer.id;
        }        
        this.dataSource = this.allCustomers;
      }, error => console.error(error));
  }

  get f(){ return this.searchForm.controls};

  performSearch(){
    console.log('performSearch invoked');
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.dataSource =  this.allCustomers;
    // filter data
    let filterVal = this.searchForm.value.customerName;
    if (filterVal != undefined && filterVal != '') {
      this.dataSource =  this.dataSource.filter(
        item => (item.nickName.toLowerCase().indexOf(filterVal.toLowerCase()) !== -1
        || item.firstName.toLowerCase().indexOf(filterVal.toLowerCase()) !== -1
        || item.lastName.toLowerCase().indexOf(filterVal.toLowerCase()) !== -1)
      )};

    console.log(filterVal);
    console.log('filtered list..');
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