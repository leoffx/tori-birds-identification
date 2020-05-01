import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'upload',
    pathMatch: 'full',
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
  {
    path: 'confirmacao',
    component: ConfirmacaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
