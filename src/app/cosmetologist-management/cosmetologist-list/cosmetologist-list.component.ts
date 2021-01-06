import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-cosmetologist-list',
  templateUrl: './cosmetologist-list.component.html',
  styleUrls: ['./cosmetologist-list.component.scss']
})
export class CosmetologistListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  columnTitle: string[] | undefined;
  rowCount: number = 0;
  pageSize: number = 15;
  prevPageIndex: number | undefined = 0;
  start: number = 0;
  limit: number = 15;
  event: any;
  pageSizeArray = [15, 50, 100];

  constructor() {
    this.columnTitle = ['Cosmetologist Profile', 'Cosmetologist Name', 'Email', 'Phone', 'Shop name', 'Shop email', 'Action'];
  }

  ngOnInit(): void {
    this.dataSource.data = [
      {

      }, {

      }, {}
    ];
  }

  onChange(event: any) {
    this.event = event.pageIndex;
    if (this.limit !== event.pageSize) {
      this.start -= event.pageSize;
      this.limit = event.pageSize;
      this.pageSize = event.pageSize;
    }
    this.prevPageIndex = event.previousPageIndex;
    // this.getServiceList(event.pageIndex, event.previousPageIndex);
  }

}
