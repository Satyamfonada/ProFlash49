import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisToolReportingComponent } from './mis-tool-reporting.component';

describe('MisToolReportingComponent', () => {
  let component: MisToolReportingComponent;
  let fixture: ComponentFixture<MisToolReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisToolReportingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisToolReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
