import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {  } from 'src/app/_services/template-management-api.service'; 
import { RequestSenderDialogComponent } from '../request-sender-dialog/request-sender-dialog.component';
import { SenderIdManagementAPIService } from 'src/app/_services/sender-id-management-api.service';

@Component({
  selector: 'app-request-sender',
  templateUrl: './request-sender.component.html',
  styleUrls: ['./request-sender.component.scss']
})
export class RequestSenderComponent {
  displayedColumns: string[] = ['senderId','sender', 'senderType', 'dltPeId', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private senderIdManagementAPI: SenderIdManagementAPIService,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.getSenderIdManagementList();
  }

  openCreateTemplateDialog() {
    const dialogRef = this.dialog.open(RequestSenderDialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'create') {
        this.getSenderIdManagementList();
      }
    })
  }
  getSenderIdManagementList() {
    this.senderIdManagementAPI.getSenderIdManagement()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res.Data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error while fetching the Records.")
        }
      })
  }

  editRow(row: any) {
    const dialogRef = this.dialog.open(RequestSenderDialogComponent, {
      width: '500px',
      data: row,
    }).afterClosed().subscribe(val => {
      this.getSenderIdManagementList();
      if (val === 'update') {
        this.getSenderIdManagementList();
      }
    })

  }
  deleteRow(id: number) {
    this.senderIdManagementAPI.deleteSenderIdManagement(id)
      .subscribe({
        next: (res) => {
          alert("Template Row Deleted Successfully");
          this.getSenderIdManagementList();
        },
        error: () => {
          alert("Error while deleting the records!!")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
