import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuarios',
        // loadChildren: () => import('./view/pages/inicio/inicio.module').then(module => module.InicioModule)
      },
      {
        path: 'unidades',
        // loadChildren: () => import('./view/pages/inicio/inicio.module').then(module => module.InicioModule)
      },
      {
        path: 'distribucion',
        // loadChildren: () => import('./view/pages/inicio/inicio.module').then(module => module.InicioModule)
      },
      {
        path: 'tipos',
        // loadChildren: () => import('./view/pages/inicio/inicio.module').then(module => module.InicioModule)
      },
      {
        path: 'lugares',
        // loadChildren: () => import('./view/pages/inicio/inicio.module').then(module => module.InicioModule)
      },
      {
        path: 'lugares',
        // loadChildren: () => import('./view/pages/inicio/inicio.module').then(module => module.InicioModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
