import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-generic-mattable',
  templateUrl: './generic-mattable.component.html',
  styleUrls: ['./generic-mattable.component.css']
})

export class GenericMatTableComponent implements OnInit {

  @Input() dataSource: any[] = [];
  @Input() displayColInfo: any[] = [];
  displayColumns : any[] = [];
  matTblDataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.matTblDataSource = new MatTableDataSource(this.dataSource); 
    this.displayColumns = this.displayColInfo.map(x => x.field);
    console.log(this.dataSource);
  }

  ngAfterViewInit() {
    this.matTblDataSource.paginator = this.paginator;
    this.matTblDataSource.sort = this.sort;
    this.matTblDataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['dataSource']) {
      this.matTblDataSource = new MatTableDataSource(this.dataSource);
      this.matTblDataSource.paginator = this.paginator;
      this.matTblDataSource.sort = this.sort;
      this.matTblDataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
    }
  }
}
