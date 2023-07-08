import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { loadUnwrappedRemoteModule } from './functions/load-unwrapped-remote-module';
import { WithSuspensePipe } from './pipes/with-suspense.pipe';
import { SuspenseComponent } from './suspense.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NgComponentOutlet,
    AsyncPipe,
    SuspenseComponent,
    WithSuspensePipe,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  sidebarComponent = loadUnwrappedRemoteModule('sidebar', 'SidebarComponent');
}
