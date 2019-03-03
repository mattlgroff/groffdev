import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesPageComponent } from './experiences-page/experiences-page.component';

@NgModule({
  declarations: [ExperiencesPageComponent],
  imports: [
    CommonModule,
    ExperiencesRoutingModule,
    MatCardModule,
    MatToolbarModule,
  ],
})
export class ExperiencesModule {}
