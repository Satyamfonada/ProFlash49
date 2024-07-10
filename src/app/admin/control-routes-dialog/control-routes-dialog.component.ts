import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-control-routes-dialog',
  templateUrl: './control-routes-dialog.component.html',
  styleUrls: ['./control-routes-dialog.component.scss']
})
export class ControlRoutesDialogComponent {
  manageSelectorForm !: FormGroup;
  isWide = false;
  iconState = 'fullscreenExit';
  actionBtn: string = "Create";

  constructor(public dialogRef: MatDialogRef<ControlRoutesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.manageSelectorForm = this.formBuilder.group({
      userId: ['', Validators.required],
    });
  }
  execute(){

  }
  toggleDialogWidth() {
    this.isWide = !this.isWide;
    this.updateDialogSize();
  }
  updateDialogSize(): void {
    this.iconState = this.iconState === 'fullscreenExit' ? 'fullscreen' : 'fullscreenExit';
    const width = this.isWide ? '100%' : '60%';
    this.dialogRef.updateSize(width);
  }
  cancel() {
    this.dialogRef.close();
  }
}
