import { Injectable, computed, signal } from '@angular/core';

/** @internal */
@Injectable()
export class SuspenseService {
  readonly #isLoading = signal(false);
  readonly isLoading = this.#isLoading.asReadonly();

  readonly #error = signal<unknown>(undefined);
  readonly error = this.#error.asReadonly();

  readonly isReady = computed(() => !this.isLoading() && !this.error());

  setLoading(value: boolean): void {
    this.#isLoading.set(value);
  }

  setError(error: unknown): void {
    this.#error.set(error);
  }
}
