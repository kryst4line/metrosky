import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextDisplayComponent } from './rich-text-display.component';

describe('RichTextComponent', () => {
  let component: RichTextDisplayComponent;
  let fixture: ComponentFixture<RichTextDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RichTextDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
