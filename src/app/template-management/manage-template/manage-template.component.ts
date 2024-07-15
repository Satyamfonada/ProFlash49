import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TemplateManagementAPIService } from 'src/app/_services/template-management-api.service';
import { CreateTemplateDialogComponent } from '../create-template-dialog/create-template-dialog.component';
@Component({
  selector: 'app-manage-template',
  templateUrl: './manage-template.component.html',
  styleUrls: ['./manage-template.component.scss']
})
export class ManageTemplateComponent {
  displayedColumns: string[] = ['id', 'templateLabel', 'campaignType', 'senders', 'templateType', 'dLTContentId', 'templateText', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private templateManagementAPI: TemplateManagementAPIService,
    private dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.getTemplateManagementList();
  }
  openCreateTemplateDialog() {
    const dialogRef = this.dialog.open(CreateTemplateDialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'create') {
        this.getTemplateManagementList();
      }
    })
  }
  getTemplateManagementList() {
    this.templateManagementAPI.getTemplateManagement()
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
    const dialogRef = this.dialog.open(CreateTemplateDialogComponent, {
      width: '500px',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getTemplateManagementList();
      }
    })
  }
  deleteRow(id: number) {
    this.templateManagementAPI.deleteTemplateManagement(id)
      .subscribe({
        next: (res) => {
          alert("Template Row Deleted Successfully");
          this.getTemplateManagementList();
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
    this.templateManagementAPI.updateTemplateStatus(element.templateId, element.status).subscribe(response => {
      alert(response.msg);
    });
  }
}
