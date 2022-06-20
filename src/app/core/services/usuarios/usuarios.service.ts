import { Injectable } from '@angular/core';
import { collection,  doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import {  from, Observable, of, switchMap } from 'rxjs';
import { Perfil } from '../../models/usuarioPerfil';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private db: Firestore, private authService: AuthService) { }

    perfis = collection(this.db, 'usuarios');
    
   get usuarioAtual$(): Observable<Perfil | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.db, 'usuarios', user?.uid);
        return docData(ref) as Observable<Perfil>;
      })
    );
  }

  atualizarUsuario(user: Perfil): Observable<void> {
    const ref = doc(this.db, 'usuarios', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
  
}
