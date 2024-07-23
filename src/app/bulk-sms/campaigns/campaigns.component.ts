import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BulkSmsBroadcastAPIService } from 'src/app/_services/bulksms-broadcast-api.service';
import { DynamicBroadcastDialogComponent } from './dynamic-broadcast-dialog/dynamic-broadcast-dialog.component';
import { SimpleBroadcastDialogComponent } from './simple-broadcast-dialog/simple-broadcast-dialog.component';


@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent {
  displayedColumns: string[] = ['id', 'campaignName', 'connectionType', 'from', 'to', 'fileName', 'template', 'selectTrackingURL', 'encoding', 'flashMessage', 'dltContentId', 'dltEntityId', 'message', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showColumn: boolean = false;

  constructor(
    private dialog: MatDialog,
    private bulkSmsBroadcastAPIService: BulkSmsBroadcastAPIService
  ) { }

  ngOnInit(): void {
    this.getBulkSmsBroadcastList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  simpleBroadcastDialog() {
    this.dialog.open(SimpleBroadcastDialogComponent, {
      width: '60%'
    }).afterClosed().subscribe(val => {
      if (val === 'create') {
        this.getBulkSmsBroadcastList();
      }
    })
  }

  dynamicBroadcastDialog() {
    this.dialog.open(DynamicBroadcastDialogComponent, {
      width: '60%'
    }).afterClosed().subscribe(val => {
      if (val === 'create') {
        this.getBulkSmsBroadcastList();
      }
    })
  }

  getBulkSmsBroadcastList() {
    this.bulkSmsBroadcastAPIService.getBulkSmsBoradcast()
      .subscribe({
        next: (res) => {
          console.log(res, "Mat-table Simple data....")
          let newArr = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].length > 0) {
              for (let j = 0; j < res[i].length; j++) {
                newArr.push(res[i][j]);
              }
            } else {
              newArr.push(res[i]);
            }
          }
          this.dataSource = new MatTableDataSource(newArr);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log("Error while fetching the Records.")
        }
      })
  }


  editRow(row: any) {
    if (row['flag'] == 'Simple') {
      this.dialog.open(SimpleBroadcastDialogComponent, { width: '500px', data: row })
        .afterClosed().subscribe(val => {
          if (val === 'update') {
            this.getBulkSmsBroadcastList();
          }
        })
    }
    else {
      this.dialog.open(DynamicBroadcastDialogComponent, { width: '500px', data: row, })
        .afterClosed().subscribe(val => {
          if (val === 'update') {
            this.getBulkSmsBroadcastList();
          }
        })
    }

  }
  deleteRow(id: number) {
    this.bulkSmsBroadcastAPIService.deleteBulkSmsBoradcast(id)
      .subscribe({
        next: (res) => {
          alert("Simple Broadcast Row Deleted Successfully");
          this.getBulkSmsBroadcastList();
        },
        error: () => {
          alert("Error while deleting the records!!")
        }
      })

    this.bulkSmsBroadcastAPIService.deleteBulkSmsBoradcast(id)
      .subscribe({
        next: (res) => {
          alert("Dynamic Broadcast Row Deleted Successfully");
          this.getBulkSmsBroadcastList();
        },
        error: () => {
          alert("Error while deleting the records!!")
        }
      })
  }
}
