import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HsiComponent } from './hsi.component';

describe('HsiComponent', () => {
  let component: HsiComponent;
  let fixture: ComponentFixture<HsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
