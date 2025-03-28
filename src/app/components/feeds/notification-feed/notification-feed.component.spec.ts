import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFeedComponent } from './notification-feed.component';

describe('PostFeedComponent', () => {
  let component: NotificationFeedComponent;
  let fixture: ComponentFixture<NotificationFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
