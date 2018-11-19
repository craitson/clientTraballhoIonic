import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  autenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private platform: Platform) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(result => {
      if (result) {
        this.autenticationState.next(true);
      }
    });
  }

  login() {
    return this.storage.set(TOKEN_KEY, '123456').then(() => {
      this.autenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.autenticationState.next(false);
    });
  }

  isAutenticated() {
    return this.autenticationState.value;
  }
}
