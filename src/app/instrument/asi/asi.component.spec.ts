import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsiComponent } from './asi.component';

describe('AsiComponent', () => {
  let component: AsiComponent;
  let fixture: ComponentFixture<AsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
