import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { UsuarioNaoVerificadoComponent } from './components/usuario-nao-verificado/usuario-nao-verificado.component';

const redirectLoggedToDiarios = () => redirectLoggedInTo(['/diarios'])

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedToDiarios),
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    ...canActivate(redirectLoggedToDiarios),
  },
  {
    path: 'recuperar-senha',
    component: RecuperarSenhaComponent,
    ...canActivate(redirectLoggedToDiarios),
  },
  {
    path: 'confirmar-email',
    component: UsuarioNaoVerificadoComponent,
    ...canActivate(redirectLoggedToDiarios),
  },
];

@NgModule({
  // As rotas do array serão unidas com as do app-routing
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
