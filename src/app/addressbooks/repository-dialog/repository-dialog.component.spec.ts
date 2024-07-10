import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryDialogComponent } from './repository-dialog.component';

describe('RepositoryDialogComponent', () => {
  let component: RepositoryDialogComponent;
  let fixture: ComponentFixture<RepositoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepositoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
