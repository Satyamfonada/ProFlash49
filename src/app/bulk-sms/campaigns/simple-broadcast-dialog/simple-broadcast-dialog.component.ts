import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BulkSmsBroadcastAPIService } from 'src/app/_services/bulksms-broadcast-api.service';
import { SelectAddressBookDialogComponent } from '../select-address-book-dialog/select-address-book-dialog.component';
import { MessagePreviewDialogComponent } from '../message-preview-dialog/message-preview-dialog.component';

@Component({
  selector: 'app-simple-broadcast-dialog',
  templateUrl: './simple-broadcast-dialog.component.html',
  styleUrls: ['./simple-broadcast-dialog.component.scss']
})
export class SimpleBroadcastDialogComponent implements OnInit {
  simpleBroadcastForm !: FormGroup;
  selectedFile: any = null;
  isWide = false;
  iconState = 'fullscreenExit';
  actionBtn: string = "Save";
  myTextarea: string = '';
  charCount: number = 0;
  messageCount: number = 0;
  hasUnicode: boolean;
  selectedOption: string = '';



  constructor(
    public dialogRef: MatDialogRef<SimpleBroadcastDialogComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public simpleBroadcastUpdate: any,
    private bulkSmsBroadcastAPIService: BulkSmsBroadcastAPIService
  ) { }

  ngOnInit(): void {
    console.log(this.simpleBroadcastUpdate, "Simple Broadcast Update");
    this.simpleBroadcastForm = this.formBuilder.group({
      campaignName: ['', Validators.required],
      connectionType: new FormControl(),
      from: new FormControl(),
      to: ['', Validators.required],
      fileName: ['', Validators.required],
      selectTrackingURL: new FormControl(),
      encoding: new FormControl(),
      flashMessage: ['', Validators.required],
      dltContentId: ['', Validators.required],
      dltEntityId: ['', Validators.required],
      message: ['', Validators.required],
    });
    if (this.simpleBroadcastUpdate) {
      this.actionBtn = "Update";
      this.simpleBroadcastForm.controls['campaignName'].setValue(this.simpleBroadcastUpdate.campaignName);
      this.simpleBroadcastForm.controls['connectionType'].setValue(this.simpleBroadcastUpdate.connectionType);
      this.simpleBroadcastForm.controls['from'].setValue(this.simpleBroadcastUpdate.from);
      this.simpleBroadcastForm.controls['to'].setValue(this.simpleBroadcastUpdate.to);
      this.simpleBroadcastForm.controls['fileName'].setValue(this.simpleBroadcastUpdate.fileName);
      this.simpleBroadcastForm.controls['selectTrackingURL'].setValue(this.simpleBroadcastUpdate.selectTrackingURL);
      this.simpleBroadcastForm.controls['encoding'].setValue(this.simpleBroadcastUpdate.encoding);
      this.simpleBroadcastForm.controls['flashMessage'].setValue(this.simpleBroadcastUpdate.flashMessage);
      this.simpleBroadcastForm.controls['dltContentId'].setValue(this.simpleBroadcastUpdate.dltContentId);
      this.simpleBroadcastForm.controls['dltEntityId'].setValue(this.simpleBroadcastUpdate.dltEntityId);
      this.simpleBroadcastForm.controls['message'].setValue(this.simpleBroadcastUpdate.message);
    }
    this.updateDialogSize();
  }

  updateCharCount() {
    let charCount = this.myTextarea.replace(/[€^{}\[\]~|]/g, '__').length;
    let hasUnicode = /[^\x00-\x7F]/.test(this.myTextarea);
    let maxCharLength = hasUnicode ? 70 : 160;
    let flag = hasUnicode ? 3 : 7;
    this.charCount = charCount;
    this.messageCount = charCount <= maxCharLength ? 1 : Math.ceil((charCount - (maxCharLength - flag)) / (maxCharLength - flag)) + 1;

    this.hasUnicode = /[^\x00-\x7F]/.test(this.myTextarea);
    if (this.hasUnicode) {
      this.selectedOption = 'unicode-text';
    } else {
      this.selectedOption = 'plain-text';
    }
  }

  messagePreview() {
    this.dialog.open(MessagePreviewDialogComponent, {
      width: '40%',
      data: {
        myTextarea: this.myTextarea,
        charCount: this.charCount,
        messageCount:this.messageCount
      }
    });
  }

  createSimpleBroadcast(val) {
    if (!this.simpleBroadcastUpdate) {
      if (this.simpleBroadcastForm.valid) {
        this.simpleBroadcastForm.value['flag']='Simple';
        this.simpleBroadcastForm.value['actionType']=val;
        console.log('oooooo', this.simpleBroadcastForm.value);
        this.bulkSmsBroadcastAPIService.postBulkSmsBoradcast(this.simpleBroadcastForm.value)
          .subscribe({
            next: (res) => {
              console.log(res, "Simplebroadcast form data................")
              alert("URL Title Added Successfully.");
              this.simpleBroadcastForm.reset();
              this.dialogRef.close('create');
            },
            error: () => {
              alert("Error while adding the URL Title.")
            }
          })
      }
    } else {
      this.updatesSimpleBroadcast(val);
    }

  }

  updatesSimpleBroadcast(val) {
    this.simpleBroadcastForm.value['flag']='Simple';
    this.simpleBroadcastForm.value['actionType']=val;
    this.bulkSmsBroadcastAPIService.putBulkSmsBoradcast(this.simpleBroadcastForm.value, this.simpleBroadcastUpdate.id)
      .subscribe({
        next: (res) => {
          alert("URL Title Updated Successfully");
          this.simpleBroadcastForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the records!")
        }
      })
  }

  handleFileSelect1(ev) {
    //this.eventValue = ev;
  }

  cancel() {
    this.dialogRef.close();
  }

  selectAddressBook() {
    const dialogRef = this.dialog.open(SelectAddressBookDialogComponent, {
      width: '40%',
      data: {
        
      }
    }).afterClosed().subscribe(val => {
      if (val === 'save') {

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
