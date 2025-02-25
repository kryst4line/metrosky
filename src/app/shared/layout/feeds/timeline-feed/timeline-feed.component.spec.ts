import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFeedComponent } from './timeline-feed.component';

describe('PostFeedComponent', () => {
  let component: TimelineFeedComponent;
  let fixture: ComponentFixture<TimelineFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
