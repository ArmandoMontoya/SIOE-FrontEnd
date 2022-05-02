import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './view/pages/login/login.module#LoginModule',
  },
  {
    path: '',
    component: AdminComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadChildren: () => import('./view/pages/inicio/inicio.module').then(module => module.InicioModule)
      },
      {
        path: 'grupos-organizados-de-la-sociedad-civil',
        loadChildren: () => import('./view/pages/grupos-organizados/grupos-organizados.module').then(module => module.GruposOrganizadosModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo :''
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
