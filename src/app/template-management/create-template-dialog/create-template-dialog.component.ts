import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateManagementAPIService } from 'src/app/_services/template-management-api.service';
@Component({
  selector: 'app-create-template-dialog',
  templateUrl: './create-template-dialog.component.html',
  styleUrls: ['./create-template-dialog.component.scss']
})
export class CreateTemplateDialogComponent {
  manageTemplateForm !: FormGroup;
  actionBtn:string = "Create";
  constructor(
    public dialogRef: MatDialogRef<CreateTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateTemplateFields: any,
    private formBuilder: FormBuilder,
    private templateManagementAPI: TemplateManagementAPIService,
  ) {

  }
  ngOnInit(): void{
    this.manageTemplateForm = this.formBuilder.group({
      templateLabel:['', Validators.required],
      campaignType:['', Validators.required],
      senders:['', Validators.required],
      templateType:['', Validators.required],
      dLTContentId:['', Validators.required],
      templateText:['', Validators.required],
    })

    if(this.updateTemplateFields){
      this.actionBtn = "Update";
      this.manageTemplateForm.controls['templateLabel'].setValue(this.updateTemplateFields.templateLabel);
      this.manageTemplateForm.controls['campaignType'].setValue(this.updateTemplateFields.campaignType);
      this.manageTemplateForm.controls['senders'].setValue(this.updateTemplateFields.senders);
      this.manageTemplateForm.controls['templateType'].setValue(this.updateTemplateFields.templateType);
      this.manageTemplateForm.controls['dLTContentId'].setValue(this.updateTemplateFields.dLTContentId);
      this.manageTemplateForm.controls['templateText'].setValue(this.updateTemplateFields.templateText);
    }
  }

  createNewShortenedUrl() {
    if(!this.updateTemplateFields){
     if(this.manageTemplateForm.valid){
       this.templateManagementAPI.postTemplateManagement(this.manageTemplateForm.value)
       .subscribe({
         next: (res) =>{
           alert("Template Row Added Successfully.");
           this.manageTemplateForm.reset();
           this.dialogRef.close('create');
         },
         error: ()=>{
           alert("Error while adding the Template Row.")
         }
       })
     }
    }else{
     this.updateUrlManagement();
   }
 
   }
 
   updateUrlManagement(){
     this.templateManagementAPI.putTemplateManagement(this.manageTemplateForm.value, this.updateTemplateFields.id)
     .subscribe({
       next:(res) =>{
         alert("Template Row Updated Successfully");
         this.manageTemplateForm.reset();
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
