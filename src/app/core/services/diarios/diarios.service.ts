import { Injectable } from '@angular/core';
import { collectionData, doc, docData, Firestore, where } from '@angular/fire/firestore';
import { addDoc, collection, query } from '@firebase/firestore';
import { from, Observable, switchMap } from 'rxjs';
import { Diario, DiarioConverter } from '../../models/diario';
import { AuthService } from '../auth/auth.service';
import { UploadService } from '../upload/upload.service';

@Injectable({
  providedIn: 'root'
})
export class DiariosService {

  constructor(
    private db: Firestore,
    private authService: AuthService,
    private uploadService: UploadService
    ) { }

    diarios = collection(this.db, 'diarios').withConverter(DiarioConverter);

    getTodosDiarios(): Observable<Diario[]>{
      return collectionData(this.diarios, {idField: 'id'});
    }

    getDiariosUsuario(): Observable<Diario[]>{
      return collectionData(
        query(this.diarios, where('usuarioId', '==', this.authService.uid)),
        { idField: 'id'}
      )
    }

    getDiarioById(id: string): Observable<Diario>{
      const diarioDoc = doc(this.diarios, id);
      return docData(diarioDoc, {idField: 'id'})
    }

    addDiario(diario: Diario, imagem?:File){
      return this.authService.userDate.pipe(
        switchMap((user) => {
          return this.uploadService
          .upload(imagem, `diarios/${this.authService.uid}/`)
          .pipe(
            switchMap((url) => {
              diario.usuarioId = this.authService.uid;
              diario.createAt = new Date();
              diario.imagem = url ?? 'assets/img/placeholder.png';
              diario.usuarioNick = user['nick'];
              diario.usuarioName = user['nome'];

              return from(addDoc(this.diarios, diario));
            })
          )
        })
      )
    }
}
