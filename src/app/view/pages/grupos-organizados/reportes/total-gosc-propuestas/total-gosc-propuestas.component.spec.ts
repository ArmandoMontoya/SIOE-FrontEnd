import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalGoscPropuestasComponent } from './total-gosc-propuestas.component';

describe('TotalGoscPropuestasComponent', () => {
  let component: TotalGoscPropuestasComponent;
  let fixture: ComponentFixture<TotalGoscPropuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalGoscPropuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalGoscPropuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
