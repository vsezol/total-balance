import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, TemplateRef, inject } from '@angular/core';
import { SuspenseService } from './suspense.service';

@Component({
  selector: 'app-suspense',
  imports: [NgIf, NgTemplateOutlet],
  standalone: true,
  template: `
    <ng-content *ngIf="isLoading()" select="[loading]"></ng-content>
    <ng-container
      *ngIf="error() as error"
      [ngTemplateOutlet]="errorTemplate"
      [ngTemplateOutletContext]="{ $implicit: error }"
    >
    </ng-container>
    <ng-content *ngIf="isReady()"></ng-content>
  `,
  providers: [SuspenseService],
})
export class SuspenseComponent {
  @ContentChild('error') errorTemplate!: TemplateRef<{ $implicit: Error }>;

  readonly #suspenseService: SuspenseService = inject(SuspenseService);

  readonly isLoading = this.#suspenseService.isLoading;
  readonly error = this.#suspenseService.error;
  readonly isReady = this.#suspenseService.isReady;
}
