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
  }