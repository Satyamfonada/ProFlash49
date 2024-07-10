import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BulkSmsBroadcastAPIService } from 'src/app/_services/bulksms-broadcast-api.service';

@Component({
  selector: 'app-dynamic-broadcast-dialog',
  templateUrl: './dynamic-broadcast-dialog.component.html',
  styleUrls: ['./dynamic-broadcast-dialog.component.scss']
})
export class DynamicBroadcastDialogComponent {
  dynamicBroadcastForm !:FormGroup;
  selectedFile: any = null;
  isWide = false;
  iconState = 'fullscreenExit';
  actionBtn: string = "Save";

  constructor(
    public dialogRef: MatDialogRef<DynamicBroadcastDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dynamicBroadcastUpdate: any,
    private bulkSmsBroadcastAPIService: BulkSmsBroadcastAPIService
  ){}

  ngOnInit(): void{
    this.dynamicBroadcastForm = this.formBuilder.group({
      campaignName: ['', Validators.required],
      connectionType: new FormControl(),
      from: new FormControl(),
      template: new FormControl(),
      fileName: ['', Validators.required],
      flashMessage: ['', Validators.required],
      dltContentId: ['', Validators.required]
    });
    if (this.dynamicBroadcastUpdate) {
      this.actionBtn = "Update";
      this.dynamicBroadcastForm.controls['campaignName'].setValue(this.dynamicBroadcastUpdate.campaignName);
      this.dynamicBroadcastForm.controls['connectionType'].setValue(this.dynamicBroadcastUpdate.connectionType);
      this.dynamicBroadcastForm.controls['from'].setValue(this.dynamicBroadcastUpdate.from);
      this.dynamicBroadcastForm.controls['template'].setValue(this.dynamicBroadcastUpdate.template);
      this.dynamicBroadcastForm.controls['fileName'].setValue(this.dynamicBroadcastUpdate.fileName);
      this.dynamicBroadcastForm.controls['flashMessage'].setValue(this.dynamicBroadcastUpdate.flashMessage);
      this.dynamicBroadcastForm.controls['dltContentId'].setValue(this.dynamicBroadcastUpdate.dltContentId);
    }
    this.updateDialogSize();
  }

  createDynamicBroadcast(val) {
    if (!this.dynamicBroadcastUpdate) {
      if (this.dynamicBroadcastForm.valid) {
        this.dynamicBroadcastForm.value['flag']='Dynamic';
        this.dynamicBroadcastForm.value['actionType']=val;
        this.bulkSmsBroadcastAPIService.postBulkSmsBoradcast(this.dynamicBroadcastForm.value)
          .subscribe({
            next: (res) => {
              console.log(res, "DynamicBroadcast form data................")
              alert("URL Title Added Successfully.");
              this.dynamicBroadcastForm.reset();
              this.dialogRef.close('create');
            },
            error: () => {
              alert("Error while adding the URL Title.")
            }
          })
      }
    } else {
      this.updatesDynamicBroadcast(val);
    }

  }

  updatesDynamicBroadcast(val) {
    this.dynamicBroadcastForm.value['flag']='Dynamic';
    this.dynamicBroadcastForm.value['actionType']=val;
    this.bulkSmsBroadcastAPIService.putBulkSmsBoradcast(this.dynamicBroadcastForm.value, this.dynamicBroadcastUpdate.id)
      .subscribe({
        next: (res) => {
          alert("URL Title Updated Successfully");
          this.dynamicBroadcastForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the records!")
        }
      })
  }

  handleFileSelect1(ev){
    //this.eventValue = ev;
  }

  cancel() {
    this.dialogRef.close();
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


   downloadCSV() {
    // CSV data as string
    const csvData = 'Mobile Number\n99xxxxxxxx\n';

    // Create a blob object from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Generate a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'UserBaseSample.csv';

    // Simulate a click on the download link to trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

}
