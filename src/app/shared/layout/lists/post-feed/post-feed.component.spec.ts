import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFeedComponent } from './post-feed.component';

describe('PostFeedComponent', () => {
  let component: PostFeedComponent;
  let fixture: ComponentFixture<PostFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
