import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[libSuspenseLoading]',
  standalone: true,
})
export class SuspenseLoadingDirective {
  readonly templateRef: TemplateRef<unknown> = inject(TemplateRef);
}
