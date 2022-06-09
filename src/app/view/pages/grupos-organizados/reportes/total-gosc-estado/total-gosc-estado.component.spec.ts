import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalGoscEstadoComponent } from './total-gosc-estado.component';

describe('TotalGoscEstadoComponent', () => {
  let component: TotalGoscEstadoComponent;
  let fixture: ComponentFixture<TotalGoscEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalGoscEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalGoscEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
