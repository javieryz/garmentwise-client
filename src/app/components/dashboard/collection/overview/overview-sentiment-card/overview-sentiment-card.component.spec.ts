import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSentimentCardComponent } from './overview-sentiment-card.component';

describe('OverviewSentimentCardComponent', () => {
  let component: OverviewSentimentCardComponent;
  let fixture: ComponentFixture<OverviewSentimentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewSentimentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewSentimentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
