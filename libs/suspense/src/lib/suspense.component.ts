import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  inject,
} from '@angular/core';
import { SuspenseErrorDirective } from './suspense-error.directive';
import { SuspenseLoadingDirective } from './suspense-loading.directive';
import { SuspenseService } from './suspense.service';

@Component({
  selector: 'lib-suspense',
  imports: [NgIf, NgTemplateOutlet],
  standalone: true,
  template: `
    <ng-container
      *ngIf="isLoading()"
      [ngTemplateOutlet]="loadingDirective.templateRef"
    ></ng-container>

    <ng-container
      *ngIf="error() as error"
      [ngTemplateOutlet]="errorDirective.templateRef"
      [ngTemplateOutletContext]="{ $implicit: error }"
    ></ng-container>

    <ng-content *ngIf="isReady()"></ng-content>
  `,
  providers: [SuspenseService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuspenseComponent {
  @ContentChild(SuspenseLoadingDirective)
  loadingDirective!: SuspenseLoadingDirective;

  @ContentChild(SuspenseErrorDirective)
  errorDirective!: SuspenseErrorDirective;

  readonly #suspenseService: SuspenseService = inject(SuspenseService);

  readonly isLoading = this.#suspenseService.isLoading;
  readonly error = this.#suspenseService.error;
  readonly isReady = this.#suspenseService.isReady;
}
