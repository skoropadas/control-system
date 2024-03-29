import {ChangeDetectorRef, Directive} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {FlBaseControl} from '../interfaces/base-control';
import {FlBaseControlHost} from '../interfaces/base-control-host';
import {AbstractConstructor, Constructor} from '../types/contructor';
import {FlControl} from './control';

/** Uses to implement base host which accepts the model as is */
@Directive()
export abstract class FlControlHost<T> extends FlControl<T> implements FlBaseControlHost<T, T> {
  private controls: Set<FlControl<T>> = new Set<FlControl<T>>();
  private updatesFrom: FlControl<T> | null = null;
  private controlChange$: Subject<[FlBaseControl<T>, T | null]> = new Subject<[FlBaseControl<T>, T | null]>();

  protected constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
		protected override host?: FlBaseControlHost<T>,
		protected override ngControl?: NgControl,
	) {
		super(changeDetectorRef, host, ngControl);
	}

	public registerControl(control: FlControl<T>): void {
		this.controls.add(control);

		/*
		 * We have to update control because its can be created dynamically.
		 * We use Promise.resolve because NgModel uses it too to set first value (https://github.com/angular/angular/blob/7df9127088bda3c9d29937a04287b87dc2045ea7/packages/forms/src/directives/ng_model.ts#L314)
		 * so there's no need to use angular life cycle hooks
		 */
		Promise.resolve().then(() => {
			control.writeValueFromHost(this.model);
		});

		control.registerOnControlChange((value: T | null) => {
			if (this.model !== value) {
				this.updatesFrom = control;
				this.updateModel(value);
				this.incomingUpdate(value);
				this.controlChange$.next([control, value]);
			}
		});

		control.registerRequestUpdate(() => {
			control.writeValueFromHost(this.model);
		});
	}

	public unregisterControl(control: FlControl<T>): void {
		this.controls.delete(control);
	}

	public get controlChange(): Observable<T | null> {
		return this.controlChange$.pipe(map(([, value]: [FlBaseControl<T>, T | null]) => value));
	}

	public typedControlChange(
		type: Constructor<FlBaseControl<T>> | AbstractConstructor<FlBaseControl<T>>,
	): Observable<T | null> {
		return this.controlChange$.pipe(
			filter(([control]: [FlBaseControl<T>, T | null]) => control instanceof type),
			map(([, value]: [FlBaseControl<T>, T | null]) => value),
		);
	}

	public override updateModel(obj: T | null): void {
		super.updateModel(obj);
		this.updateControls(this.model);
	}

  protected override incomingUpdate(value: T | null): void {
    this.updateControls(value);
  }

	private updateControls(value: T | null): void {
		this.controls.forEach((control: FlControl<T>) => {
			if (control !== this.updatesFrom) {
				control.writeValueFromHost(value);
			}
		});
		this.updatesFrom = null;
	}
}
