import { ChangeDetectorRef, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FlBaseControl } from '../interfaces/base-control';
import { FlBaseControlHost } from '../interfaces/base-control-host';
import { FlControlObjectHostGetValue } from '../types/control-object-host-get-value';
import { FlControlObjectHostSetValue } from '../types/control-object-host-set-value';
import { AbstractConstructor } from '../types/contructor';
import { FlControl } from './control';

/** Uses to implement host that stores value to an object key */
@Directive()
export abstract class FlControlObjectHost<T, C>
  extends FlControl<T>
  implements FlBaseControlHost<T, C>
{
  private controls: Set<FlControl<C>> = new Set<FlControl<C>>();
  private updatesFrom: FlControl<C> | null = null;
  private controlChange$: Subject<[FlBaseControl<C>, C | null]> = new Subject<
    [FlBaseControl<C>, C | null]
  >();

  protected constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    private getValue: FlControlObjectHostGetValue<T, C>,
    private setValue: FlControlObjectHostSetValue<T, C>,
    protected override host?: FlBaseControlHost<T>,
    protected override ngControl?: NgControl
  ) {
    super(changeDetectorRef, host, ngControl);
  }

  public registerControl(control: FlControl<C>): void {
    this.controls.add(control);

    /*
     * We have to update control because its can be created dynamically.
     * We use Promise.resolve because NgModel uses it too to set first value (https://github.com/angular/angular/blob/7df9127088bda3c9d29937a04287b87dc2045ea7/packages/forms/src/directives/ng_model.ts#L314)
     * so there's no need to use angular life cycle hooks
     */
    Promise.resolve().then(() =>
      control.writeValueFromHost(this.getValue(this.model))
    );

    control.registerOnControlChange((value: C | null) => {
      this.updatesFrom = control;
      this.updateModel(this.setValue(this.model, value));
      this.controlChange$.next([control, value]);
    });

    control.registerRequestUpdate(() => {
      control.writeValueFromHost(this.getValue(this.model));
    });
  }

  public unregisterControl(control: FlControl<C>): void {
    this.controls.delete(control);
  }

  public get controlChange(): Observable<C | null> {
    return this.controlChange$.pipe(
      map(([, value]: [FlBaseControl<C>, C | null]) => value)
    );
  }

  public typedControlChange(
    type: AbstractConstructor<FlBaseControl<C>>
  ): Observable<C | null> {
    return this.controlChange$.pipe(
      filter(
        ([control]: [FlBaseControl<C>, C | null]) => control instanceof type
      ),
      map(([, value]: [FlBaseControl<C>, C | null]) => value)
    );
  }

  public override updateModel(obj: T | null): void {
    super.updateModel(obj);
    this.updateControls(this.model);
  }

  protected override incomingUpdate(obj: T | null): void {
    this.updateControls(obj);
  }

  protected updateControls(value: T | null): void {
    this.controls.forEach((control: FlControl<C>) => {
      if (control !== this.updatesFrom) {
        control.writeValueFromHost(this.getValue(value));
      }
    });
    this.updatesFrom = null;
  }
}
