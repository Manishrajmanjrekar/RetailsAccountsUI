export class StockInLoad
{
    Id:number;
    VendorName: string;
    CustomerName: string;
  middleName?: string;
  StockInId: number;
  
  LoadName: string;
  Price: string;
  Quantity?: string;
  Total?:string;
  CreatedDate?: string;
 
}

export class StockInModel
{
    id: number;
    vendorId: number;
    loadName: string;
    totalQuantity: number;    
    isActive: boolean;
    createdDate: Date;

    nickName: string;
    firstName:string;
    formattedCreatedDate: string;
    formattedModifiedDate: string;
}