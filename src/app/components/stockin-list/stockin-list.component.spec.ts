import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockinListComponent } from './stockin-list.component';

describe('StockinListComponent', () => {
  let component: StockinListComponent;
  let fixture: ComponentFixture<StockinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockinListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
