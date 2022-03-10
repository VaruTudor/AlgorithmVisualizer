import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvRectangleComponent } from './av-rectangle.component';

describe('AvRectangleComponent', () => {
  let component: AvRectangleComponent;
  let fixture: ComponentFixture<AvRectangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvRectangleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
