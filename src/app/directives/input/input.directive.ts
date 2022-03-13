import {ChangeDetectorRef, Directive, ElementRef, HostListener, Inject, Optional, Self} from '@angular/core';
import {FlControl} from '../../control-system/control';
import {FL_CONTROL_HOST} from '../../tokens/control-host';
import {FlBaseControlHost} from '../../interfaces/base-control-host';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[flInput]',
  exportAs: 'flInput'
})
export class InputDirective extends FlControl<string> {

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
    protected override changeDetectorRef: ChangeDetectorRef,
    @Inject(FL_CONTROL_HOST)
    @Optional()
    protected override host?: FlBaseControlHost<string>,
    @Inject(NgControl)
    @Self()
    @Optional()
    protected override ngControl?: NgControl,
  ) {
    super(changeDetectorRef, host, ngControl);
  }

  @HostListener('input')
  public inputEvent(): void {
    this.updateModel(this.elementRef.nativeElement.value);
  }

  protected override incomingUpdate(value: string | null): void {
    super.incomingUpdate(value);
    this.elementRef.nativeElement.value = String(value ?? '');
  }
}
