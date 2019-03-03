import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'projects',
    loadChildren: './components/projects/projects.module#ProjectsModule',
  },
  {
    path: 'experience',
    loadChildren:
      './components/experiences/experiences.module#ExperiencesModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
