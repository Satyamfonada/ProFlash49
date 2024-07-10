import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { UserManagementApiService } from 'src/app/_services/user-management-api.service';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  displayedColumns: string[] = ['userId', 'typeOfAccount', 'transAcBalance', 'promoAcBalance', 'tsp', 'accountStatus', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private userManagementApi: UserManagementApiService) {

  }
  ngOnInit(): void {
    this.getAllUserManagementList();
  }

  getAllUserManagementList() {
    this.userManagementApi.getUserManagement().subscribe({
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

  createUsers() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '60%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllUserManagementList();
      }
    })
  }
  editUserRow(row: any) {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '60%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllUserManagementList();
      }
    })

  }
  deleteUserRow(id: number) {
    this.userManagementApi.deleteUserManagement(id)
      .subscribe({
        next: (res) => {
          alert("User Deleted Successfully");
          this.getAllUserManagementList();
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

  resetPasswordDialog(){
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      
    })
  }
}
