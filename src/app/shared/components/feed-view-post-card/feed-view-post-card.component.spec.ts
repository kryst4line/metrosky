import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedViewPostCardComponent } from './feed-view-post-card.component';

describe('FeedPostViewCardComponent', () => {
  let component: FeedViewPostCardComponent;
  let fixture: ComponentFixture<FeedViewPostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedViewPostCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedViewPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
