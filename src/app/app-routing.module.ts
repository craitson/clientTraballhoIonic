import { AuthGuardGuard } from './auth/auth-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  {
    path: 'lista-professores', loadChildren: './pages/professor/lista-professores/lista-professores.module#ListaProfessoresPageModule',
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'detalhe-professor', loadChildren: './pages/professor/detalhe-professor/detalhe-professor.module#DetalheProfessorPageModule',
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'editar-professor', loadChildren: './pages/professor/editar-professor/editar-professor.module#EditarProfessorPageModule',
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'novo-professor', loadChildren: './pages/professor/novo-professor/novo-professor.module#NovoProfessorPageModule',
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'configuracao', loadChildren: './pages/configuracao/configuracao.module#ConfiguracaoPageModule',
    canActivate: [AuthGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
