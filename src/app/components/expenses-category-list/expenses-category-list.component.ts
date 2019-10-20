import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from 'Services/vendor.service';
import { UIModel } from 'Models/UIModel';
import { VendorsModel } from 'Models/VendorsModel';

@Component({
  selector: 'app-expenses-category-list',
  templateUrl: './expenses-category-list.component.html',
  styleUrls: ['./expenses-category-list.component.css']
})
export class ExpensesCategoryListComponent implements OnInit {
  @Input() inExpensesTypeId: number = 0;
  @Input() inIsChildComponet: boolean = false;
  
  _vendorService: VendorService;
  public searchForm: FormGroup;
  public submitted: boolean = false;
  public dataSource: UIModel.ExpensesCategoryModel[];
  public displayColInfo: UIModel.ColumnInfo[];
  allExpensesCategories: UIModel.ExpensesCategoryModel[];
  expensesTypes:any[];

  constructor(private fb: FormBuilder, private vendorService: VendorService) {
    this._vendorService = vendorService;
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      expensesCategoryName: [''],
      expensesType: ['']
    });

    this.displayColInfo = [
      { field: 'name', header: 'Expenses Category' },
      { field: 'expensesTypeName', header: 'Expenses Type'},
    ];

    console.log('getting expenses types..');
      this.expensesTypes = this.enumSelector(UIModel.ExpensesTypeEnum);
      //this.expensesTypes = UIModel.ExpensesTypes;
      console.log(this.expensesTypes);

    /*this._vendorService.getVendorList('Vendor')
      .subscribe((result: VendorsModel[]) => {*/
        console.log('fetched unfiltered list successfully');
        //this.allExpensesCategories = result;
        this.allExpensesCategories = UIModel.ExpensesCategories.filter(item => item.expensesTypeId == (this.inExpensesTypeId > 0 ? this.inExpensesTypeId : item.expensesTypeId));
        for (let item of this.allExpensesCategories) {
          item.url = '#/expensescategory/' + item.id;
        }
        this.dataSource = this.allExpensesCategories;
    /*}, error => console.error(error));           
    } */ 
  }

  get f(){ return this.searchForm.controls};

  performSearch(){
    console.log('performSearch invoked');
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.dataSource =  this.allExpensesCategories;
    // filter data
    let filterVal = this.searchForm.value.expensesCategoryName;
    let filterExpensesTypeId = this.searchForm.value.expensesType;
    if (filterVal != undefined && filterVal != '') {
      this.dataSource =  this.dataSource.filter(
        item => (item.name.toLowerCase().indexOf(filterVal.toLowerCase()) !== -1)
      )};

    if (filterExpensesTypeId > 0) {
      this.dataSource =  this.dataSource.filter(
        item => item.expensesTypeId == filterExpensesTypeId
      )};  

    console.log(filterVal);
    console.log(filterExpensesTypeId);
    console.log('filtered list..');
  }

  enumSelector(definition) {
    return Object.keys(definition)
      .filter(key => isNaN(Number(key)) === true)
      .map(key => ({ id: definition[key], name: key }));
  }

}
