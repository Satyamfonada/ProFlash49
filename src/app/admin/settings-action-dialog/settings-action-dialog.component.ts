import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilterManagementApiService } from 'src/app/_services/filter-management-api.service';

@Component({
  selector: 'app-settings-action-dialog',
  templateUrl: './settings-action-dialog.component.html',
  styleUrls: ['./settings-action-dialog.component.scss']
})
export class SettingsActionDialogComponent {
  executeActionForm !: FormGroup;
  isWide = false;
  iconState = 'fullscreenExit';
  actionBtn: string = "Create";

  constructor(public dialogRef: MatDialogRef<SettingsActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    private formBuilder: FormBuilder,
    private filterManagementApi: FilterManagementApiService,
    private dialog: MatDialog,
  ) {
  }

  executeSettingsDialog(){
    
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
