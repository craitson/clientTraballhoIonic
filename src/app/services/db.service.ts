import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProfessorService } from './professor.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private database: SQLiteObject;
  dadosSql: any[] = [];
  queryResult = new Subject<any>();
  lista: any;

  options: any = {
    name: 'data.db',
    location: 'default',
    createFromLocation: 1
  };

  sqlCreate = 'create table if not exists professores(' +
    'id integer PRIMARY KEY,' +
    'nome varchar(200),' +
    'dataNascimento TEXT,' +
    'curriculo TEXT,' +
    'status INTEGER,' +
    'foto TEXT)';

  constructor(private sqLite: SQLite, private professorService: ProfessorService) { }

  createDb() {
    const conn = this.sqLite.create(this.options)
      .then((db: SQLiteObject) => {
        db.executeSql(this.sqlCreate, [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
        this.database = db;

        this.professorService.getProfessores()
          .subscribe(data => {
            this.lista = data;

            for (let _i = 0; _i < this.lista.length; _i++) {
              const item = this.lista[_i];
              this.insere(item.id, item.nome, item.dataNascimento, item.curriculo, item.status, item.foto);
              // console.log('inserindo -------------->' + item.id, item.nome, item.dataNascimento, item.curriculo, item.status, item.foto);
            }
          });

      })
      .catch(e => console.log(e));
  }

  insere(id, nome, dataNascimento, curriculo, status, foto) {
    this.database.executeSql(
      'INSERT INTO professores (id, nome, dataNascimento, curriculo, status, foto) VALUES (?,?,?,?,?,?);',
      [id, nome, dataNascimento, curriculo, status, foto])
      .then(() => console.log('inserido co sucesso'))
      .catch(e => console.log(e));
  }

  altera(parametros) {
    this.database.executeSql('UPDATE professores set name=? WHERE id=?;', [parametros.name, parametros.id])
      .then(() => console.log('alterado com sucesso'))
      .catch(e => console.log(e));
  }

  deletar(id) {
    this.database.executeSql('DELETE FROM professores WHERE id=?;', [id])
      .then(() => console.log('deletado com sucesso'))
      .catch(e => console.log(e));
  }

  selectONE(id) {
    return this.database.executeSql('select * from professores where id = ?', [id]).then(res => {
      if (res.rows.length > 0) {
        let dta: any;
        for (let i = 0; i < res.rows.length; i++) {
          dta = res.rows.item(i);
        }
        // console.log('this,data', this.dadosSql);
        return dta;
      }
    }, error => console.log(error));
  }

  select(itens) {
    return this.database.executeSql('select * from professores limit ?', [itens]).then(res => {
      if (res.rows.length > 0) {
        const dados: any[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          const prof = res.rows.item(i);
          dados.push(prof);
        }
        return dados;
      }
    }, error => console.log(error));
  }

  selectLike(nome) {
    return this.database.executeSql('select * from professores where nome like ?', [nome]).then(res => {
      if (res.rows.length > 0) {
        const dados: any[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          const prof = res.rows.item(i);
          dados.push(prof);
        }
        return dados;
      }
    }, error => console.log(error));
  }


}
