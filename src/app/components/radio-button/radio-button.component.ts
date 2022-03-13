import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional, Self} from '@angular/core';
import {FlControlSelector} from '../../control-system/control-selector';
import {FlCompareHost} from '../../classes/compare-host';
import {FL_CONTROL_HOST} from '../../tokens/control-host';
import {FlBaseControlHost} from '../../interfaces/base-control-host';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'fl-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent<T> extends FlControlSelector<T> {

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
