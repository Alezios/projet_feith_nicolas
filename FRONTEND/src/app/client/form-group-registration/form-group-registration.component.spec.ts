import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupRegistrationComponent } from './form-group-registration.component';

describe('FormGroupRegistrationComponent', () => {
  let component: FormGroupRegistrationComponent;
  let fixture: ComponentFixture<FormGroupRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGroupRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
