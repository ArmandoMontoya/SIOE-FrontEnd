import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirFichaCampoComponent } from './imprimir-ficha-campo.component';

describe('ImprimirFichaCampoComponent', () => {
  let component: ImprimirFichaCampoComponent;
  let fixture: ComponentFixture<ImprimirFichaCampoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimirFichaCampoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirFichaCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
