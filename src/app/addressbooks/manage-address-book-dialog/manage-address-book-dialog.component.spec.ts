import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddressBookDialogComponent } from './manage-address-book-dialog.component';

describe('ManageAddressBookDialogComponent', () => {
  let component: ManageAddressBookDialogComponent;
  let fixture: ComponentFixture<ManageAddressBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAddressBookDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAddressBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
