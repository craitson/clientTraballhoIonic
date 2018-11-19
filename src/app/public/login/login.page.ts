import { AutenticacaoService } from './../../services/autenticacao.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public alertController: AlertController,
    public loginService: LoginService, public router: Router) { }

  usuario: any;

  ngOnInit() {
    // if (this.autenticacaoService.isAutenticated() !== undefined) {
    //   this.router.navigate(['/lista-professores']);
    // }
  }

  autentica(login, senha) {

    this.usuario = { 'login': login, 'senha': senha };
    this.loginService.autentication(this.usuario)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['/lista-professores']),
        err => this.userInvalid()
      );

    // this.loginService.autentication(this.usuario)
    // .subscribe(data => {
    //   if (data !== false) {
    //     this.router.navigate(['/lista-professores']);
    //     localStorage.setItem('access_token', '' + data);
    //   } else {
    //     this.userInvalid();
    //   }
    // });
  }

  confirmEmail(texto) {
    this.loginService.recoveryMail(texto)
      .subscribe(data => {
        this.creatAlertResponse(data);
      });
  }

  async createAlertSendMail() {
    const alert = await this.alertController.create({
      header: 'Esqueceu sua Senha?',
      message: 'Digite seu e-mail abaixo',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'E-mail'
        }],
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          cssClass: 'secondary',
          handler: (blah) => {
            this.confirmEmail(blah.email);
          }
        }]
    });

    await alert.present();
  }

  async alertError() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Usuario/Senha incorretos!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async creatAlertResponse(mensagem) {
    const alert = await this.alertController.create({
      header: ((mensagem.message.search('foi') === -1) ? 'Usuario não encontrado' : 'Nova senha enviada'),
      message: mensagem.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async userInvalid() {
    const alert = await this.alertController.create({
      header: ('Alerta'),
      message: 'Usuario/senha incorretos',
      buttons: ['OK']
    });

    await alert.present();
  }
}
