import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent],
  template: '<app-sidebar></app-sidebar>',
})
export class AppComponent {}
