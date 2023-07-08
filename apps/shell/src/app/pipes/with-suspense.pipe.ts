import { Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, ObservableInput, ObservedValueOf } from 'rxjs';
import { withSuspense } from '../functions/with-suspense.function';
import { SuspenseService } from '../suspense.service';

@Pipe({
  name: 'withSuspense',
  pure: true,
  standalone: true,
})
export class WithSuspensePipe implements PipeTransform {
  readonly #suspenseService = inject(SuspenseService);

  transform<T extends ObservableInput<unknown>>(
    source: T
  ): Observable<ObservedValueOf<T>> {
    return withSuspense(source, this.#suspenseService);
  }
}
