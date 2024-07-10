import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent {
  resetPasswordForm !: FormGroup;
  isWide = false;
  iconState = 'fullscreenExit';

  constructor(public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,){

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
