import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectspageComponent } from './projectspage/projectspage.component';

const routes: Routes = [{ path: '', component: ProjectspageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
