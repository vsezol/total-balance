import { inject } from '@angular/core';
import {
  Observable,
  ObservableInput,
  ObservedValueOf,
  catchError,
  defer,
  finalize,
  from,
} from 'rxjs';
import { SuspenseService } from '../suspense.service';

export function withSuspense<T extends ObservableInput<unknown>>(
  source: T,
  suspenseService: SuspenseService = inject(SuspenseService)
): Observable<ObservedValueOf<T>> {
  return defer(() => {
    suspenseService.setIsLoading(true);

    return from(source).pipe(
      catchError((error) => {
        suspenseService.setError(error);

        throw error;
      }),
      finalize(() => suspenseService.setIsLoading(false))
    );
  });
}
