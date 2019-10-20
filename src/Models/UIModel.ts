export namespace UIModel {
    export class ResponseInfo {
      public isSuccess: boolean;
      public statusCode?: string;
      public message?: string;
      public recordId?: number = 0;
    }

    export class ColumnInfo{
      field: string;
      header: string; 
      hyperlinkField?: string;
    }

    export enum ExpensesTypeEnum {
      Vendor = 1,
      CommissionAgent = 2
    }

    export class ExpensesCategoryModel{
      id: number;
      expensesTypeId: number;
      name: string;      

      createdDate?: string;
      createdBy?: string;
      modifiedDate?: string;
      modifiedBy?: string;

      expensesTypeName?: string;
      url?: string;
    };

    export class ExpensesTypeModel{
      id: number;
      name: string;
    }

    export const ExpensesTypes: ExpensesTypeModel[] = [
      {id:1, name:'Vendor'},
      {id:2, name:'Commission Agent'}
    ]

    export const ExpensesCategories: ExpensesCategoryModel[] = [
      {id:1, name:'a01', expensesTypeId: 1, expensesTypeName: 'Vendor' },
      {id:2, name:'a02', expensesTypeId: 1, expensesTypeName: 'Vendor'},
      {id:3, name:'a03', expensesTypeId: 1, expensesTypeName: 'Vendor'},

      {id:10, name:'B01', expensesTypeId: 2, expensesTypeName: 'Commission Agent'},
      {id:11, name:'B02', expensesTypeId: 2, expensesTypeName: 'Commission Agent'},
      {id:12, name:'B03', expensesTypeId: 2, expensesTypeName: 'Commission Agent'},
    ]
  }