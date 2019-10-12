import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { VendorComponent } from './components/vendor/vendor.component';
import { StockinComponent } from './components/stockin/stockin.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { StockinListComponent } from './components/stockin-list/stockin-list.component';
import { SalesListComponent } from './components/Sales/sales-list/sales-list.component';
import { SalesEditComponent } from './components/Sales/sales-edit/sales-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppSalesComponent } from './components/app-sales/app-sales.component';
import { VendorService } from 'Services/vendor.service';
import { CustomerService } from 'Services/customer.service';
import { MatAutocompleteModule } from '@angular/material';
import {  CommonService } from 'Services/common-service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    // VendorComponent,
   // StockinComponent,
    // VendorListComponent,
    // GenericTableComponent,
    // CustomerListComponent,
    // StockinListComponent,
    // SalesListComponent,
    // SalesEditComponent

  ],
  providers: [VendorService,CustomerService,CommonService],
  bootstrap: [AppComponent]
 // entryComponents : [AppSalesComponent]
})
export class AppModule { }
