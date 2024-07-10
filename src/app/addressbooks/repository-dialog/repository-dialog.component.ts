import { Component,Inject, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RepositoryApiService } from 'src/app/_services/repository-api.service';


@Component({
  selector: 'app-repository-dialog',
  templateUrl: './repository-dialog.component.html',
  styleUrls: ['./repository-dialog.component.scss']
})
export class RepositoryDialogComponent {
  repositoryForm !:FormGroup;
  actionBtn:string = "Save";
  constructor(
    public dialogRef: MatDialogRef<RepositoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any, 
    private formBuilder: FormBuilder,
    private repositoryListAPI: RepositoryApiService
  ) { }

  ngOnInit(): void{
    this.repositoryForm = this.formBuilder.group({
      repositoryName: ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.repositoryForm.controls['repositoryName'].setValue(this.editData.repositoryName);
    }
  }

  onSaveClick() {
   if(!this.editData){
    if(this.repositoryForm.valid){
      this.repositoryListAPI.postRepositoryList(this.repositoryForm.value)
      .subscribe({
        next: (res) =>{
          alert("Repository Name Added Successfully.");
          this.repositoryForm.reset();
          this.dialogRef.close('save');
        },
        error: ()=>{
          alert("Error while adding the Repository.")
        }
      })
    }
   }else{
    this.updateRepositoryName();
  }

  }

  updateRepositoryName(){
    this.repositoryListAPI.putRepositoryList(this.repositoryForm.value, this.editData.id)
    .subscribe({
      next:(res) =>{
        alert("Repository Name Updated Successfully");
        this.repositoryForm.reset();
        this.dialogRef.close('update');
      },
      error:() =>{
        alert("Error while updating the records!")
      }
    })
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
