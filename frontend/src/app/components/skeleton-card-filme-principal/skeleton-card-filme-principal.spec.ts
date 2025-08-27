import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCardFilmePrincipal } from './skeleton-card-filme-principal';

describe('SkeletonCardFilmePrincipal', () => {
  let component: SkeletonCardFilmePrincipal;
  let fixture: ComponentFixture<SkeletonCardFilmePrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonCardFilmePrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonCardFilmePrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
