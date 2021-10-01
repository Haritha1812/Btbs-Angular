import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbookingsCustomerComponent } from './viewbookings-customer.component';

describe('ViewbookingsCustomerComponent', () => {
  let component: ViewbookingsCustomerComponent;
  let fixture: ComponentFixture<ViewbookingsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbookingsCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbookingsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
