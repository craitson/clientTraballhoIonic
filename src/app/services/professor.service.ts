import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  professorAtual: any;

    public URL_SERVER = 'http://172.16.0.70:9090/api/';
   // public URL_SERVER = 'http://192.168.1.136:9090/api/';

  constructor(private http: HttpClient) { }

  getProfessores() {
    return this.http.get(this.URL_SERVER + 'professores/');
  }

  getProfessor(codigo) {
    return this.http.get(this.URL_SERVER + 'professor/' + codigo);
  }

  salvaProfessor(dados) {
    return this.http.post(this.URL_SERVER + 'professorNovo/', dados);
  }

  excluirProf(id) {
    return this.http.delete(this.URL_SERVER + 'deleteProf/' + id);
  }

}
