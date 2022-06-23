import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOrganismoComponent } from './tipo-organismo.component';

describe('TipoOrganismoComponent', () => {
  let component: TipoOrganismoComponent;
  let fixture: ComponentFixture<TipoOrganismoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoOrganismoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoOrganismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
