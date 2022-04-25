import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavActionElementComponent } from './top-nav-action-element.component';

describe('TopNavActionElementComponent', () => {
  let component: TopNavActionElementComponent;
  let fixture: ComponentFixture<TopNavActionElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopNavActionElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavActionElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
