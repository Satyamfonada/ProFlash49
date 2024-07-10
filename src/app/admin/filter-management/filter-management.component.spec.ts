import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterManagementComponent } from './filter-management.component';

describe('FilterManagementComponent', () => {
  let component: FilterManagementComponent;
  let fixture: ComponentFixture<FilterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
