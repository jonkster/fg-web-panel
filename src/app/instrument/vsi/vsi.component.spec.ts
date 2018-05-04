import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VsiComponent } from './vsi.component';

describe('VsiComponent', () => {
  let component: VsiComponent;
  let fixture: ComponentFixture<VsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
