import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupLoginComponent } from './form-group-login.component';

describe('FormGroupLoginComponent', () => {
  let component: FormGroupLoginComponent;
  let fixture: ComponentFixture<FormGroupLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGroupLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
