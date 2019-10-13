import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMatTableComponent } from './generic-mattable.component';

describe('GenericMatTableComponent', () => {
  let component: GenericMatTableComponent;
  let fixture: ComponentFixture<GenericMatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericMatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
