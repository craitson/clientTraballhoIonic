import { DbService } from './../../../services/db.service';
import { ProfessorService } from './../../../services/professor.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-detalhe-professor',
  templateUrl: './detalhe-professor.page.html',
  styleUrls: ['./detalhe-professor.page.scss'],
})
export class DetalheProfessorPage implements OnInit {

  professor: any;
  foto: any;

  constructor(private router: Router, private professorService: ProfessorService,
    private toast: ToastController, private alertController: AlertController,
    private camera: Camera, private actionSheetController: ActionSheetController,
    private dbService: DbService) { }

  ngOnInit() {
    this.dbService.selectONE(this.professorService.professorAtual.id)
      .then((result: any) => {
        this.professor = result;
      });

    // this.professorService.getProfessor(this.professorService.professorAtual.id)
    //   .subscribe(data => {
    //     this.professor = data;
    //   });
  }

  editarProfessor(professor) {
    this.professorService.professorAtual = professor;
    this.router.navigate(['/editar-professor']);
  }

  deletaProf(codigo) {
    this.alertConfirm(codigo);

  }

  async presentToast(dados) {
    const toast = await this.toast.create({
      message: dados = true ? 'Professor excluido com sucesso!' : 'Opa, erro ao excluir professor!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async alertConfirm(codigo) {
    const alert = await this.alertController.create({
      header: 'Confirmação!',
      message: 'Tem certeza que deseja excluir esse professor?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Excluir',
          handler: () => {
            this.confirmadodelecao(codigo);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmadodelecao(codigo) {
    this.professorService.excluirProf(codigo)
      .subscribe(data => {
        this.presentToast(data);
        this.dbService.deletar(codigo);
        this.router.navigate(['/lista-professores']);
      });
  }

  salvarFoto() {


    this.professor.dataNascimento = this.professor.dataNascimento = new Date().toISOString();
    this.professor.foto = this.foto;

    this.professorService.salvaProfessor(this.professor)
      .subscribe(data => {
        this.router.navigate(['/lista-professores']);

      });
  }


  tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this
      .camera
      .getPicture(options)
      .then((imageData) => {
        this.foto = 'data:image/jpeg;base64,' + imageData;
        console.log('imagem', this.foto);
        this.salvarFoto();
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

    this
      .camera
      .getPicture(options)
      .then((imageData) => {
        this.foto = 'data:image/jpeg;base64,' + imageData;
        console.log('imagem', this.foto);
        this.salvarFoto();
      }, (err) => {
        console.log(err);
      });
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


}
