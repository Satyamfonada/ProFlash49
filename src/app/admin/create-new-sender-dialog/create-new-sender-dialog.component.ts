import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SenderManagementApiService } from 'src/app/_services/sender-management-api.service';
import { UserManagementApiService } from 'src/app/_services/user-management-api.service';

@Component({
  selector: 'app-create-new-sender-dialog',
  templateUrl: './create-new-sender-dialog.component.html',
  styleUrls: ['./create-new-sender-dialog.component.scss']
})
export class CreateNewSenderDialogComponent {
  senderManagementForm!: FormGroup;
  isWide = false;
  iconState = 'fullscreenExit';
  actionBtn: string = "Create Sender";
  selectOptions: string[] = [];
  selectedValue: string;

  constructor(
    public dialogRef: MatDialogRef<CreateNewSenderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    @Inject(MAT_DIALOG_DATA) public data: { selectedValue: string | null },
    private formBuilder: FormBuilder,
    private senderManagementApi: SenderManagementApiService,
    private userManagementApi: UserManagementApiService
  ) {
    if (!this.data || !this.data.selectedValue) {
      this.data = { selectedValue: null };
    }
  }

  ngOnInit(): void {
    this.senderManagementForm = this.formBuilder.group({
      senderName: ['', Validators.required],
      user: ['', Validators.required],
      senderAllocationStatus: ['', Validators.required],
      accountType: ['', Validators.required],
      dltPrincipalEntityId: ['', Validators.required]
    });

    this.userManagementApi.getUserManagement().subscribe((data) => {
      this.selectOptions = data;
    });

    
    if (this.editUser) {
      this.actionBtn = "Update";
      this.senderManagementForm.patchValue({
        senderName: this.editUser.senderName,
        user: this.editUser.user,
        senderAllocationStatus: this.editUser.senderAllocationStatus,
        accountType: this.editUser.accountType,
        dltPrincipalEntityId: this.editUser.dltPrincipalEntityId
      });
    }
  }

  onSelectionChange(value: string): void {
    this.data.selectedValue = value;
  }

  createSenderManagementList() {
    if (!this.editUser) {
      if (this.senderManagementForm.valid) {
        this.senderManagementApi.postSenderManagement(this.senderManagementForm.value)
          .subscribe({
            next: (res) => {
              alert("New Sender Added Successfully.");
              this.senderManagementForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding the Users.");
            }
          });
      }
    } else {
      this.updateSenderManagementList();
    }
  }

  updateSenderManagementList() {
    this.senderManagementApi.putSenderManagement(this.senderManagementForm.value, this.editUser.id)
      .subscribe({
        next: (res) => {
          alert("Sender List Updated Successfully");
          this.senderManagementForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the records!");
        }
      });
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
