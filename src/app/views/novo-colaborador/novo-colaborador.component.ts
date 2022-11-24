import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-novo-colaborador',
  templateUrl: './novo-colaborador.component.html',
  styleUrls: ['./novo-colaborador.component.css']
})
export class NovoColaboradorComponent implements OnInit {

public formCollaborator: FormGroup
fotoUrl: string = ""
isLoading: boolean = false

  constructor(fb: FormBuilder,
    private notification: NotificationService,
    private colaboradorService: ColaboradorService,
    private router: Router,
    private uploadService: UploadService
    ) {
    this.formCollaborator = fb.group({
      nome: ["", [Validators.required, Validators.maxLength(80)]],
      cpf: ["", [Validators.required]],
      dataNascimento: ["", [Validators.required]],
      cargo: ["", [Validators.required]],
      setor: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      remuneracao: ["", [Validators.required, Validators.min(0)]],
      email: ["", [Validators.required, Validators.email]]
    })
   }

  ngOnInit(): void {
  }

  public criarColaborador(): void {
    if(this.formCollaborator.valid){
      const colaborador: Collaborator = this.formCollaborator.value
      colaborador.fotoUrl = this.fotoUrl;
      //ENVIAR PARA O BANCO DE DADOS
      this.colaboradorService.criarColaborador(colaborador).subscribe(
        (resposta) => {
          this.notification.showMessage("Cadastrado com sucesso")
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
        this.fotoUrl = fotoUrl
      })  
    })
    
  }

}
