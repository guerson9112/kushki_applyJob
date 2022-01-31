import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [

  {
    path: '',
    component: InicioComponent
  },

  {
    path: 'cart',
    component: CartComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
