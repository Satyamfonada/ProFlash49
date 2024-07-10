import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RouteManagementApiService } from 'src/app/_services/route-management-api.service';
import { CreateNewRouteDialogComponent } from '../create-new-route-dialog/create-new-route-dialog.component';
import { ManageSelectorDialogComponent } from '../manage-selector-dialog/manage-selector-dialog.component';
import { ControlRoutesDialogComponent } from '../control-routes-dialog/control-routes-dialog.component';

@Component({
  selector: 'app-route-management',
  templateUrl: './route-management.component.html',
  styleUrls: ['./route-management.component.scss']
})
export class RouteManagementComponent {
  displayedColumns: string[] = ['routeId', 'routeName', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private routeManagementApi: RouteManagementApiService
  ) { }


  ngOnInit(): void {
    this.getAllRouteManagementList();
  }

  getAllRouteManagementList() {
    this.routeManagementApi.getRouteManagement().subscribe({
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
  createNewSRoute() {
    this.dialog.open(CreateNewRouteDialogComponent, {
      width: '60%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllRouteManagementList();
      }
    })
  }
  editRouteRow(row: any) {
    this.dialog.open(CreateNewRouteDialogComponent, {
      width: '60%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllRouteManagementList();
      }
    })
  }
  deleteRouteRow(id: number) {
    this.routeManagementApi.deleteRouteManagement(id)
      .subscribe({
        next: (res) => {
          alert("Route Row Deleted Successfully");
          this.getAllRouteManagementList();
        },
        error: () => {
          alert("Error while deleting the records!!")
        }
      })
  }

  routeAction(){

  }
  summaryReport(){
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  manageSelector() {
    this.dialog.open(ManageSelectorDialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
    })
  }

  controlRoutes() {
    this.dialog.open(ControlRoutesDialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
    })
  }
}
