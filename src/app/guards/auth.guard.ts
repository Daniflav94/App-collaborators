import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {  map, Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private notification: NotificationService
   ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.firebaseAuth.authState //authState = Observable que tem informações sobre o estado atual de autenticação que estão guardadas no navegador, retorna o usuário
      .pipe( // intercepta a requisição
        map(user => { //não queremos receber informação do usuário, somente se existe ou ão
          if(user){
            return true
          } else {
            this.notification.showMessage("Acesso restrito. Faça o login.")
            this.router.navigate(["/login"]); //caso não esteja autenticado, irá redirecionar o usuário para página de login
            return false
          }
        })
      )

  }
  
}
