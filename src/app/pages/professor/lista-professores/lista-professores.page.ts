import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from './../../../services/autenticacao.service';
import { ProfessorService } from './../../../services/professor.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../services/db.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-professores',
  templateUrl: './lista-professores.page.html',
  styleUrls: ['./lista-professores.page.scss'],
})
export class ListaProfessoresPage implements OnInit {

  prof: any;
  filtro: string;
  dadosRecebi: any;
  page: number;

  constructor(private professorService: ProfessorService, private router: Router,
    private dbServie: DbService, private toast: ToastController) {

  }

  ngOnInit() {
    this.page = 10;
    this.dbServie.select(this.page)
      .then((result: any[]) => {
        this.prof = result;
      });
  }

  buscar(event) {

    console.log(this.filtro.length);
    if (this.filtro.length < 0) {
      this.dbServie.selectLike(this.filtro)
        .then((result: any[]) => {
          this.prof = null;
          this.prof = result;
          // refresher.target.complete();
        });
    } else {
      this.dbServie.select(this.page)
        .then((result: any[]) => {
          this.prof = result;
        });
    }
    // event.target.complete();
    console.log(this.filtro);
  }

  buscaDadosNovos() {
    setTimeout(() =>
      this.professorService.getProfessores()
        .subscribe(data => {
          this.dadosRecebi = data;
          if (this.dadosRecebi.length > 0) {
            for (let _i = 0; _i < this.dadosRecebi.length; _i++) {
              const item = this.dadosRecebi[_i];
              this.dbServie.insere(item.id, item.nome, item.dataNascimento, item.curriculo, item.status, item.foto);
              // console.log('inserindo -------------->' + item.id, item.nome, item.dataNascimento, item.curriculo, item.status, item.foto);
            }
            this.dadosRecebido();
          }
        })
      ,
      3000);
  }

  detalhesProfessor(professor) {
    this.professorService.professorAtual = professor;
    this.router.navigate(['/detalhe-professor']);
  }

  novoProfessor() {
    this.router.navigate(['/novo-professor']);
  }

  doRefresh(refresher) {
    this.dbServie.select(this.page)
      .then((result: any[]) => {
        this.prof = null;
        this.prof = result;
        refresher.target.complete();
      });
  }

  loadMore(event) {
    const aux = this.page;
    this.page = (this.page + 10);


    this.dbServie.select(this.page)
      .then((result: any[]) => {
        const aa = result.slice(aux, this.page);
        const conntt = aa.length;
        console.log(aa);
        console.log('tamanho connnt' + conntt);

        for (let i = 0; i <= conntt; i++) {
          if ( aa[i] !== undefined) {
            this.prof.push(aa[i]);
          }

        }
      });
    event.target.complete();
  }

  async dadosRecebido() {
    const toast = await this.toast.create({
      message: 'Novos dados recebidos',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
