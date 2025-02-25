import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorFeedComponent } from './author-feed.component';

describe('PostFeedComponent', () => {
  let component: AuthorFeedComponent;
  let fixture: ComponentFixture<AuthorFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
