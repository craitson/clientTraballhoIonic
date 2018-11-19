import { Router } from '@angular/router';
import { AutenticacaoService } from './services/autenticacao.service';
import { DbService } from './services/db.service';
import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Novo Professor',
      url: '/novo-professor',
      icon: 'add'
    },
    {
      title: 'Lista de Professores',
      url: '/lista-professores',
      icon: 'contacts'
    },
    {
      title: 'Configurações',
      url: '/configuracao',
      icon: 'cog'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dbService: DbService,
    private router: Router,
    // private authenticationService: AutenticacaoService,
    private menuController: MenuController
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.dbService.createDb();
      this.splashScreen.hide();
    });
  }

  // logout() {
  //   this.authenticationService.logout();
  //   this.router.navigate(['login']);
  //   this.menuController.close();
  // }
}
