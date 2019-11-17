import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from 'Services/vendor.service';
import { UIModel } from 'Models/UIModel';
import { VendorsModel } from 'Models/VendorsModel';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  _vendorService: VendorService;
  public searchForm: FormGroup;
  public submitted: boolean = false;
  public dataSource: VendorsModel[];
  public displayColInfo: UIModel.ColumnInfo[];
  allVendors: VendorsModel[];

  constructor(private fb: FormBuilder, private vendorService: VendorService) {
    this._vendorService = vendorService;
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      vendorName: ['']
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

    this._vendorService.getVendorList('Vendor/GetAllVendors')
      .subscribe((result: VendorsModel[]) => {
        console.log('fetched unfiltered list successfully');
        this.allVendors = result;
        for (let vendor of this.allVendors) {
          vendor.url = '#/vendor/' + vendor.id;
        }        
        this.dataSource = this.allVendors;
      }, error => console.error(error));
  }

  get f(){ return this.searchForm.controls};

  performSearch(){
    console.log('performSearch invoked');
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.dataSource =  this.allVendors;
    // filter data
    let filterVal = this.searchForm.value.vendorName;
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
