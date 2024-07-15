import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UrlManagementAPIService } from 'src/app/_services/url-management-api.service';
import { UrlDialogComponent } from './url-dialog/url-dialog.component';

@Component({
  selector: 'app-url-management',
  templateUrl: './url-management.component.html',
  styleUrls: ['./url-management.component.scss']
})
export class UrlManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'urlTitle', 'shortUrl','status', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private urlManagmentAPI: UrlManagementAPIService,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.getUrlManagementList();
  }

  openNewShortenedUrlDialog() {
    const dialogRef = this.dialog.open(UrlDialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'create') {
        this.getUrlManagementList();
      }
    })
  }
  getUrlManagementList() {
    this.urlManagmentAPI.getUrlManagement()
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
    const dialogRef = this.dialog.open(UrlDialogComponent, {
      width: '500px',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getUrlManagementList();
      }
    })

  }
  deleteRow(id: number) {
    this.urlManagmentAPI.deleteUrlManagement(id)
      .subscribe({
        next: (res) => {
          alert("URL Deleted Successfully");
          this.getUrlManagementList();
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
  updateActiveStatus(element: any): void {
    element.status = element.status === 1 ? 0 : 1;
    this.urlManagmentAPI.updateUrlStatus(element.trackingId, element.status).subscribe(response => {
      alert(response.msg);
    });
  }
}
