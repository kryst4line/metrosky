import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadViewDialogComponent } from './thread-view-dialog.component';

describe('ImagePostDialogComponent', () => {
  let component: ThreadViewDialogComponent;
  let fixture: ComponentFixture<ThreadViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
