import { Injectable } from '@angular/core';
import { collectionData, doc, docData, Firestore, where } from '@angular/fire/firestore';
import { collection, query } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Diario, DiarioConverter } from '../../models/diario';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiariosService {

  constructor(
    private db: Firestore,
    private authService: AuthService
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
}
