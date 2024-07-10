import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressbooksComponent } from './addressbooks.component';

describe('AddressbooksComponent', () => {
  let component: AddressbooksComponent;
  let fixture: ComponentFixture<AddressbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressbooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
