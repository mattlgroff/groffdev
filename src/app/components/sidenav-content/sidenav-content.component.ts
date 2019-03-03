import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss'],
})
export class SidenavContentComponent {
  @Output() routeClick: EventEmitter<any> = new EventEmitter();

  public currentYear: Date = new Date();
  public routeClicked(): void {
    this.routeClick.emit(null);
  }
}
