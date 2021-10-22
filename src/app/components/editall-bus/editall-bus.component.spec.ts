import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditallBusComponent } from './editall-bus.component';

describe('EditallBusComponent', () => {
  let component: EditallBusComponent;
  let fixture: ComponentFixture<EditallBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditallBusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditallBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
