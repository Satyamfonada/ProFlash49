import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SenderManagementApiService } from 'src/app/_services/sender-management-api.service';
import { UserManagementApiService } from 'src/app/_services/user-management-api.service';
import { Papa } from 'ngx-papaparse';
@Component({
  selector: 'app-upload-sender-sheet-dialog',
  templateUrl: './upload-sender-sheet-dialog.component.html',
  styleUrls: ['./upload-sender-sheet-dialog.component.scss']
})
export class UploadSenderSheetDialogComponent {
  uploadSenderManagementForm!:FormGroup;
  isWide = false;
  iconState = 'fullscreenExit';
  actionBtn: string = "Create Sender";
  selectOptions: string[] = [];
  selectedValue: string;
  selectedFile: any = null;
  test: any = [];


  constructor(
    public dialogRef: MatDialogRef<UploadSenderSheetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editUser: any,
    @Inject(MAT_DIALOG_DATA) public data: { selectedValue: string | null },
    @Inject(MAT_DIALOG_DATA) public list: any,
    private formBuilder: FormBuilder,
    private senderManagementApi: SenderManagementApiService,
    private userManagementApi: UserManagementApiService,
    private papa: Papa
  ) {
    if (!this.data || !this.data.selectedValue) {
      this.data = { selectedValue: null };
    }
  }

  ngOnInit(): void {
    this.userManagementApi.getUserManagement().subscribe((data) => {
      this.selectOptions = data;
    });
  
    this.uploadSenderForm();
  
    if (this.list && this.list.file) {
      this.uploadSenderManagementForm.controls['fileName'].setValue(this.list.fileName);
    }
  
    if (this.list && this.list.user) {
      this.uploadSenderManagementForm.controls['user'].setValue(this.list.user);
    }
  
    if (this.list && this.list.accountType) {
      this.uploadSenderManagementForm.controls['accountType'].setValue(this.list.accountType);
    }
  }
  

  uploadSenderForm() {
    this.uploadSenderManagementForm = this.formBuilder.group({
      fileName: [''],
      user: [''],
      accountType: []
    });
  }

  onSelectionChange(value: string): void {
    this.data.selectedValue = value;
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

  uploadCsvFile(ev) {
    this.selectedFile = ev;
  }

  handleFileSelect() {
    var files = this.selectedFile.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          for (let i = 0; i < results.data.length; i++) {
            let orderDetails = {
              order_id: results.data[i].Address,
              age: results.data[i].Age
            };
            this.test.push(orderDetails);
            console.log(this.test, "Test....")
          }
          console.log(results.data, "Results....")
       //   results.data.forEach(element => {
            this.senderManagementApi.postSenderManagement(results.data)
            .subscribe({
              next: (res) => {
                alert("New Sender Added Successfully.");
             //   this.senderManagementForm.reset();
            //this.dialogRef.close('save');
              },
              error: () => {
                alert("Error while adding the Users.");
              }
            });
        //  });
          this.dialogRef.close({ data: results.data });

        }
      });
    }
  }


  downloadCSV() {
    // CSV data as string
    const csvData = 'Name,Mobile Number\nname,99xxxxxxxx\n';

    // Create a blob object from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Generate a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'BulkSenderSample.csv';

    // Simulate a click on the download link to trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }



}
