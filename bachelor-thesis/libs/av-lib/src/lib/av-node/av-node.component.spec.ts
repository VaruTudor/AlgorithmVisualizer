import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvNodeComponent } from './av-node.component';

describe('AvNodeComponent', () => {
  let component: AvNodeComponent;
  let fixture: ComponentFixture<AvNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
