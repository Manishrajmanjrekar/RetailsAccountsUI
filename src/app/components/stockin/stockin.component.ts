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

  constructor(private formBuilder: FormBuilder, private vendorService: VendorService) {

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


    this.filteredOptions = this.vendorAutoComplete.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.stockinForm = this.formBuilder.group({
      vendor: ['', Validators.required, ],
      simpleName: ['', Validators.required],
      createdDate: ['', [Validators.required, Validators]],
      totalCount: [null, [Validators.required, Validators.min(1)]],
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
    // stop here if form is invalid
    if (this.stockinForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.stockinForm.value))
  }


  SelectedOption(value) {
    console.log('SelectedOption----' + value);
    this.stockinForm.controls['simpleName'] = value;
  }

}
