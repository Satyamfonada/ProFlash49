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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private senderIdManagementAPI: SenderIdManagementAPIService,
  ) {
  }
  ngOnInit(): void {
   
    const session = JSON.parse(sessionStorage.getItem('user')!);
    this.senderIdManagementForm = this.formBuilder.group({
      sender: ['', Validators.required],
      senderType: ['', Validators.required],
      dltPeId: ['', Validators.required],
      userId: session ? session.userId : null,
      senderId:['']
    })
    if (this.updateRequestSenderFields) {
      this.actionBtn = "Update";
      this.senderIdManagementForm.controls['sender'].setValue(this.updateRequestSenderFields.sender);
      this.senderIdManagementForm.controls['senderType'].setValue(this.updateRequestSenderFields.senderType);
      this.senderIdManagementForm.controls['dltPeId'].setValue(this.updateRequestSenderFields.dltPeId);
      this.senderIdManagementForm.controls['userId'].setValue(this.updateRequestSenderFields.userId)
      this.senderIdManagementForm.patchValue({ senderId: this.data.senderId });

    }
  }
  handleButtonClick(): void {
    if (this.updateRequestSenderFields) {
      this.updateSender();
      
    } else {
      this.createNewShortenedUrl();
    }
  }
  createNewShortenedUrl() {

    if (!this.updateRequestSenderFields) {
      if (this.senderIdManagementForm.valid) {
        this.senderIdManagementAPI.postSenderIdManagement(this.senderIdManagementForm.value)
          .subscribe({
            next: (res) => {
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
  updateSender() {


    if (this.updateRequestSenderFields) {

      if (this.senderIdManagementForm.valid) {
        this.senderIdManagementAPI.updatwSenderIdManagement(this.senderIdManagementForm.value)
          .subscribe({
            next: (res) => {
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
