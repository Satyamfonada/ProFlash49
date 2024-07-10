import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RepositoryApiService } from 'src/app/_services/repository-api.service';
@Component({
  selector: 'app-new-entry-dialog',
  templateUrl: './new-entry-dialog.component.html',
  styleUrls: ['./new-entry-dialog.component.scss']
})
export class NewEntryDialogComponent {
  newEntryForm !: FormGroup;
  actionBtn:string = "Add";
  constructor(
    public dialogRef: MatDialogRef<NewEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any, 
    private formBuilder: FormBuilder,
    private repositoryListAPI: RepositoryApiService

  ) { 
   
  }

  ngOnInit(): void {
    this.newEntryForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.newEntryForm.controls['firstName'].setValue(this.editData.firstName);
      this.newEntryForm.controls['lastName'].setValue(this.editData.lastName);
      this.newEntryForm.controls['email'].setValue(this.editData.email);
      this.newEntryForm.controls['mobileNumber'].setValue(this.editData.mobileNumber);
    }
  }
  addNewEntry() {
    if(!this.editData){
      if (this.newEntryForm.valid) {
        this.repositoryListAPI.postNewEntry(this.newEntryForm.value)
          .subscribe({
            next: (res) => {
              alert("New Entry Added Successfully.");
              this.newEntryForm.reset();
              this.dialogRef.close('add');
            },
            error: () => {
              alert("Error while adding the New Entry.")
            }
          })
      }
    }else{
      this.updateNewEntryForm();
    }
      
  }

  updateNewEntryForm(){
    this.repositoryListAPI.putNewEntry(this.newEntryForm.value, this.editData.id)
    .subscribe({
      next:(res) =>{
        alert("New Entry Updated Successfully");
        this.newEntryForm.reset();
        this.dialogRef.close('update');
      },
      error:() =>{
        alert("Error while updating the records!")
      }
    })
  }


  
  cancel() {
    this.dialogRef.close();
  }
}
