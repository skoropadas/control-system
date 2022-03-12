import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { EMPTY_FUNCTION } from '../constants/empty';
import { hasValue } from '../helpers/has-value';

/** Class implements basic ControlValueAccessor things */
@Directive()
export abstract class FlControlValueAccessor<T>
  implements ControlValueAccessor
{
  public model: T | null = null;
  protected isDisabled: boolean = false;

  public onTouched: () => void = EMPTY_FUNCTION;
  private onChange: (value: T | null) => void = EMPTY_FUNCTION;

  protected constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected ngControl?: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public get hasValue(): boolean {
    return hasValue(this.model);
  }

  @Input()
  @HostBinding('attr.data-disabled')
  public get disabled(): boolean {
    return this.computeDisabled();
  }

  public set disabled(isDisabled: boolean) {
    this.setDisabledState(isDisabled);
  }

  /** We use this getter to set disabled attribute for native HTML tags */
  @HostBinding('attr.disabled')
  public get nativeDisabled(): true | null {
    return this.disabled ? true : null;
  }

  protected computeDisabled(): boolean {
    return this.isDisabled;
  }

  public registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(obj: T | null): void {
    if (this.model !== obj) {
      this.update(obj);
    }
  }

  public writeValueFromHost(obj: T | null): void {
    if (this.model !== obj) {
      this.update(obj);
      this.onChange(obj);
    }
  }

  /**
   * Updates the model. Use this method to update model from your Control
   *
   * @param value - new value
   */
  public updateModel(value: T | null): void {
    if (!this.disabled) {
      this.model = value;
      this.onChange(this.model);
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * Triggered when some updates are incoming. Override this method to refresh your Control's view
   *
   * @param value - new value
   * @protected
   */
  protected incomingUpdate(value: T | null): void {}

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }

  private update(value: T | null): void {
    this.model = value;
    this.incomingUpdate && this.incomingUpdate(value);
    this.changeDetectorRef.markForCheck();
  }
}
