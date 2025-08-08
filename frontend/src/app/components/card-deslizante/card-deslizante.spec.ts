import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeslizante } from './card-deslizante';

describe('CardDeslizante', () => {
  let component: CardDeslizante;
  let fixture: ComponentFixture<CardDeslizante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDeslizante],
    }).compileComponents();

    fixture = TestBed.createComponent(CardDeslizante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
