import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProcesoComponent } from './listar-proceso.component';

describe('ListarProcesoComponent', () => {
  let component: ListarProcesoComponent;
  let fixture: ComponentFixture<ListarProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
