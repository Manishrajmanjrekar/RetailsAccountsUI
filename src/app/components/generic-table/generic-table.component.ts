import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})

export class GenericTableComponent implements OnInit {

  @Input() dataSource: any[] = [];
  @Input() displayColInfo: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = this.dataSource; 
  }

}
