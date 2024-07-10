import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SenderIdManagementAPIService } from 'src/app/_services/sender-id-management-api.service';
@Component({
  selector: 'app-request-sender-dialog',
  templateUrl: './request-sender-dialog.component.html',
  styleUrls: ['./request-sender-dialog.component.scss']
})
export class RequestSenderDialogComponent {
  senderIdManagementForm !: FormGroup;
  actionBtn: string = "Create";
  constructor(
    public dialogRef: MatDialogRef<RequestSenderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateRequestSenderFields: any,
    private formBuilder: FormBuilder,
    private senderIdManagementAPI: SenderIdManagementAPIService,
  ) {
  }
  ngOnInit(): void {
    const session = JSON.parse(sessionStorage.getItem('user')!);
    console.log(session)
    this.senderIdManagementForm = this.formBuilder.group({
      sender: ['', Validators.required],
      senderType: ['', Validators.required],
      dltPeId: ['', Validators.required],
      userId: session ? session.userId : null
    })
    if (this.updateRequestSenderFields) {
      this.actionBtn = "Update";
      this.senderIdManagementForm.controls['sender'].setValue(this.updateRequestSenderFields.sender);
      this.senderIdManagementForm.controls['senderType'].setValue(this.updateRequestSenderFields.senderType);
      this.senderIdManagementForm.controls['dltPeId'].setValue(this.updateRequestSenderFields.dltPeId);
    }
  }
  createNewShortenedUrl() {
    console.log(this.senderIdManagementForm.value)
    if (!this.updateRequestSenderFields) {
      if (this.senderIdManagementForm.valid) {
        this.senderIdManagementAPI.postSenderIdManagement(this.senderIdManagementForm.value)
          .subscribe({
            next: (res) => {
              alert("Request Sender Row Added Successfully.");
              this.senderIdManagementForm.reset();
              this.dialogRef.close('create');
            },
            error: () => {
              alert("Error while adding the Request Sender.")
            }
          })
      }
    } else {
      this.updateUrlManagement();
    }
  }
  updateUrlManagement() {
    this.senderIdManagementAPI.putSenderIdManagement(this.senderIdManagementForm.value, this.updateRequestSenderFields.id)
      .subscribe({
        next: (res) => {
          alert("Request Sender Row Updated Successfully");
          this.senderIdManagementForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the records!")
        }
      })
  }
  cancel() {
    this.dialogRef.close();
  }
}
