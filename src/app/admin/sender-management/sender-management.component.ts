import { Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateNewSenderDialogComponent } from '../create-new-sender-dialog/create-new-sender-dialog.component';
import { SenderManagementApiService } from 'src/app/_services/sender-management-api.service';
import { UploadSenderSheetDialogComponent } from '../upload-sender-sheet-dialog/upload-sender-sheet-dialog.component';
@Component({
  selector: 'app-sender-management',
  templateUrl: './sender-management.component.html',
  styleUrls: ['./sender-management.component.scss']
})
export class SenderManagementComponent {
  displayedColumns: string[] = ['senderName', 'status', 'user', 'accountType', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Inject(MAT_DIALOG_DATA) public list: any;

  constructor(
    private dialog: MatDialog, 
    private senderManagementApi:SenderManagementApiService
    ){}


  ngOnInit(): void {
    this.getAllSenderManagementList();
  }

  getAllSenderManagementList() {
    this.senderManagementApi.getSenderManagement().subscribe({
      next: (res) => {
        console.log(res, "uploaded.......")
        let newArr=[];
        for(let i = 0; i < res.length; i++){
          if(res[i].length > 0){
            for(let j = 0; j < res[i].length; j++){
              newArr.push(res[i][j]);
            }

          }else{
            newArr.push(res[i]);
          }

        }
        console.log(newArr, "newArr.......")
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (res) => {
        alert("Error while fetching the Records.")
      }
    })
  }

  createNewSender() {
    this.dialog.open(CreateNewSenderDialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllSenderManagementList();
      }
    })
  }
  editUserRow(row: any) {
   this.dialog.open(CreateNewSenderDialogComponent, {
      width: '40%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllSenderManagementList();
      }
    })

  }
  deleteUserRow(id: number) {
    this.senderManagementApi.deleteSenderManagement(id)
      .subscribe({
        next: (res) => {
          alert("Sender List Deleted Successfully");
          this.getAllSenderManagementList();
        },
        error: () => {
          alert("Error while deleting the records!!")
        }
      })
  }
  uploadSender(){
    const dialogRef =  this.dialog.open(UploadSenderSheetDialogComponent, {
      width: '40%',
      data: this.list
    });

    dialogRef.afterClosed().subscribe(val => {
      dialogRef.afterClosed().subscribe((val) => {
        console.log(val, "Sender Value....")
        this.senderManagementApi.postSenderManagement(val.list)
        .subscribe({
          next: (res) => {
            alert("New Entry Uploaded Successfully.");
            console.log(res, "Sender Res....")
            this.getAllSenderManagementList();
          },
          error: () => {
            alert("Error while adding the New Entry.")
          }
        })
      })
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
