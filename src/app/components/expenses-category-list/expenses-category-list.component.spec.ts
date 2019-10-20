import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesCategoryListComponent } from './expenses-category-list.component';

describe('ExpensesCategoryListComponent', () => {
  let component: ExpensesCategoryListComponent;
  let fixture: ComponentFixture<ExpensesCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
