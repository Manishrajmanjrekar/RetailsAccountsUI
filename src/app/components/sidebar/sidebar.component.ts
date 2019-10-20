import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  // { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  // { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  // { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  // { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
  { path: '/vendorlist', title: 'Vendor List', icon: 'people', class: '' },
  { path: '/vendor', title: 'Vendor', icon: 'person', class: '' },
  { path: '/customerlist', title: 'Customer List', icon: 'people', class: '' },
  { path: '/customer', title: 'Customer', icon: 'person', class: '' },
  { path: '/stockin', title: 'Stock-In', icon: 'person', class: '' },
  { path: '/sales', title: 'Sales', icon: 'sales', class: '' },
  { path: '/expensescategory', title: 'Expenses Category', icon: 'category', class: '' },
  { path: '/expensescategorylist', title: 'Expenses Category List', icon: 'category', class: '' },


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
