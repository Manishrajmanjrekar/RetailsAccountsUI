import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { VendorComponent } from './../../components/vendor/vendor.component';
import { CustomerInfoComponent } from 'app/components/customer-info/customer-info.component';
import { StockinComponent } from 'app/components/stockin/stockin.component';
import { VendorListComponent } from 'app/components/vendor-list/vendor-list.component';
import { CustomerListComponent } from 'app/components/customer-list/customer-list.component';
import { GenericTableComponent } from 'app/components/generic-table/generic-table.component';
import { GenericMatTableComponent } from 'app/components/generic-mattable/generic-mattable.component';
import { ExpensesCategoryComponent } from 'app/components/expenses-category/expenses-category.component';
import { ExpensesCategoryListComponent } from 'app/components/expenses-category-list/expenses-category-list.component';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatAutocompleteModule,  
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
} from '@angular/material';
import { AddsalesComponent } from 'app/components/addsales/addsales.component';
import { AppSalesComponent } from 'app/components/app-sales/app-sales.component';
import { StockinListComponent } from 'app/components/stockin-list/stockin-list.component';
import { CustomerpaymentComponent } from 'app/components/customerpayment/customerpayment.component';
import { VendorpaymentComponent } from 'app/components/vendorpayment/vendorpayment.component';
import { SalesListComponent } from 'app/components/Sales/sales-list/sales-list.component';
import { SalesEditComponent } from 'app/components/Sales/sales-edit/sales-edit.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    VendorComponent,
    CustomerInfoComponent,
    StockinComponent,
    AddsalesComponent,
    AppSalesComponent,
    VendorListComponent,
    CustomerListComponent,
    GenericTableComponent,
    GenericMatTableComponent,
    ExpensesCategoryComponent,
    ExpensesCategoryListComponent,
 StockinListComponent,
 VendorpaymentComponent,
 CustomerpaymentComponent,
 SalesListComponent,
 SalesEditComponent
  ]
})

export class AdminLayoutModule { }
