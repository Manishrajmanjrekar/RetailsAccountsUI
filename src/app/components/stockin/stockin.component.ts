import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stockin',
  templateUrl: './stockin.component.html',
  styleUrls: ['./stockin.component.css']
})

export class StockinComponent implements OnInit {
  stockinForm: FormGroup;
  submitted = false;
  vendorList: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.vendorList =
    [
      {id:10,name:"vendor1"},
      {id:11,name:"vendor2"} 
    ];

    this.stockinForm = this.formBuilder.group({
      vendor: ['',Validators.required,],
      simpleName: ['', Validators.required],
      createdDate: ['', [Validators.required, Validators]],
      totalCount: [null,[Validators.required, Validators.min(1)]],
    });
  }

 // convenience getter for easy access to form fields
 get f() { return this.stockinForm.controls; }

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