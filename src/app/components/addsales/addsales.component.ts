import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { AppSalesComponent } from '../app-sales/app-sales.component';

@Component({
  selector: 'app-addsales',
  templateUrl: './addsales.component.html',
  styleUrls: ['./addsales.component.css']
})
export class AddsalesComponent implements OnInit {
  items: any;
  @ViewChild('parent', { read: ViewContainerRef, static: true }) container: ViewContainerRef;
  // tslint:disable-next-line:variable-name
  constructor(private _cfr: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  OnSubmit($event: Event) {
    // $event.preventDefault();
    console.log('save form called');
    this.items = event;
    console.log(this.items);

  }

  addComponent() {
    const comp = this._cfr.resolveComponentFactory(AppSalesComponent);
    const appSalesComponent = this.container.createComponent(comp);
    appSalesComponent.instance._ref = appSalesComponent;
  }
}
