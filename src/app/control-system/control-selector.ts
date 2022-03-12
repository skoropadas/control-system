import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { FlCompareHost } from '../classes/compare-host';
import { FL_DEFAULT_COMPARE } from '../constants/defaults';
import { flMakePure } from '../decorators/pure';
import { FlBaseControlHost } from '../interfaces/base-control-host';
import { FlControl } from './control';

/** Uses to implement controls with state (like checkbox, radio-button, chip, etc.) */
@Directive()
export abstract class FlControlSelector<T>
  extends FlControl<T | boolean>
  implements OnChanges
{
  @Input()
  public value: T | true = true;

  protected constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected compareHost?: FlCompareHost<T | boolean | null>,
    protected override host?: FlBaseControlHost<T>,
    protected override ngControl?: NgControl,
    protected hasIntermediate?: boolean
  ) {
    super(changeDetectorRef, host, ngControl);
  }

  public ngOnChanges({ value }: SimpleChanges): void {
    /*
     * We have to request host for updates, because when we use ngFor directive
     * with trackBy function, Angular doesn't re-create components, it just changes their inputs,
     * so we have to request for updates our host, to determine right checked state
     */
    if (value) {
      this.requestUpdate();
    }
  }

  /** Выбирает текущее значение  */
  public select(): void {
    this.updateModel(this.value);
  }

  /** Снимает выделение */
  public deselect(): void {
    this.updateModel(false);
  }

  /** Устанавливает состояние intermediate */
  public intermediate(): void {
    this.updateModel(null);
  }

  /** Инвертирует текущее состояние */
  public toggle(): void {
    this.updateModel(this.checked === false ? this.value : false);
  }

  @HostBinding('attr.data-intermediate')
  public get isIntermediate(): boolean {
    return this.model === null && !!this.hasIntermediate;
  }

  @HostBinding('attr.data-checked')
  public get checked(): boolean | null {
    return this.compare(this.value, this.model)
      ? true
      : this.isIntermediate
      ? null
      : false;
  }

  @flMakePure
  protected compare(
    value1: T | boolean | null,
    value2: T | boolean | null
  ): boolean {
    return (
      this.compareHost?.compareFn(value1, value2) ??
      FL_DEFAULT_COMPARE(value1, value2)
    );
  }
}
