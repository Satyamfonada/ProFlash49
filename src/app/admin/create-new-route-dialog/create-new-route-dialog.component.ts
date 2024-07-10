import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouteManagementApiService } from 'src/app/_services/route-management-api.service';

@Component({
  selector: 'app-create-new-route-dialog',
  templateUrl: './create-new-route-dialog.component.html',
  styleUrls: ['./create-new-route-dialog.component.scss']
})
export class CreateNewRouteDialogComponent {
  routeManagementForm !: FormGroup;
  isWide = false;
  iconState = 'fullscreenExit';
  actionBtn: string = "Create Route";


  constructor(public dialogRef: MatDialogRef<CreateNewRouteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    private formBuilder: FormBuilder,
    private routeManagementApi: RouteManagementApiService
  ) {
  }
  ngOnInit(): void {
    this.routeManagementForm = this.formBuilder.group({
      routeName: ['', Validators.required],
      nodeName: ['', Validators.required],
      routeAutoStart: ['', Validators.required],
      deleveryWaitTime: ['', Validators.required],
      routeTps: ['', Validators.required],
      routeStatus: ['', Validators.required],
      priority: ['', Validators.required],
      country: ['', Validators.required],
      routeType: ['', Validators.required],
      deductionBy: ['', Validators.required],
      connectionType: ['', Validators.required],
      selectedValue: ['', Validators.required],
      selectOperator: [''],
      countryCode: [''],
      sender: ['', Validators.required],
      inBoundURI: ['', Validators.required],
      outBoundURI: ['', Validators.required],
      messageValidity: ['', Validators.required],
      senderPrefix: ['', Validators.required],
      binaryAlphabet: ['', Validators.required],
      unicodeAlphabet: ['', Validators.required],
      corePoolSize: ['', Validators.required],
      maxPoolSize: ['', Validators.required],
      poolId: ['', Validators.required],
      startupTime: ['', Validators.required],
      shutdownTime: ['', Validators.required],
      routeParameter: ['', Validators.required]
    });

    if (this.editUser) {
      this.actionBtn = "Update";
      this.routeManagementForm.controls['routeName'].setValue(this.editUser.routeName);
      this.routeManagementForm.controls['nodeName'].setValue(this.editUser.nodeName);
      this.routeManagementForm.controls['routeAutoStart'].setValue(this.editUser.routeAutoStart);
      this.routeManagementForm.controls['deleveryWaitTime'].setValue(this.editUser.deleveryWaitTime);
      this.routeManagementForm.controls['routeTps'].setValue(this.editUser.routeTps);
      this.routeManagementForm.controls['routeStatus'].setValue(this.editUser.routeStatus);
      this.routeManagementForm.controls['priority'].setValue(this.editUser.priority);
      this.routeManagementForm.controls['country'].setValue(this.editUser.country);
      this.routeManagementForm.controls['routeType'].setValue(this.editUser.country);
      this.routeManagementForm.controls['deductionBy'].setValue(this.editUser.country);
      this.routeManagementForm.controls['connectionType'].setValue(this.editUser.connectionType);
      this.routeManagementForm.controls['selectedValue'].setValue(this.editUser.selectedValue);
      this.routeManagementForm.controls['selectOperator'].setValue(this.editUser.selectOperator);
      this.routeManagementForm.controls['countryCode'].setValue(this.editUser.countryCode);
      this.routeManagementForm.controls['sender'].setValue(this.editUser.sender);
      this.routeManagementForm.controls['inBoundURI'].setValue(this.editUser.inBoundURI);
      this.routeManagementForm.controls['outBoundURI'].setValue(this.editUser.outBoundURI);
      this.routeManagementForm.controls['messageValidity'].setValue(this.editUser.messageValidity);
      this.routeManagementForm.controls['senderPrefix'].setValue(this.editUser.senderPrefix);
      this.routeManagementForm.controls['binaryAlphabet'].setValue(this.editUser.binaryAlphabet);
      this.routeManagementForm.controls['unicodeAlphabet'].setValue(this.editUser.unicodeAlphabet);
      this.routeManagementForm.controls['corePoolSize'].setValue(this.editUser.corePoolSize);
      this.routeManagementForm.controls['maxPoolSize'].setValue(this.editUser.maxPoolSize);
      this.routeManagementForm.controls['poolId'].setValue(this.editUser.poolId);
      this.routeManagementForm.controls['startupTime'].setValue(this.editUser.startupTime);
      this.routeManagementForm.controls['shutdownTime'].setValue(this.editUser.shutdownTime);
      this.routeManagementForm.controls['routeParameter'].setValue(this.editUser.routeParameter);

    }
  }

  radioChange(event: any) {
    console.log(event, "Change....")
    this.routeManagementForm.get('countryCode').setValidators(null);
    this.routeManagementForm.get('selectOperator').setValidators(null);
    this.routeManagementForm.get('countryCode').patchValue(null);
    this.routeManagementForm.get('selectOperator').patchValue(null);
    if(event.value === "International"){
      this.routeManagementForm.get('countryCode').setValidators(Validators.required);
    } else if (event.value === "On-Net"){
      this.routeManagementForm.get('selectOperator').setValidators(Validators.required);
    }

  }

  createRouteManagementList() {
    console.log(this.editUser, "Edit User....");
    if (!this.editUser) {
      console.log(this.routeManagementForm, "---------1");
      if (this.routeManagementForm.valid) {
        console.log("createRouteManagementList method called...", this.routeManagementForm.value);
        this.routeManagementApi.postRouteManagement(this.routeManagementForm.value)
          .subscribe({
            next: (res) => {
              console.log(res, "Route Management Listing............");
              alert("New Route Added Successfully.");
              this.routeManagementForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding the Users.")
            }
          })
      }
    } else {
      this.updateRouteManagementList();
    }

  }

  updateRouteManagementList() {
    this.routeManagementApi.putRouteManagement(this.routeManagementForm.value, this.editUser.id)
      .subscribe({
        next: (res) => {
          alert("Route Row Updated Successfully");
          this.routeManagementForm.reset();
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

}
