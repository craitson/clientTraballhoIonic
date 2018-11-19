import { DbService } from './../../../services/db.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../../services/professor.service';
import { ListaProfessoresPage } from '../lista-professores/lista-professores.page';

@Component({
  selector: 'app-novo-professor',
  templateUrl: './novo-professor.page.html',
  styleUrls: ['./novo-professor.page.scss'],
})
export class NovoProfessorPage implements OnInit {

  public prof: any;
  public t: false;
  public foto: any;
  public idd = 9876;

  constructor(private router: Router,
    private professorService: ProfessorService,
    private actionSheetController: ActionSheetController,
    private camera: Camera, private dbService: DbService) { }

  ngOnInit() {

  }
  enviar(n, dt, c) {

    this.prof = {
      'nome': n,
      'dataNascimento': dt = new Date().toISOString(),
      'curriculo': c,
      'status': this.t,
      'foto': (this.foto === undefined ? 'https://cdn4.iconfinder.com/data/icons/mayssam/512/user-512.png' : this.foto)
    };

    this.professorService.salvaProfessor(this.prof)
      .subscribe(data => {
        this.dbService.insere(this.idd, this.prof.nome, this.prof.dataNascimento, this.prof.curriculo, this.prof.status, this.prof.foto);
        this.router.navigate(['/lista-professores']);
      });
  }

  statusOnChange(statusSelected) {
    this.t = statusSelected;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolha sua Ação',
      buttons: [{
        text: 'Carregar Foto da Galeria',
        handler: () => {
          this.buscarFotoGaleria();
        }
      }, {
        text: 'Tirar Foto usando a Camera',
        handler: () => {
          this.tirarFoto();
        }
      }, {
        text: 'Fechar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera
      .getPicture(options)
      .then((imageData) => {
        this.foto = 'data:image/jpeg;base64,' + imageData;
        // this.salvaFoto();
      }, (err) => {
        console.log(err);
      });
  }

  buscarFotoGaleria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera
      .getPicture(options)
      .then((imageData) => {
        this.foto = 'data:image/jpeg;base64,' + imageData;
        console.log('imagem', this.foto);
        // this.salvaFoto();
      }, (err) => {
        console.log(err);
      });
  }
}
