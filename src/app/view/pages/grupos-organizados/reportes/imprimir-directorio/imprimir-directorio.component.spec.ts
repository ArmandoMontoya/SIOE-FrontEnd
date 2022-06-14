import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirDirectorioComponent } from './imprimir-directorio.component';

describe('ImprimirDirectorioComponent', () => {
  let component: ImprimirDirectorioComponent;
  let fixture: ComponentFixture<ImprimirDirectorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimirDirectorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirDirectorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
