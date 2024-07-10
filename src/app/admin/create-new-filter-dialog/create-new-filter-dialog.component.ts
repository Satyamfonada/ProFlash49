import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FilterManagementApiService } from 'src/app/_services/filter-management-api.service';
import { AddPropertyDialogComponent } from '../add-property-dialog/add-property-dialog.component';

@Component({
  selector: 'app-create-new-filter-dialog',
  templateUrl: './create-new-filter-dialog.component.html',
  styleUrls: ['./create-new-filter-dialog.component.scss']
})
export class CreateNewFilterDialogComponent {
  filterManagementForm !: FormGroup;
  isWide = false;
  iconState = 'fullscreenExit';
  actionBtn: string = "Create";

  displayedColumns: string[] = ['key', 'value', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public dialogRef: MatDialogRef<CreateNewFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    private formBuilder: FormBuilder,
    private filterManagementApi: FilterManagementApiService,
    private dialog: MatDialog,
  ) {
  }
  ngOnInit(): void {
    this.filterManagementForm = this.formBuilder.group({
      filterName: ['', Validators.required],
      filterClass: ['', Validators.required],
      filterOrder: ['', Validators.required],
      queueName: ['', Validators.required],
      excludedUser: ['', Validators.required],
      includedUser: ['', Validators.required],
      status: ['', Validators.required],

    });

    if (this.editUser) {
      this.actionBtn = "Update";
      this.filterManagementForm.controls['filterName'].setValue(this.editUser.filterName);
      this.filterManagementForm.controls['filterClass'].setValue(this.editUser.filterClass);
      this.filterManagementForm.controls['filterOrder'].setValue(this.editUser.filterOrder);
      this.filterManagementForm.controls['queueName'].setValue(this.editUser.queueName);
      this.filterManagementForm.controls['excludedUser'].setValue(this.editUser.excludedUser);
      this.filterManagementForm.controls['includedUser'].setValue(this.editUser.includedUser);
      this.filterManagementForm.controls['status'].setValue(this.editUser.status);

    }
    this.getAllAddedNewPropetyList();
  }

  createFilterManagementList() {
    if (!this.editUser) {
      if (this.filterManagementForm.valid) {
        this.filterManagementApi.postFilterManagement(this.filterManagementForm.value)
          .subscribe({
            next: (res) => {
              alert("New Filter Item Added Successfully.");
              this.filterManagementForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding the Users.")
            }
          })
      }
    } else {
      this.updateUserManagementList();
    }

  }

  updateUserManagementList() {
    this.filterManagementApi.putFilterManagement(this.filterManagementForm.value, this.editUser.id)
      .subscribe({
        next: (res) => {
          alert("Filter Updated Successfully");
          this.filterManagementForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the records!")
        }
      })
  }

  getAllAddedNewPropetyList() {
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

  addNewPropertyDialog() {
    const dialogRef = this.dialog.open(AddPropertyDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllAddedNewPropetyList();
      }
    })
  }
  editUserRow(list: any) {
    const dialogRef = this.dialog.open(AddPropertyDialogComponent, {
      width: '40%',
      data: list,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllAddedNewPropetyList();
      }
    })

  }
  deleteUserRow(id: number) {
    this.filterManagementApi.deleteFilterManagement(id)
      .subscribe({
        next: (res) => {
          alert("Propety Row Deleted Successfully");
          this.getAllAddedNewPropetyList();
        },
        error: () => {
          alert("Error while deleting the records!!")
        }
      })
  }


  toggleDialogWidth() {
    this.isWide = !this.isWide;
    this.updateDialogSize();
  }
  updateDialogSize(): void {
    this.iconState = this.iconState === 'fullscreenExit' ? 'fullscreen' : 'fullscreenExit';
    const width = this.isWide ? '100%' : '40%';
    this.dialogRef.updateSize(width);
  }
  cancel() {
    this.dialogRef.close();
  }

}
