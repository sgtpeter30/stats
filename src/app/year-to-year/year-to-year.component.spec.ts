import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearToYearComponent } from './year-to-year.component';

describe('YearToYearComponent', () => {
  let component: YearToYearComponent;
  let fixture: ComponentFixture<YearToYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearToYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearToYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
