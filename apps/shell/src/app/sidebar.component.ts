import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { loadUnwrappedRemoteModule } from '@quotes-mfe/remote-loader';
import {
  SuspenseComponent,
  SuspenseErrorDirective,
  SuspenseLoadingDirective,
  WithSuspensePipe,
} from '@quotes-mfe/suspense';
import { take } from 'rxjs';
import { CLOSE_REQUESTED } from './app.component';

const ANIMATION_TIMINGS = '1s cubic-bezier(0.25, 0.8, 0.25, 1)';

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
  ],
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container" [@slideContent]="animationState()">
      <lib-suspense>
        <span *libSuspenseLoading>Loading Sidebar</span>
        <span *libSuspenseError>Sidebar is not available :(</span>
        <ng-container
          *ngComponentOutlet="sidebarComponent | withSuspense | async"
        />
      </lib-suspense>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        width: 300px;
      }

      .container {
        background: #f1f1f1;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  animations: [
    trigger('slideContent', [
      state('void', style({ transform: 'translateX(-300px)' })),
      state('enter', style({ transform: 'translateX(0)', opacity: 1 })),
      state('leave', style({ transform: 'translateX(-300px)' })),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ]),
  ],
})
export class SidebarComponent {
  readonly sidebarComponent = loadUnwrappedRemoteModule(
    'sidebar',
    'SidebarComponent'
  );

  readonly animationState = signal<'void' | 'enter' | 'leave'>('void');

  constructor() {
    inject(CLOSE_REQUESTED)
      .pipe(take(1))
      .subscribe(() => {
        this.animationState.set('leave');
      });

    this.animationState.set('enter');
  }
}
