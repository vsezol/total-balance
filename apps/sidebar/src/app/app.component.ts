import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent],
  template: '<app-sidebar></app-sidebar>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
