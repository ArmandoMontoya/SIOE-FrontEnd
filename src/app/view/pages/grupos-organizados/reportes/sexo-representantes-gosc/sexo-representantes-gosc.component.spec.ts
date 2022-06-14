import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SexoRepresentantesGoscComponent } from './sexo-representantes-gosc.component';

describe('SexoRepresentantesGoscComponent', () => {
  let component: SexoRepresentantesGoscComponent;
  let fixture: ComponentFixture<SexoRepresentantesGoscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexoRepresentantesGoscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexoRepresentantesGoscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
