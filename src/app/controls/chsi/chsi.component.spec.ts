import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChsiComponent } from './chsi.component';

describe('ChsiComponent', () => {
  let component: ChsiComponent;
  let fixture: ComponentFixture<ChsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
