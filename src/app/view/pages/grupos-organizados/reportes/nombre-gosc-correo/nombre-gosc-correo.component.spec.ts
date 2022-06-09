import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreGoscCorreoComponent } from './nombre-gosc-correo.component';

describe('NombreGoscCorreoComponent', () => {
  let component: NombreGoscCorreoComponent;
  let fixture: ComponentFixture<NombreGoscCorreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombreGoscCorreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreGoscCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
