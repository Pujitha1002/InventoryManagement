import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenComponent } from './men.component';

describe('Men', () => {
  let component: MenComponent;
  let fixture: ComponentFixture<MenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
