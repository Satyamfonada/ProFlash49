import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateManagementAPIService } from 'src/app/_services/template-management-api.service';
@Component({
  selector: 'app-create-template-dialog',
  templateUrl: './create-template-dialog.component.html',
  styleUrls: ['./create-template-dialog.component.scss']
})
export class CreateTemplateDialogComponent {
  manageTemplateForm !: FormGroup;
  actionBtn: string = "Create";
  constructor(
    public dialogRef: MatDialogRef<CreateTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateTemplateFields: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private templateManagementAPI: TemplateManagementAPIService,
  ) {
  }
  ngOnInit(): void {
    const session = JSON.parse(sessionStorage.getItem('user')!);
    this.manageTemplateForm = this.formBuilder.group({
      templateLabel: ['', Validators.required],
      campType: ['', Validators.required],
      senderCode: ['', Validators.required],
      templateType: ['', Validators.required],
      dltCtId: ['', Validators.required],
      templateText: ['', Validators.required],
      tempalteId: [],
      userId: session ? session.userId : null,
    })
    if (this.updateTemplateFields) {
      this.actionBtn = "Update";
      this.manageTemplateForm.controls['templateLabel'].setValue(this.updateTemplateFields.templateLabel);
      this.manageTemplateForm.controls['campType'].setValue(this.updateTemplateFields.campType);
      this.manageTemplateForm.controls['senderCode'].setValue(this.updateTemplateFields.senderCode);
      this.manageTemplateForm.controls['templateType'].setValue(this.updateTemplateFields.templateType);
      this.manageTemplateForm.controls['dltCtId'].setValue(this.updateTemplateFields.dltCtId);
      this.manageTemplateForm.controls['templateText'].setValue(this.updateTemplateFields.templateText);
      this.manageTemplateForm.controls['userId'].setValue(this.updateTemplateFields.userId)
      this.manageTemplateForm.patchValue({ tempalteId: this.data.templateId });
    }
  }
  handleButtonClick(): void {
    if (this.updateTemplateFields) {
      this.updateUrlManagement();

    } else {
      this.createNewShortenedUrl();
    }
  }
  createNewShortenedUrl() {
    if (!this.updateTemplateFields) {
      if (this.manageTemplateForm.valid) {
        this.templateManagementAPI.postTemplateManagement(this.manageTemplateForm.value)
          .subscribe({
            next: (res) => {
              this.manageTemplateForm.reset();
              this.dialogRef.close('create');
            },
            error: () => {
              alert("Error while adding the Template Row.")
            }
          })
      }
    } else {
      this.updateUrlManagement();
    }

  }

  updateUrlManagement() {
    this.templateManagementAPI.updateTemplet(this.manageTemplateForm.value)
      .subscribe({
        next: (res) => {

          this.manageTemplateForm.reset();
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
