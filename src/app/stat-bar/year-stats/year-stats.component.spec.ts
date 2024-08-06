import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearStatsComponent } from './year-stats.component';

describe('YearStatsComponent', () => {
  let component: YearStatsComponent;
  let fixture: ComponentFixture<YearStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
