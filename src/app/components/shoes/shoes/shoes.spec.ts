import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesComponent } from './shoes.component';

describe('Shoes', () => {
  let component: ShoesComponent;
  let fixture: ComponentFixture<ShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
