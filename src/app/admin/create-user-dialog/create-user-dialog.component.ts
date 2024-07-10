import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserManagementApiService } from 'src/app/_services/user-management-api.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent {
  userManagementForm !: FormGroup;
  isWide = false;
  iconState = 'fullscreenExit';
  actionBtn: string = "Create";
  typeOfDeliveryAccount: string[] = ['Normal', 'On-Net', 'OTP', 'International'];
  selectedFileName: string;
  selectedFile: string;

  constructor(public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    private formBuilder: FormBuilder,
    private userManagementApi: UserManagementApiService
  ) {
  }
  ngOnInit(): void {
    this.userManagementForm = this.formBuilder.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      gstNumber: ['', [Validators.required, Validators.pattern('^\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}\\d[Z]{1}[A-Z\\d]{1}$'), Validators.maxLength(15)]],
      panNumber: ['', [Validators.required, Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$'), Validators.maxLength(10)]],
      tps: ['', Validators.required],
      dltTelemarketerId: ['', Validators.required],
      dltPrincipalEntityId: ['', Validators.required],
      accountManager: ['', Validators.required],
      creditDeductionBy: ['', Validators.required],
      typeOfDeliveryAccount: ['', Validators.required],
      country: ['', Validators.required],
      security: ['', Validators.required],
      enableDndFiltering: ['', Validators.required],
      numberOfTrackLink: ['', Validators.required],
      authorization: ['', Validators.required],
      trackLinkDomain: ['', Validators.required],
      accountStatus: ['', Validators.required],
      imageUpload: ['', Validators.required],
      copyrightText: ['', Validators.required],
      allowFromIp: ['', Validators.required],
    },
      { validators: this.passwordMatchValidator });

    if (this.editUser) {
      this.actionBtn = "Update";
      this.userManagementForm.controls['userId'].setValue(this.editUser.userId);
      this.userManagementForm.controls['firstName'].setValue(this.editUser.firstName);
      this.userManagementForm.controls['lastName'].setValue(this.editUser.lastName);
      this.userManagementForm.controls['address'].setValue(this.editUser.address);
      this.userManagementForm.controls['emailId'].setValue(this.editUser.emailId);
      this.userManagementForm.controls['mobileNumber'].setValue(this.editUser.mobileNumber);
      this.userManagementForm.controls['password'].setValue(this.editUser.password);
      this.userManagementForm.controls['confirmPassword'].setValue(this.editUser.confirmPassword);
      this.userManagementForm.controls['gstNumber'].setValue(this.editUser.gstNumber);
      this.userManagementForm.controls['panNumber'].setValue(this.editUser.panNumber);
      this.userManagementForm.controls['tps'].setValue(this.editUser.tps);
      this.userManagementForm.controls['dltTelemarketerId'].setValue(this.editUser.dltTelemarketerId);
      this.userManagementForm.controls['dltPrincipalEntityId'].setValue(this.editUser.dltPrincipalEntityId);
      this.userManagementForm.controls['accountManager'].setValue(this.editUser.creditDeductionBy);
      this.userManagementForm.controls['typeOfDeliveryAccount'].setValue(this.editUser.typeOfDeliveryAccount);
      this.userManagementForm.controls['country'].setValue(this.editUser.country);
      this.userManagementForm.controls['security'].setValue(this.editUser.security);
      this.userManagementForm.controls['enableDndFiltering'].setValue(this.editUser.enableDndFiltering);
      this.userManagementForm.controls['numberOfTrackLink'].setValue(this.editUser.numberOfTrackLink);
      this.userManagementForm.controls['authorization'].setValue(this.editUser.authorization);
      this.userManagementForm.controls['trackLinkDomain'].setValue(this.editUser.trackLinkDomain);
      this.userManagementForm.controls['accountStatus'].setValue(this.editUser.accountStatus);
      this.userManagementForm.controls['imageUpload'].setValue(this.editUser.imageUpload);
      this.userManagementForm.controls['copyrightText'].setValue(this.editUser.copyrightText);
      this.userManagementForm.controls['allowFromIp'].setValue(this.editUser.allowFromIp);
    }
  }

//Form Validations Start Here
  onMobileNumberKeydown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'];

    if (!allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
      event.preventDefault();
    }
  }

  // Custom password match validator function
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }
  //Form Validations End Here

  createUserManagementList() {
    if (!this.editUser) {
      if (this.userManagementForm.valid) {
        this.userManagementApi.postUserManagement(this.userManagementForm.value)
          .subscribe({
            next: (res) => {
              alert("New User Added Successfully.");
              this.userManagementForm.reset();
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
    this.userManagementApi.putUserManagement(this.userManagementForm.value, this.editUser.id)
      .subscribe({
        next: (res) => {
          alert("Repository Name Updated Successfully");
          this.userManagementForm.reset();
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
    const width = this.isWide ? '100%' : '60%';
    this.dialogRef.updateSize(width);
  }
  cancel() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFileName = file ? file.name : '';

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFile = e.target.result;
    };
    reader.readAsDataURL(file);
    // Perform additional operations with the selected file if needed
  }

}
