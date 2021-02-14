import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleObjectComponent } from './single-object.component';

describe('SingleObjectComponent', () => {
  let component: SingleObjectComponent;
  let fixture: ComponentFixture<SingleObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
