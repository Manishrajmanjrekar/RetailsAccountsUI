export class VendorsModel {
  id = 0;
  nickName: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  mobileNo: string;
  mobile: string;
  alternateMobile?: string;
  homePhone?: string;
  // officePhone?:string;
  email?: string;
  address: string;
  city: string;
  state: string;
  // shopName:string;
  // shopLocation:string;
  referredBy?: string;

  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
}
