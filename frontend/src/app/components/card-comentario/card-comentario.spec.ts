import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComentario } from './card-comentario';

describe('CardComentario', () => {
  let component: CardComentario;
  let fixture: ComponentFixture<CardComentario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComentario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComentario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
