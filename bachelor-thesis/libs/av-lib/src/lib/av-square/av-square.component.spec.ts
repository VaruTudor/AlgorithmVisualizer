import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvSquareComponent } from './av-square.component';

describe('AvSquareComponent', () => {
  let component: AvSquareComponent;
  let fixture: ComponentFixture<AvSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvSquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
