import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaCartasComponent } from './busqueda-cartas.component';

describe('BusquedaCartasComponent', () => {
  let component: BusquedaCartasComponent;
  let fixture: ComponentFixture<BusquedaCartasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaCartasComponent]
    });
    fixture = TestBed.createComponent(BusquedaCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
