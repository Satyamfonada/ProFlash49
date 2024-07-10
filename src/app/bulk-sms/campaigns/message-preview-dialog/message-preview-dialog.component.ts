import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-message-preview-dialog',
  templateUrl: './message-preview-dialog.component.html',
  styleUrls: ['./message-preview-dialog.component.scss']
})
export class MessagePreviewDialogComponent {

  constructor(
   
    public dialogRef: MatDialogRef<MessagePreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

 
  cancel() {
    this.dialogRef.close();
  }

  
}
