import {
  AnimationEvent,
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { DrawerStateService } from '@quotes-mfe/drawer';
import { loadUnwrappedRemoteModule } from '@quotes-mfe/remote-loader';
import {
  SuspenseComponent,
  SuspenseErrorDirective,
  SuspenseLoadingDirective,
  WithSuspensePipe,
} from '@quotes-mfe/suspense';
import { Subject, filter, switchMap, tap } from 'rxjs';

type AnimationState = 'void' | 'enter' | 'leave';

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
    <div
      class="container"
      [@slide]="animationState()"
      (@slide.done)="handleAnimationDone($event)"
    >
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
    trigger('slide', [
      state('void', style({ transform: 'translateX(-300px)' })),
      state('enter', style({ transform: 'translateX(0)' })),
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

  readonly animationState = signal<AnimationState>('void');

  readonly #drawerStateService = inject(DrawerStateService);

  readonly #animationDoneEvent = new Subject<AnimationEvent>();

  constructor() {
    this.animationState.set('enter');

    this.registerCloseHandler();
  }

  handleAnimationDone(event: AnimationEvent): void {
    this.#animationDoneEvent.next(event);
  }

  private registerCloseHandler(): void {
    const animationLeaveDone = this.#animationDoneEvent.pipe(
      filter((event) => event.toState === 'leave')
    );

    this.#drawerStateService.closeRequested$
      .pipe(
        tap(() => this.animationState.set('leave')),
        switchMap(() => animationLeaveDone),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.#drawerStateService.close();
      });
  }
}
