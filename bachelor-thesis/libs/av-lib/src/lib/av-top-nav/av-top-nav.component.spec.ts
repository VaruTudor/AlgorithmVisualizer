import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvTopNavComponent } from './av-top-nav.component';

describe('AvTopNavComponent', () => {
  let component: AvTopNavComponent;
  let fixture: ComponentFixture<AvTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvTopNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
