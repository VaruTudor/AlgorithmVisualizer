import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionElementComponent } from './action-element.component';

describe('ActionElementComponent', () => {
  let component: ActionElementComponent;
  let fixture: ComponentFixture<ActionElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
