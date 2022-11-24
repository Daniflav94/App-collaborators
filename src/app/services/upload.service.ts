import { Injectable } from '@angular/core';
import { fromCollectionRef } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage,
    private notification: NotificationService) { }

  public uploadFoto(foto: File): Observable<any> {
    const promise = this.storage.upload(`fotos/${Date.now()}`, foto) //upload recebe endereço e arquivo como parametros
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao fazer upload.")
        console.error(error)
        return EMPTY
      })
    )
  }
}
