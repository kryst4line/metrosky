import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckColumnComponent } from './deck-column.component';

describe('DeckColumnComponent', () => {
  let component: DeckColumnComponent;
  let fixture: ComponentFixture<DeckColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
