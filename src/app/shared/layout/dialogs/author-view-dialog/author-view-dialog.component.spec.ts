import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorViewDialogComponent } from './author-view-dialog.component';

describe('ImagePostDialogComponent', () => {
  let component: AuthorViewDialogComponent;
  let fixture: ComponentFixture<AuthorViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
