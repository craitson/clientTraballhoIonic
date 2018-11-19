import { ListaProfessoresPage } from './../../professor/lista-professores/lista-professores.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


const routes: Routes = [
  {
    path: '',
    component: ListaProfessoresPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaProfessoresPage]
})
export class ListaProfessoresPageModule {}
