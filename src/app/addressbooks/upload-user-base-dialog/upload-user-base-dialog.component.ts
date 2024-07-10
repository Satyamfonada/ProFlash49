import { Component, ElementRef, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepositoryApiService } from 'src/app/_services/repository-api.service';
import { Papa } from 'ngx-papaparse';
@Component({
  selector: 'app-upload-user-base-dialog',
  templateUrl: './upload-user-base-dialog.component.html',
  styleUrls: ['./upload-user-base-dialog.component.scss']
})
export class UploadUserBaseDialogComponent {
  uploadUserBaseForm: FormGroup;
  selectedFile: any = null;
  httpClient: any;
  test: any = [];
  replaceFile:false;
  
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  @Output()
  message: EventEmitter<any> = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<UploadUserBaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private repositoryListAPI: RepositoryApiService,
    private papa: Papa) {

  }
  ngOnInit() {
    this.uploadUserForm();
    this.uploadUserBaseForm.controls['repositoryName'].setValue(this.data.repositoryName);
    this.uploadUserBaseForm.controls['fileName'].setValue(this.data.fileName);
    this.uploadUserBaseForm.controls['fileDeleted'].setValue(this.data.fileDeleted);
  }
  uploadUserForm() {
    this.uploadUserBaseForm = this.formBuilder.group({
      repositoryName: [''],
      fileName: [''],
      fileDeleted: []
    });
  }
  onCancelClick() {
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
          }
          this.dialogRef.close({ data: results.data });
        }
      });
    }
  }

  onFileDelete(ev) {
    if (ev.target.checked) {
      this.selectedFile = null;
    }
  }
  
}