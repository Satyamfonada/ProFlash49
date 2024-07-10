import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RepositoryApiService } from 'src/app/_services/repository-api.service';

@Component({
  selector: 'app-select-address-book-dialog',
  templateUrl: './select-address-book-dialog.component.html',
  styleUrls: ['./select-address-book-dialog.component.scss']
})
export class SelectAddressBookDialogComponent {
  selectAddressBook !: FormGroup;
  isWide = false;
  iconState = 'fullscreenExit';
  selectOptions: string[] = [];
  selectedValue: string;

  constructor(
    private repositoryListAPI: RepositoryApiService,
    @Inject(MAT_DIALOG_DATA) public data: { selectedValue: string },
    public dialogRef: MatDialogRef<SelectAddressBookDialogComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.selectAddressBook = this.formBuilder.group({
      repositoryName: ['', Validators.required]
    });
    this.updateDialogSize();

    this.repositoryListAPI.getRepositoryList().subscribe((data) => {
      data.forEach((item) => {
        this.selectOptions.push(item.repositoryName);
      });
    });
    this.selectedValue = this.data.selectedValue;
  }


  onSelectionChange(value: string): void {
    this.data.selectedValue = value;
  }

  saveSelection(): void {
    console.log(this.data.selectedValue);
    this.dialogRef.close(this.data.selectedValue);
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
    const width = this.isWide ? '100%' : '40%';
    this.dialogRef.updateSize(width);
  }

}
