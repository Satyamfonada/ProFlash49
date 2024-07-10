import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTemplateComponent } from './manage-template.component';

describe('ManageTemplateComponent', () => {
  let component: ManageTemplateComponent;
  let fixture: ComponentFixture<ManageTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
