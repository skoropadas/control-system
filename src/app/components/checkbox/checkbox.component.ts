import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FlCompareHost } from '../../classes/compare-host';
import { FlControlSelector } from '../../control-system/control-selector';
import { FlBaseControlHost } from '../../interfaces/base-control-host';
import { FL_CONTROL_HOST } from '../../tokens/control-host';

@Component({
  selector: 'fl-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent<T> extends FlControlSelector<T> {

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    @Inject(FlCompareHost)
    @Optional()
    protected override compareHost?: FlCompareHost<T | boolean | null>,
    @Inject(FL_CONTROL_HOST)
    @Optional()
    protected override host?: FlBaseControlHost<T>,
    @Inject(NgControl)
    @Self()
    @Optional()
    protected override ngControl?: NgControl,
  ) {
    super(changeDetectorRef, compareHost, host, ngControl, true)
  }
}