import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsModule } from './views/views.module';  // Make sure to import your ViewsModule
import { BusquedaCartasComponent } from './views/busqueda-cartas/busqueda-cartas.component';

const routes: Routes = [
  {
    path: 'BusquedaCartas',
    component: BusquedaCartasComponent,
  },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ViewsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}