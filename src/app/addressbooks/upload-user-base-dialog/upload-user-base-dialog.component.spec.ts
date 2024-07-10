import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUserBaseDialogComponent } from './upload-user-base-dialog.component';

describe('UploadUserBaseDialogComponent', () => {
  let component: UploadUserBaseDialogComponent;
  let fixture: ComponentFixture<UploadUserBaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadUserBaseDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadUserBaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
