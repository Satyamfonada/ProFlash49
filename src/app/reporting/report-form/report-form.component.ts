import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  date: string;
  routeId:number;
  messageState:string;
  messagePdu:number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { date: '02-06-2023 00:00:00', routeId:66170385, messageState:'DELIVERY_SUCCESS', messagePdu:13086},
  { date: '02-06-2023 00:00:00', routeId:66170385, messageState:'DELIVERY_SUCCESS', messagePdu:13086},
  { date: '02-06-2023 00:00:00', routeId:66170385, messageState:'DELIVERY_SUCCESS', messagePdu:13086},
  { date: '02-06-2023 00:00:00', routeId:66170385, messageState:'DELIVERY_SUCCESS', messagePdu:13086},
  { date: '02-06-2023 00:00:00', routeId:66170385, messageState:'DELIVERY_SUCCESS', messagePdu:13086},
  { date: '02-06-2023 00:00:00', routeId:66170385, messageState:'DELIVERY_SUCCESS', messagePdu:13086},
  { date: '02-06-2023 00:00:00', routeId:66170385, messageState:'DELIVERY_SUCCESS', messagePdu:13086},
  { date: '02-06-2023 00:00:00', routeId:66170385, messageState:'DELIVERY_SUCCESS', messagePdu:13086},
  { date: '02-06-2023 00:00:00', routeId:66170385, messageState:'DELIVERY_SUCCESS', messagePdu:13086},
  { date: '02-06-2023 00:00:00', routeId:66170385, messageState:'DELIVERY_SUCCESS', messagePdu:13086},
]; 
@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})


export class ReportFormComponent implements OnInit {
  displayedColumns: string[] = ['date', 'routeId', 'messageState', 'messagePdu'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private location: Location) { }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
