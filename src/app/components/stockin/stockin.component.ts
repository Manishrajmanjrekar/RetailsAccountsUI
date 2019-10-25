import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { VendorService } from 'Services/vendor.service';
import { VendorsModel } from 'Models/VendorsModel';
import { CommonService } from 'Services/common-service';
import {

  debounceTime,
  mergeMapTo,
  mergeMap,
  switchMap,
  catchError
} from 'rxjs/operators';







import { VendorComponent } from '../vendor/vendor.component';
import { stringify } from '@angular/compiler/src/util';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StockinService } from 'Services/stockin.service';
@Component({
  selector: 'app-stockin',
  templateUrl: './stockin.component.html',
  styleUrls: ['./stockin.component.css']
})

export class StockinComponent implements OnInit {
  stockinForm: FormGroup;
  submitted = false;
  vendorList: any;
  options: string[] = ['One', 'Two', 'Three', 'sdf', 'ee', 'aa', 'bb', 'cc', 'ff', 'gg', 'hh'];
  filteredOptions: Observable<string[]>;
  vendorAutoComplete = new FormControl();
  vendorNamesList: VendorsModel[];
  public githubAutoComplete$: Observable<VendorsModel[]> = null;
  public autoCompleteControl = new FormControl();
  vendorId: number;
  loadCount: string;



  constructor(private formBuilder: FormBuilder, private vendorService: VendorService,
    private activatedRoute: ActivatedRoute, private stockInService: StockinService) {

  }

  changeClient(data) {
    alert('selected --->' + data.id);
  }

  lookup(value: string): Observable<VendorsModel[]> {
    return this.vendorService.searchVendorNames(value.toLowerCase()).pipe(
      // map the item property of the github results as our return object
      map(results => results),
      // catch errors
      // catchError(_ => {
      //   return of();
      // })
    );
  }

  ngOnInit() {
    this.vendorList =
      [
        { id: 10, name: 'vendor1' },
        { id: 11, name: 'vendor2' }
      ];

    // read route parameters
    this.activatedRoute
      .params
      .subscribe(params => {
        console.log('Regular Params:', params);
        if (params) {
          const id = Number(params['id']) || 0;
          console.log('query string id:-' + id)

          this.stockInService.StockById('StockIn/StockById', id).subscribe(res => {
            console.log('results from StockById' + res);


            this.autoCompleteControl.setValue(res.firstName);

            this.stockinForm = this.formBuilder.group({
              // vendor: ['', Validators.required, ],
              NickName: [res.nickName, Validators.required],
              VendorId: [res.vendorId],

              createdDate: [res.createdDate, [Validators.required, Validators]],
              loadName: [res.loadName, [Validators.required, Validators]],
              TotalQuantity: [res.TotalQuantity, [Validators.required, Validators.min(1)]],
            });


          }, (err: HttpErrorResponse) => {
            console.log(err.error);
            console.log(err.name);
            console.log(err.message);
            console.log(err.status);
          });




        }


      });

    this.filteredOptions = this.vendorAutoComplete.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.stockinForm = this.formBuilder.group({
      // vendor: ['', Validators.required, ],
      NickName: ['', Validators.required],
      VendorId: [''],

      createdDate: ['', [Validators.required, Validators]],
      loadName: ['', [Validators.required, Validators]],
      TotalQuantity: [null, [Validators.required, Validators.min(1)]],
    });

    this.githubAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from github
          return this.lookup(value);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      })
    );



  }




  // convenience getter for easy access to form fields
  get f() { return this.stockinForm.controls; }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    this.submitted = true;
    console.log('submitted true now.....')

    this.stockinForm.controls['VendorId'].setValue(this.vendorId);

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.stockinForm.value))
    if (this.stockinForm.invalid) {
      console.log('this.stockinForm.invalid')
      return;
    }


    const data = JSON.stringify(this.stockinForm.value);


    const count = this.vendorService.AddStock('StockIn/AddStock', data)



  }


  SelectedOption(value: VendorsModel) {
    console.log('SelectedOption----' + value.id);
    // var values= new String(value).split(":");
    // console.log(values);
    // var count ;
    // this.stockinForm.controls['NickName'].setValue(values[0]);
    // var nickName =this.stockinForm.controls['NickName'].value;
    // this.vendorId =values[1];

    // var values= new String(value).split(":");
    // console.log(values);
    let count;
    this.stockinForm.controls['NickName'].setValue(value.nickName);
    const nickName = value.nickName;
    this.vendorId = value.id;

    // Load string to be appended to textbox.. below logic is for that..............................
    const countdata =
    this.vendorService.getStockIn_LoadNumberCount('StockIn/StockInCount', this.vendorId, value.nickName).subscribe(res => {
      console.log('results from getStockIn_LoadNumberCount' + res);

      // tslint:disable-next-line:radix
      count = parseInt(res.toString());
      count = count + 1
      console.log('count for number of records at stock in table:-' + count);
      this.stockinForm.controls['loadName'].setValue(nickName + '_Load' + count);


      return count;
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
    });



  }

}
