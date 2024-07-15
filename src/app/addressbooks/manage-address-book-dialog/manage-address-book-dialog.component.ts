import { Component, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RepositoryApiService } from 'src/app/_services/repository-api.service';
import { NewEntryDialogComponent } from '../new-entry-dialog/new-entry-dialog.component';
import { UploadUserBaseDialogComponent } from '../upload-user-base-dialog/upload-user-base-dialog.component';

@Component({
  selector: 'app-manage-address-book-dialog',
  templateUrl: './manage-address-book-dialog.component.html',
  styleUrls: ['./manage-address-book-dialog.component.scss']
})
export class ManageAddressBookDialogComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'actions'];
  dataSource: MatTableDataSource<any>;
  messageFromChild: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(
    public dialogRef: MatDialogRef<ManageAddressBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private repositoryListAPI: RepositoryApiService

  ) { }

  ngOnInit() {
    //this.getUploadUserWiseCSV();
    this.getNewAddedEntry();
  }



  // getUploadUserWiseCSV() {
  //   this.repositoryListAPI.getUploadUserBaseCSV()
  //     .subscribe({
  //       next: (res) => {
  //         this.dataSource = new MatTableDataSource(res);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       },
  //       error: (err) => {
  //         alert("Error while fetching the Records.")
  //       }
  //     })
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

  uploadUserBase() {
    const dialogRef = this.dialog.open(UploadUserBaseDialogComponent, {
      width: '40%',
      data: this.data,
    });
    dialogRef.afterClosed().subscribe((val) => {
      this.repositoryListAPI.postNewEntry(val.data)
        .subscribe({
          next: (res) => {
            alert("New Entry Added Successfully.");
            this.getNewAddedEntry();
          },
          error: () => {
            alert("Error while adding the New Entry.")
          }
        })
      // if (val === 'upload') {
      //   this.getUploadUserWiseCSV();
      // }
    });
  }

  downloadCSV() {
    // CSV data as string
    const csvData = 'First Name,Last Name,Email,Mobile Number\nfirst_name,last_name,email id,99xxxxxxxx\n';

    // Create a blob object from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Generate a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'addressBookSample.csv';

    // Simulate a click on the download link to trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }


  newEntryDialog() {
    const dialogRef = this.dialog.open(NewEntryDialogComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe((val) => {

    });
  }

  getNewAddedEntry() {
    this.repositoryListAPI.getNewEntry()
      .subscribe({
        next: (res) => {
          console.log(res, "Get............");
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
          this.dataSource = new MatTableDataSource(newArr);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error while fetching the Records.")
        }
      })
  }
  addRow() {
    const dialogRef = this.dialog.open(NewEntryDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(val => {
      console.log("v111111111", val);
      if (val === 'add') {
        console.log("vaaaaaaaaaaa", val);
        this.getNewAddedEntry();
      }
    })
  }
  editRow(row: any) {
    const dialogRef = this.dialog.open(NewEntryDialogComponent, {
      width: '500px',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getNewAddedEntry();
      }
    })

  }
  deleteRow(id: number) {
    this.repositoryListAPI.deleteNewEntry(id)
      .subscribe({
        next: (res) => {
          alert("New Entry Deleted Successfully");
          this.getNewAddedEntry();
        },
        error: () => {
          alert("Error while deleting the records!!")
        }
      })
  }

  onDeleteAllRows(data: any) {
    this.dataSource.data = [];
    this.table.renderRows();
    this.repositoryListAPI.deleteAllRows(data)
      .subscribe({
        next: (res) => {
          alert("New Entry Deleted Successfully");
          this.getNewAddedEntry();
        },
        error: () => {
          alert("Error while deleting the records!!")
        }
      })

  }
}
