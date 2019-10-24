import { TestBed } from '@angular/core/testing';

import { ExpensesCategoryService } from './expenses-category.service';

describe('ExpensesCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpensesCategoryService = TestBed.get(ExpensesCategoryService);
    expect(service).toBeTruthy();
  });
});
