import { inject } from '@angular/core';
import {
  Observable,
  ObservableInput,
  ObservedValueOf,
  catchError,
  defer,
  finalize,
  from,
  timeout,
} from 'rxjs';
import { SuspenseService } from './suspense.service';

interface WithSuspenseOptions {
  suspense: SuspenseService;
  timeout: number;
}

export function withSuspense<T extends ObservableInput<unknown>>(
  source: T,
  options: Partial<WithSuspenseOptions> = {}
): Observable<ObservedValueOf<T>> {
  const { suspense = inject(SuspenseService), timeout: maxTime = 5000 } =
    options;

  return defer(() => {
    suspense.setLoading(true);

    return from(source).pipe(
      timeout(maxTime),
      catchError((error) => {
        suspense.setError(error);

        throw error;
      }),
      finalize(() => suspense.setLoading(false))
    );
  });
}
