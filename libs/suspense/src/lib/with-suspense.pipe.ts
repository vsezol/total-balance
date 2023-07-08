import { Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, ObservableInput, ObservedValueOf } from 'rxjs';
import { SuspenseService } from './suspense.service';
import { withSuspense } from './with-suspense.function';

@Pipe({
  name: 'withSuspense',
  pure: true,
  standalone: true,
})
export class WithSuspensePipe implements PipeTransform {
  readonly #suspense = inject(SuspenseService);

  transform<T extends ObservableInput<unknown> | null | undefined>(
    source: T,
    timeout?: number
  ): Observable<ObservedValueOf<T>> | null {
    if (!source) {
      return null;
    }

    return withSuspense(source, { suspense: this.#suspense, timeout });
  }
}
