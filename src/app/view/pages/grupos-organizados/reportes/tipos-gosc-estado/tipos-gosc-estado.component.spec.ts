import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposGoscEstadoComponent } from './tipos-gosc-estado.component';

describe('TiposGoscEstadoComponent', () => {
  let component: TiposGoscEstadoComponent;
  let fixture: ComponentFixture<TiposGoscEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposGoscEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposGoscEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
