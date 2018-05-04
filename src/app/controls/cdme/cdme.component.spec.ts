import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmeComponent } from './cdme.component';

describe('CdmeComponent', () => {
  let component: CdmeComponent;
  let fixture: ComponentFixture<CdmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
