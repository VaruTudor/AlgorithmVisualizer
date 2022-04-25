import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvTopNavElementComponent } from './av-top-nav-element.component';

describe('AvTopNavElementComponent', () => {
  let component: AvTopNavElementComponent;
  let fixture: ComponentFixture<AvTopNavElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvTopNavElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvTopNavElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
