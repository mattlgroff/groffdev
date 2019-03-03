import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectspageComponent } from './projectspage/projectspage.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [ProjectspageComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatCardModule,
    MatToolbarModule,
  ],
})
export class ProjectsModule {}
