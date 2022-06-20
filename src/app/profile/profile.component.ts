import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UploadService } from '../core/services/upload/upload.service';
import {  UsuariosService } from '../core/services/usuarios/usuarios.service';
import { switchMap, tap } from 'rxjs';
import { Perfil } from '../core/models/usuarioPerfil';
@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   usuario$ = this.usuarioService.usuarioAtual$;

  perfilForm = new FormGroup({
      uid: new FormControl(''),
      nick: new FormControl(''),
      nome: new FormControl(''),
    });

  constructor(
      private imageUploadService: UploadService,
      private toast: HotToastService,
      private usuarioService: UsuariosService
  ) { 
    
  }

    uploadFile(event: any, { uid }: Perfil) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Foto de perfil sendo alterada...',
          success: 'Sua foto de perfil foi alterada com sucesso!',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          this.usuarioService.atualizarUsuario({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

      editarPerfil() {
        const profileData = this.perfilForm.value;
        this.usuarioService
          .atualizarUsuario(profileData)
          .pipe(
            this.toast.observe({
              loading: 'Saving profile data...',
              success: 'Profile updated successfully',
              error: 'There was an error in updating the profile',
            })
          )
          .subscribe();
      }

  ngOnInit(): void {
    this.usuarioService.usuarioAtual$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.perfilForm.patchValue({ ...user });
      });
  }

}
