import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage:Storage) { }

  private createFireName(file: File): string{
    
    const ext = file.name.split('.').pop();
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    return `${name}.${ext}`;
  }

  upload(file?:File, folder?:string): Observable<string | null>{
    if(file){
      const fileName = this.createFireName(file);
      const fileRef = ref(this.storage, folder + fileName); // Ex: /diarios/fx125/12345.jpg
      return from(uploadBytes(fileRef, file)).pipe(
        switchMap(() => from(getDownloadURL(fileRef))) // o upload é realizado e depois o link é solicitado
      );
    } else{
      return of(null); // não ocorre upload
    }
  }
}
