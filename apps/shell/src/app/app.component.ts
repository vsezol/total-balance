import { OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SuspenseComponent,
  SuspenseErrorDirective,
  SuspenseLoadingDirective,
  WithSuspensePipe,
} from '@quotes-mfe/suspense';
import { DrawersService } from './drawers.service';
import { SidebarComponent } from './sidebar.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NgComponentOutlet,
    AsyncPipe,
    SuspenseComponent,
    WithSuspensePipe,
    SuspenseLoadingDirective,
    SuspenseErrorDirective,
    OverlayModule,
    SidebarComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly #drawersService = inject(DrawersService);

  openSidebar(): void {
    this.#drawersService.open(SidebarComponent);
  }
}
