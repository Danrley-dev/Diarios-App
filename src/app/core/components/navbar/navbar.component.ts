import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService,  private toast: HotToastService, private usuarioService: UsuariosService) {}
  usuario$ = this.usuarioService.usuarioAtual$;
  logged$?: Observable<any>;

  logout() {
    this.authService.logout('/login').pipe(this.toast.observe({
      success: 'Logout feito com sucesso.',
      error: 'Um erro ocorreu, tente novamente',
      loading: 'Logout sendo feito, aguarde...'
    })).subscribe();
  }

  ngOnInit(): void {
    this.logged$ = this.authService.logged;
    
  }
}
