import { Component , ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BulkSmsBroadcastAPIService } from 'src/app/_services/bulksms-broadcast-api.service';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.scss']
})
export class ScheduledComponent {

  constructor(
    private bulkSmsBroadcastAPIService: BulkSmsBroadcastAPIService
  ){}

  displayedColumns: string[] = ['id', 'campaignName', 'nextFireTime', 'actions'];
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

  getBulkSmsBroadcastList() {
    this.bulkSmsBroadcastAPIService.getBulkSmsBoradcast()
      .subscribe({
        next: (res) => {
          console.log(res, "Mat-table Simple data....")
          let newArr = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].length > 0 && res[i]['actionType']=='schedule') {
              for (let j = 0; j < res[i].length; j++) {
                newArr.push(res[i][j]);
              }
            } else {
              if(res[i]['actionType']=='schedule') newArr.push(res[i]);
            }
          }
          console.log(newArr,'kkkkkkkkkkk')
          this.dataSource = new MatTableDataSource(newArr);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error while fetching the Records.")
        }
      })
  }

}
