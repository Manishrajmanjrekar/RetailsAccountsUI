import { Routes } from '@angular/router';

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
import { AddsalesComponent } from 'app/components/addsales/addsales.component';
import { AppSalesComponent } from 'app/components/app-sales/app-sales.component';
import { VendorListComponent } from 'app/components/vendor-list/vendor-list.component';
import { CustomerListComponent } from 'app/components/customer-list/customer-list.component';
import { ExpensesCategoryComponent } from 'app/components/expenses-category/expenses-category.component';
import { ExpensesCategoryListComponent } from 'app/components/expenses-category-list/expenses-category-list.component';
import { StockinListComponent } from 'app/components/stockin-list/stockin-list.component';
import { VendorpaymentComponent } from 'app/components/vendorpayment/vendorpayment.component';
import { CustomerpaymentComponent } from 'app/components/customerpayment/customerpayment.component';
import { SalesListComponent } from 'app/components/Sales/sales-list/sales-list.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'vendor',         component: VendorComponent },
    { path: 'customer',       component: CustomerInfoComponent },
    { path: 'stockin',       component: StockinComponent },
    { path: 'sales',      component: AppSalesComponent },
    { path: 'vendor/:id',     component: VendorComponent },
    { path: 'customer/:id',   component: CustomerInfoComponent },
    { path: 'stockin/:id',       component: StockinComponent },
    { path: 'vendorlist',     component: VendorListComponent },
    { path: 'customerlist',     component: CustomerListComponent },
    { path: 'stockin-list',     component: StockinListComponent },
    { path: 'expensescategory',     component: ExpensesCategoryComponent },
    { path: 'expensescategory/:id',     component: ExpensesCategoryComponent },
    { path: 'expensescategorylist', component: ExpensesCategoryListComponent },
    { path: 'vendorpayment',     component: VendorpaymentComponent },
    { path: 'customerpayment', component: CustomerpaymentComponent },
   // { path: 'sales-list', component: SalesListComponent },

    
];
