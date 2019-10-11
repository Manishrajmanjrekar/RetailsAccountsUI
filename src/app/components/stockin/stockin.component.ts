import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-stockin',
  templateUrl: './stockin.component.html',
  styleUrls: ['./stockin.component.css']
})

export class StockinComponent implements OnInit {
  stockinForm: FormGroup;
  submitted = false;
  vendorList: any;
  options: string[] = ['One', 'Two', 'Three','sdf','ee','aa','bb','cc','ff','gg','hh'];
  filteredOptions: Observable<string[]>;
  vendorAutoComplete = new FormControl();


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.vendorList =
    [
      {id:10,name:"vendor1"},
      {id:11,name:"vendor2"} 
    ];

    



    this.filteredOptions = this.vendorAutoComplete.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.stockinForm = this.formBuilder.group({
      vendor: ['',Validators.required,],
      simpleName: ['', Validators.required],
      createdDate: ['', [Validators.required, Validators]],
      totalCount: [null,[Validators.required, Validators.min(1)]],
    });
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

}