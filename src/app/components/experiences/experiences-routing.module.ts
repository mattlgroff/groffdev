import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExperiencesPageComponent } from './experiences-page/experiences-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExperiencesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperiencesRoutingModule {}
