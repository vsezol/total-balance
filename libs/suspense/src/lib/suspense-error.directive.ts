import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[libSuspenseError]',
  standalone: true,
})
export class SuspenseErrorDirective {
  readonly templateRef: TemplateRef<{ $implicit: NonNullable<unknown> }> =
    inject(TemplateRef);
}
