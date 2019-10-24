import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'Services/common-service';
import { UIModel } from 'Models/UIModel';

@Component({
  selector: 'app-expenses-category-list',
  templateUrl: './expenses-category-list.component.html',
  styleUrls: ['./expenses-category-list.component.css']
})
export class ExpensesCategoryListComponent implements OnInit {
  @Input() inExpensesTypeId: number = 0;
  @Input() inIsChildComponet: boolean = false;
  
  _commonService: CommonService;
  public searchForm: FormGroup;
  public submitted: boolean = false;
  public dataSource: UIModel.ExpensesCategoryModel[];
  public displayColInfo: UIModel.ColumnInfo[];
  allExpensesCategories: UIModel.ExpensesCategoryModel[];
  expensesTypes:any[];

  constructor(private fb: FormBuilder, private commonService: CommonService) {
    this._commonService = commonService;
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      expensesCategoryName: [''],
      expensesTypeId: [this.inExpensesTypeId > 0 ? this.inExpensesTypeId : '']
    });

    this.displayColInfo = [
      { field: 'name', header: 'Expenses Category' },
      { field: 'expensesTypeName', header: 'Expenses Type'},
    ];

    console.log('getting expenses types..');
    this._commonService.get('ExpensesTypes')
    .subscribe((result: UIModel.ExpensesTypeModel[]) => {
      console.log('fetched ExpensesTypes successfully');      
      this.expensesTypes = result;
    }, error => console.error(error)); 

    this.getExpensesCategories();    
  }

  get f(){ return this.searchForm.controls};

  getExpensesCategories() {
    this._commonService.get('expensescategory')
    .subscribe((result: UIModel.ExpensesCategoryModel[]) => {
      console.log('fetched unfiltered list successfully'); 
      this.allExpensesCategories = result;  
      for (let item of this.allExpensesCategories) {
        item.url = '#/expensescategory/' + item.id;
      }  
      
      this.filterData();
    }, error => console.error(error));
  }

  performSearch(){
    console.log('performSearch invoked');
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.getExpensesCategories();
  }

  filterData() {
    this.dataSource =  this.allExpensesCategories;
    // filter data
    let filterVal = this.searchForm.value.expensesCategoryName;
    let filterExpensesTypeId = this.searchForm.value.expensesTypeId;
    if (filterVal != undefined && filterVal != '') {
      this.dataSource =  this.dataSource.filter(
        item => (item.name.toLowerCase().indexOf(filterVal.toLowerCase()) !== -1)
      )};

    if (filterExpensesTypeId > 0) {
      this.dataSource =  this.dataSource.filter(
        item => item.expensesTypeId == filterExpensesTypeId
      )
    };  
      
    console.log(filterVal);
    console.log(filterExpensesTypeId);
    console.log('filtered list..');
  }
}
