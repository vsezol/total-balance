import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  Injector,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SuspenseComponent,
  SuspenseErrorDirective,
  SuspenseLoadingDirective,
  WithSuspensePipe,
} from '@quotes-mfe/suspense';
import { Subject, delay, tap } from 'rxjs';
import { SidebarComponent } from './sidebar.component';

export const CLOSE_REQUESTED = new InjectionToken<Subject<void>>(
  'CLOSE_REQUESTED'
);

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
  constructor(private readonly overlay: Overlay) {}

  openSidebar(): void {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global(),
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
    });

    const closeRequested$ = new Subject<void>();

    const injector = Injector.create({
      providers: [
        {
          provide: CLOSE_REQUESTED,
          useValue: closeRequested$,
        },
      ],
    });
    const userProfilePortal = new ComponentPortal(
      SidebarComponent,
      null,
      injector
    );
    overlayRef.attach(userProfilePortal);

    overlayRef
      .backdropClick()
      .pipe(
        tap(() => closeRequested$.next()),
        delay(1000)
      )
      .subscribe(() => {
        overlayRef.detach();
        overlayRef.dispose();
      });
  }
}
