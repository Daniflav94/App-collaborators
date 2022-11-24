import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EditarColaboradorComponent } from './views/editar-colaborador/editar-colaborador.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NovoColaboradorComponent } from './views/novo-colaborador/novo-colaborador.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    title: "Home | Collaborators"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | Collaborators"
  },
  {
    path: 'cadastrar',
    component: CadastrarUsuarioComponent,
    title: "Cadastro | Collaborators"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
    title: "Painel de Controle | Collaborators"
  },
  {
    path: 'dashboard/new',
    component: NovoColaboradorComponent,
    canActivate: [ AuthGuard ],
    title: "Novo Colaborador | Collaborators"
  },
  {
    path: 'dashboard/editar/:id',
    component: EditarColaboradorComponent,
    canActivate: [ AuthGuard ],
    title: "Editar Colaborador | Collaborators"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
