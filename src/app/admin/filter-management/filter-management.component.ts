import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewFilterDialogComponent } from '../create-new-filter-dialog/create-new-filter-dialog.component';
import { FilterManagementApiService } from 'src/app/_services/filter-management-api.service';
import { SettingsActionDialogComponent } from '../settings-action-dialog/settings-action-dialog.component';

@Component({
  selector: 'app-filter-management',
  templateUrl: './filter-management.component.html',
  styleUrls: ['./filter-management.component.scss']
})
export class FilterManagementComponent {
  displayedColumns: string[] = ['id', 'filterName', 'filterStatus', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private filterManagementApi: FilterManagementApiService) {

  }
  ngOnInit(): void {
    this.getAllFilteredManagementList();
  }

  getAllFilteredManagementList() {
    this.filterManagementApi.getFilterManagement().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (res) => {
        alert("Error while fetching the Records.")
      }
    })
  }

  createNewRoute() {
    const dialogRef = this.dialog.open(CreateNewFilterDialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllFilteredManagementList();
      }
    })
  }
  editUserRow(row: any) {
    const dialogRef = this.dialog.open(CreateNewFilterDialogComponent, {
      width: '40%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllFilteredManagementList();
      }
    })

  }
  deleteUserRow(id: number) {
    this.filterManagementApi.deleteFilterManagement(id)
      .subscribe({
        next: (res) => {
          alert("Filter Row Deleted Successfully");
          this.getAllFilteredManagementList();
        },
        error: () => {
          alert("Error while deleting the records!!")
        }
      })
  }

  resetFilter(){

  }
  settingsAction(){
    this.dialog.open(SettingsActionDialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      
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
