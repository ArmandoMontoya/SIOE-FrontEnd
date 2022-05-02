import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'nuevo',
        // loadChildren: () => import('./view/pages/inicio/inicio.module').then(module => module.InicioModule)
      },
      {
        path: 'detalle/:indice',
        // loadChildren: () => import('./view/pages/inicio/inicio.module').then(module => module.InicioModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
