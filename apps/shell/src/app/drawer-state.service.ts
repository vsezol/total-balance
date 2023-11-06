import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';

@Injectable()
export class DrawerStateService {
  readonly #closeRequested = new Subject<void>();
  readonly closeRequested$ = this.#closeRequested.asObservable();

  readonly #closed$ = new Subject<void>();

  requestClose(): Observable<void> {
    this.#closeRequested.next();

    return this.#closed$.pipe(take(1));
  }

  close(): void {
    this.#closed$.next();
  }
}
