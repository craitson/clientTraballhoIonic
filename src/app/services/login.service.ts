import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

     public URL_SERVER = 'http://172.16.0.70:9090/api/';
    // public URL_SERVER = 'http://192.168.1.136:9090/api/';

  constructor(private http: HttpClient, private menuController: MenuController) {
    this.menuController.close();
  }

  recoveryMail(mail) {
    return this.http.get(this.URL_SERVER + 'recoveryMail/' + mail);
  }

  autentication(dados): Observable<boolean> {
    return this.http.post<{ acessToken: string }>(this.URL_SERVER + 'login/', dados)
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.acessToken);
          return true;
        })
      );

    // return this.http.post(this.URL_SERVER + 'login/', dados);
  }
}
