import { Injectable, computed, signal } from '@angular/core';

@Injectable()
export class SuspenseService {
  readonly #isLoading = signal(false);
  readonly isLoading = this.#isLoading.asReadonly();

  readonly #error = signal<unknown>(undefined);
  readonly error = this.#error.asReadonly();

  readonly isReady = computed(() => !this.isLoading() && !this.error());

  setIsLoading(value: boolean): void {
    this.#isLoading.set(value);
  }

  setError(error: unknown): void {
    this.#error.set(error);
  }
}
