import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoTema } from './botao-tema';

describe('BotaoTema', () => {
  let component: BotaoTema;
  let fixture: ComponentFixture<BotaoTema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoTema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoTema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
