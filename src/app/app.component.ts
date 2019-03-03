import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public opened = false;

  public toggleOpen(): void {
    this.opened = !this.opened;
  }
}
