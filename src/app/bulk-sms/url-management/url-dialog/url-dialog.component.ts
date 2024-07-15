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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private urlManagmentAPI: UrlManagementAPIService,
  ) {

  }
  ngOnInit(): void{
    debugger
    const session = JSON.parse(sessionStorage.getItem('user')!);
    this.urlManagementForm = this.formBuilder.group({
      title:['', Validators.required],
      url:['', Validators.required],
      longUrlId:[''],
      clientId: session ? session.userId : null,
    })

    if(this.updateUrls){
      this.actionBtn = "Update";
      this.urlManagementForm.controls['title'].setValue(this.updateUrls.title);
      this.urlManagementForm.controls['url'].setValue(this.updateUrls.url);
      this.urlManagementForm.patchValue({longUrlId:this.data.longUrlId})
    }
  }
  handleButtonClick(): void {
    if (this.updateUrls) {
      this.updateUrlManagement();

    } else {
      this.createNewShortenedUrl();
    }
  }
  createNewShortenedUrl() {
    if(!this.updateUrls){
     if(this.urlManagementForm.valid){
       this.urlManagmentAPI.postUrlManagement(this.urlManagementForm.value)
       .subscribe({
         next: (res) =>{
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
     this.urlManagmentAPI.putUrlManagement(this.urlManagementForm.value)
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
