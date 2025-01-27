import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePostDialogComponent } from './image-post-dialog.component';

describe('ImagePostDialogComponent', () => {
  let component: ImagePostDialogComponent;
  let fixture: ComponentFixture<ImagePostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagePostDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
