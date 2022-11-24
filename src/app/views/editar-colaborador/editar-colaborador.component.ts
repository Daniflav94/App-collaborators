import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.css']
})
export class EditarColaboradorComponent implements OnInit {

  public colaborador!: Collaborator
  isLoading: boolean = false

  constructor(
    private notification: NotificationService,
    private colaboradorService: ColaboradorService,
    private router: Router,
    private route: ActivatedRoute, //vai pegar o id da rota
    private uploadService: UploadService
    ) {  }

  ngOnInit(): void {
    this.inicializaCampos()
  }

  private inicializaCampos(): void{
    const id = this.route.snapshot.params["id"] //vai capturar o parâmetro com nome id da rota
    this.colaboradorService.findById(id).subscribe(colaborador => {
      this.colaborador = colaborador
    })
  }

  public editarColaborador(form: NgForm): void {
     if(form.valid){
    
      this.colaboradorService.editarColaborador(this.colaborador).subscribe(
        (resposta) => {
          this.notification.showMessage("Atualizado com sucesso")
          this.router.navigate(["/dashboard"])
        }
      )
    }else {
      this.notification.showMessage("Dados inválidos.")
    } 
  }

  public uploadFile(event: any): void{
    this.isLoading = true // quando for chamada a função vai aparecer a barra de carregamento
    const file: File = event.target.files[0] // vai capturar o arquivo
    // FAZER UPLOAD DO ARQUIVO PARA O FIREBASE
    this.uploadService.uploadFoto(file).subscribe(resposta => {
      this.isLoading = false // nesse ponto do código a imagem já foi carregada, então a baarra de progresso deverá sumir
      resposta.ref.getDownloadURL().then((fotoUrl: string) => {  // getDownloadUrl retorna uma promessa, then() pega o dado da promessa
        this.colaborador.fotoUrl = fotoUrl
      })  
    })
    
  }

}
