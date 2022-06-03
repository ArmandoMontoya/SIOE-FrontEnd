import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProcesoComponent } from './agregar-proceso.component';

describe('AgregarProcesoComponent', () => {
  let component: AgregarProcesoComponent;
  let fixture: ComponentFixture<AgregarProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
