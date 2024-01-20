import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCartasComponent } from './filtro-cartas.component';

describe('FiltroCartasComponent', () => {
  let component: FiltroCartasComponent;
  let fixture: ComponentFixture<FiltroCartasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroCartasComponent]
    });
    fixture = TestBed.createComponent(FiltroCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
