import { DbService } from './../../../services/db.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../../services/professor.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-editar-professor',
  templateUrl: './editar-professor.page.html',
  styleUrls: ['./editar-professor.page.scss'],
})
export class EditarProfessorPage implements OnInit {
  constructor(private professorService: ProfessorService, private router: Router,
    private dbService: DbService) { }

  prof: any;
  professor: any;
  base64Image: any;
  public status: false;

  ngOnInit() {

    this.dbService.selectONE(this.professorService.professorAtual.id)
      .then((result: any) => {
        this.professor = result;
        this.professor.dataNascimento = (this.professor.dataNascimento = new Date().toISOString());
        this.status = this.professor.status;
      });

  }

  salvarProf(nome, dataNasc, curriculo, id, foto) {
    this.prof = {
      'id': id,
      'nome': nome,
      'dataNascimento': dataNasc = new Date().toISOString(),
      'curriculo': curriculo,
      'status': this.status,
      'foto': foto
    };

    this.professorService.salvaProfessor(this.prof)
      .subscribe(data => {
        this.router.navigate(['/lista-professores']);
      });

  }
  statusOnChange(statusSelected) {
    this.status = statusSelected;
  }
}
