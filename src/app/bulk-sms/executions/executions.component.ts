import { Component , ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BulkSmsBroadcastAPIService } from 'src/app/_services/bulksms-broadcast-api.service';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.scss']
})
export class ExecutionsComponent {
  lastExecutionTime: Date;
constructor(
  private bulkSmsBroadcastAPIService: BulkSmsBroadcastAPIService
){}

  displayedColumns: string[] = ['id', 'campaignName', 'executionId', 'lastExecutionTime','state', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit():void{
    this.getBulkSmsBroadcastList();
  }

  updateLastExecutionTime() {
    this.lastExecutionTime = new Date();
    console.log("Last Execution Time:", this.lastExecutionTime = new Date())
    
  }

  getBulkSmsBroadcastList() {
    this.bulkSmsBroadcastAPIService.getBulkSmsBoradcast()
      .subscribe({
        next: (res) => {
          console.log(res, "Mat-table Simple data....")
          let newArr = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].length > 0 && res[i]['actionType']=='execute') {
              for (let j = 0; j < res[i].length; j++) {
                newArr.push(res[i][j]);
              }
            } else {
              if(res[i]['actionType']=='execute') newArr.push(res[i]);
            }
          }
          console.log(newArr,'kkkkkkkkkkk')
          this.dataSource = new MatTableDataSource(newArr);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.data = [...newArr, { lastExecutionTime: this.lastExecutionTime }];

        },
        error: (err) => {
          alert("Error while fetching the Records.")
        }
      })
  }

}
