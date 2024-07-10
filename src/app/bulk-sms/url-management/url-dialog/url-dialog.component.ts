import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UrlManagementAPIService } from 'src/app/_services/url-management-api.service';

@Component({
  selector: 'app-url-dialog',
  templateUrl: './url-dialog.component.html',
  styleUrls: ['./url-dialog.component.scss']
})
export class UrlDialogComponent {
  urlManagementForm !: FormGroup;
  actionBtn:string = "Create";
  constructor(
    public dialogRef: MatDialogRef<UrlDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateUrls: any,
    private formBuilder: FormBuilder,
    private urlManagmentAPI: UrlManagementAPIService,
  ) {

  }
  ngOnInit(): void{
    this.urlManagementForm = this.formBuilder.group({
      urlTitle:['', Validators.required],
      shortUrl:['', Validators.required]
    })

    if(this.updateUrls){
      this.actionBtn = "Update";
      this.urlManagementForm.controls['urlTitle'].setValue(this.updateUrls.urlTitle);
      this.urlManagementForm.controls['shortUrl'].setValue(this.updateUrls.shortUrl);
    }
  }

  createNewShortenedUrl() {
    if(!this.updateUrls){
     if(this.urlManagementForm.valid){
       this.urlManagmentAPI.postUrlManagement(this.urlManagementForm.value)
       .subscribe({
         next: (res) =>{
           alert("URL Title Added Successfully.");
           this.urlManagementForm.reset();
           this.dialogRef.close('create');
         },
         error: ()=>{
           alert("Error while adding the URL Title.")
         }
       })
     }
    }else{
     this.updateUrlManagement();
   }
 
   }
 
   updateUrlManagement(){
     this.urlManagmentAPI.putUrlManagement(this.urlManagementForm.value, this.updateUrls.id)
     .subscribe({
       next:(res) =>{
         alert("URL Title Updated Successfully");
         this.urlManagementForm.reset();
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
