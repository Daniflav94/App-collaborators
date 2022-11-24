import { Injectable } from '@angular/core';
import { AngularFirestore, fromCollectionRef } from '@angular/fire/compat/firestore';
import { Collaborator } from '../models/collaborator';
import { from, Observable, EMPTY } from 'rxjs'
import { NotificationService } from './notification.service';
import { catchError, map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private firestore: AngularFirestore,
    private notification: NotificationService) { }

  public criarColaborador(colaborador: Collaborator): Observable<any>{
    const promise = this.firestore.collection("colaboradores").add(colaborador)
    return from(promise).pipe(
      catchError(error => {
      this.notification.showMessage("Erro ao cadastrar")
      console.error(error)
      return EMPTY
    })
    )
  }

  public findAll(): Observable<any>{
    const promise = this.firestore.collection("colaboradores").get() //get() retorna os dados em QuerySnapShot e precisa de um tratamento
    return from(promise).pipe(  //pipe possibilita fazer tratamento dos dados recebidos
      map(resposta => {
        return resposta.docs.map(doc => {
          const colaborador: Collaborator = doc.data() as Collaborator //doc.data() vai pegar o documento e retornar os dados formatados, convertendo para collaborator
          colaborador.id = doc.id
          return colaborador
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados")
        console.error(error)
        return EMPTY
      })

    )
  }

  public findById(id: string): Observable<any> {
    const promise = this.firestore.collection("colaboradores").doc(id).get()
    return from(promise).pipe(
      map(doc => {
        const colaborador: Collaborator = doc.data() as Collaborator
        colaborador.id = doc.id
        return colaborador
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id")
        console.error(error)
        return EMPTY
      })
    )
  }

  public deletarColaborador(id: string){
    const promise = this.firestore.collection("colaboradores").doc(id).delete() // método doc() busca um documento especifico na coleção
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir")
        console.error(error)
        return EMPTY
      })
    )
  }

  public editarColaborador(colaborador: Collaborator){
    const promise = this.firestore.collection("colaboradores").doc(colaborador.id).update(colaborador) // método doc() busca um documento especifico na coleção
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar")
        console.error(error)
        return EMPTY
      })
    )
  }
}
