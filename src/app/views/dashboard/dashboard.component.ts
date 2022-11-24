import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesComponent } from 'src/app/components/detalhes/detalhes.component';
import { Collaborator } from 'src/app/models/collaborator';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['foto', 'nome', 'email', 'cpf', 'cargo', 'setor', 'excluir', 'editar', 'detalhes'];
  dataSource: Collaborator[] = [];

  constructor(
    private colaboradorService: ColaboradorService,
    private notification: NotificationService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.inicializarTabela()
  }

  private inicializarTabela(): void{
    // CAPTURAR OS DADOS DO FIRESTORE E PREENCHER O VETOR DE COLABORADOR
    this.colaboradorService.findAll().subscribe(colaboradores => {
      this.dataSource = colaboradores
    })
  }

  public deletarColaborador(id: string): void{
    this.colaboradorService.deletarColaborador(id).subscribe(resposta => {
      this.notification.showMessage("Colaborador excluído!")
      this.inicializarTabela()
    })
  }

  public abrirDetalhes(colaborador: Collaborator): void{
    // ABRIR CAIXA DE DIÁLOGO COM INFORMAÇÕES DO COLABORADOR
    this.dialog.open(DetalhesComponent, {  // recebe o componente que representa o dialog e um objeto com configurações e dados
      width: "400px",
      data: colaborador  // vai receber dados do colaborador

    })
    
  }

}
