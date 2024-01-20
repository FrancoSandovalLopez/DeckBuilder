import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaCartasComponent } from './busqueda-cartas/busqueda-cartas.component';
import { FiltroCartasComponent } from './filtro-cartas/filtro-cartas.component';
import { DynamicBackgroundComponent } from './dynamic-background/dynamic-background.component';



@NgModule({
  declarations: [BusquedaCartasComponent, FiltroCartasComponent],
  imports: [
    CommonModule
  ]
})
export class ViewsModule { }
