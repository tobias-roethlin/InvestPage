import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DCFOverviewComponent } from './dcfoverview.component';

describe('DCFOverviewComponent', () => {
  let component: DCFOverviewComponent;
  let fixture: ComponentFixture<DCFOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DCFOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DCFOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
