import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RepositoryDialogComponent } from './repository-dialog/repository-dialog.component';
import { ManageAddressBookDialogComponent } from './manage-address-book-dialog/manage-address-book-dialog.component';
import { RepositoryApiService } from '../_services/repository-api.service';

@Component({
  selector: 'app-addressbooks',
  templateUrl: './addressbooks.component.html',
  styleUrls: ['./addressbooks.component.scss']
})
export class AddressbooksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'repositoryName', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog: MatDialog, private repositoryListAPI: RepositoryApiService) { }

  ngOnInit(): void {
    this.getAllRepositoryList();
  }

  getAllRepositoryList() {
    this.repositoryListAPI.getRepositoryList()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error while fetching the Records.")
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

  addRow() {
    const dialogRef = this.dialog.open(RepositoryDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllRepositoryList();
      }
    })


  }
  editRow(row: any) {
    const dialogRef = this.dialog.open(RepositoryDialogComponent, {
      width: '500px',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllRepositoryList();
      }
    })

  }
  deleteRow(id: number) {
    this.repositoryListAPI.deleteRepositoryList(id)
      .subscribe({
        next: (res) => {
          alert("Repository Name Deleted Successfully");
          this.getAllRepositoryList();
        },
        error: () => {
          alert("Error while deleting the records!!")
        }
      })
  }

  manageAddressBook(val:any) {
    const dialogRef = this.dialog.open(ManageAddressBookDialogComponent, {
      width: '80%',
      data: val,
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}