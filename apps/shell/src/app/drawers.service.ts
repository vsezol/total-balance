import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from '@angular/core';
import { switchMap, take } from 'rxjs';
import { DrawerStateService } from './drawer-state.service';

@Injectable({ providedIn: 'root' })
export class DrawersService {
  constructor(private readonly overlay: Overlay) {}

  open(component: Type<unknown>): void {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global(),
      hasBackdrop: true,
      backdropClass: 'bg-transparent',
    });

    const injector = Injector.create({
      providers: [DrawerStateService],
    });

    const drawerStateService = injector.get(DrawerStateService);

    const userProfilePortal = new ComponentPortal(component, null, injector);
    overlayRef.attach(userProfilePortal);

    overlayRef
      .backdropClick()
      .pipe(
        switchMap(() => drawerStateService.requestClose()),
        take(1)
      )
      .subscribe(() => {
        overlayRef.detach();
        overlayRef.dispose();
      });
  }
}
