import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { FlBaseControl } from '../interfaces/base-control';
import { FlBaseControlHost } from '../interfaces/base-control-host';
import { FlControlValueAccessor } from './control-value-accessor';

/** Uses to implement any control that you want */
@Directive()
export abstract class FlControl<T>
  extends FlControlValueAccessor<T>
  implements FlBaseControl<T>, OnInit, OnDestroy
{
  protected requestUpdate: () => void = () => {};
  private onControlChange: (value: T | null) => void = () => {};
  private valueChange$: Subject<T | null> = new Subject<T | null>();

  protected constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected host?: FlBaseControlHost<T>,
    protected override ngControl?: NgControl
  ) {
    super(changeDetectorRef, ngControl);
  }

  public ngOnInit(): void {
    /*
     * We have to register control with Promise.resolve because NgModel uses it too to set first
     * value (https://github.com/angular/angular/blob/7df9127088bda3c9d29937a04287b87dc2045ea7/packages/forms/src/directives/ng_model.ts#L314)
     */
    Promise.resolve().then(() => this.host?.registerControl(this));
  }

  protected override computeDisabled(): boolean {
    return super.computeDisabled() || !!this.host?.disabled;
  }

  public registerOnControlChange(fn: (value: T | null) => void): void {
    this.onControlChange = (value: T | null) => {
      fn(value);
      this.valueChange$.next(value);
    };
  }

  public registerRequestUpdate(fn: () => void): void {
    this.requestUpdate = fn;
  }

  public get valueChange(): Observable<T | null> {
    return this.valueChange$.asObservable();
  }

  /** Updates model and run changes */
  public override updateModel(value: T | null): void {
    if (!this.disabled) {
      super.updateModel(value);
      this.onControlChange(value);
    }
  }

  public override writeValue(value: T | null): void {
    if (this.model !== value) {
      super.writeValue(value);
      this.onControlChange(value);
    }
  }

  public ngOnDestroy(): void {
    this.host?.unregisterControl(this);
  }
}
