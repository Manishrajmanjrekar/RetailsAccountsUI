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
      expenseTypeId: number;
      name: string;      

      createdDate?: string;
      createdBy?: string;
      modifiedDate?: string;
      modifiedBy?: string;

      expenseTypeName?: string;
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

  }