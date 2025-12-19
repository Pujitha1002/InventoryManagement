import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AccessoriesComponent} from './accessories.component';

describe('Accessories', () => {
  let component: AccessoriesComponent;
  let fixture: ComponentFixture<AccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessoriesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
