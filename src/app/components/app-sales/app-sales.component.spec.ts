import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSalesComponent } from './app-sales.component';

describe('AppSalesComponent', () => {
  let component: AppSalesComponent;
  let fixture: ComponentFixture<AppSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
