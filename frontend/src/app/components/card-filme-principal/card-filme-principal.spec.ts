import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFilmePrincipal } from './card-filme-principal';

describe('CardFilmePrincipal', () => {
  let component: CardFilmePrincipal;
  let fixture: ComponentFixture<CardFilmePrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFilmePrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFilmePrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
