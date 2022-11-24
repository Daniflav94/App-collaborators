import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Collaborator } from 'src/app/models/collaborator';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public colaborador: Collaborator
  ) { }

  ngOnInit(): void {
  }

}
