import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderManagementComponent } from './sender-management.component';

describe('SenderManagementComponent', () => {
  let component: SenderManagementComponent;
  let fixture: ComponentFixture<SenderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
