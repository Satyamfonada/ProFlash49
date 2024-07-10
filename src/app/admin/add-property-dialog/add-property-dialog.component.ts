import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilterManagementApiService } from 'src/app/_services/filter-management-api.service';

@Component({
  selector: 'app-add-property-dialog',
  templateUrl: './add-property-dialog.component.html',
  styleUrls: ['./add-property-dialog.component.scss']
})
export class AddPropertyDialogComponent {
  addPropertyForm !: FormGroup;
  isWide = false;
  iconState = 'fullscreenExit';
  actionBtn: string = "Create";

  constructor(public dialogRef: MatDialogRef<AddPropertyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    private formBuilder: FormBuilder,
    private filterManagementApi: FilterManagementApiService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.addPropertyForm = this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });

    if (this.editUser) {
      this.actionBtn = "Update";
      this.addPropertyForm.controls['key'].setValue(this.editUser.key);
      this.addPropertyForm.controls['value'].setValue(this.editUser.value);
     }
    // this.addNewPropety();
  }
 
  addNewPropety() {
    if (!this.editUser) {
      if (this.addPropertyForm.valid) {
        this.filterManagementApi.postFilterManagement(this.addPropertyForm.value)
          .subscribe({
            next: (res) => {
              alert("New Filter Item Added Successfully.");
              this.addPropertyForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding the Users.")
            }
          })
      }
    } else {
      this.updatePropertyList();
    }

  }

  updatePropertyList() {
    this.filterManagementApi.putFilterManagement(this.addPropertyForm.value, this.editUser.id)
      .subscribe({
        next: (res) => {
          alert("Property Updated Successfully");
          this.addPropertyForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the records!")
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
