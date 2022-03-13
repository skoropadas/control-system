import {ChangeDetectorRef, Component, HostListener, Inject, Optional, Self} from '@angular/core';
import {FlControlSelector} from '../../control-system/control-selector';
import {FlCompareHost} from '../../classes/compare-host';
import {FL_CONTROL_HOST} from '../../tokens/control-host';
import {FlBaseControlHost} from '../../interfaces/base-control-host';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'fl-option',
  template: `
    <ng-content></ng-content>`,
  styleUrls: ['./option.component.scss']
})
export class OptionComponent<T> extends FlControlSelector<T> {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    @Inject(FlCompareHost)
    @Optional()
    protected override compareHost?: FlCompareHost<boolean | T | null>,
    @Inject(FL_CONTROL_HOST)
    @Optional()
    protected override host?: FlBaseControlHost<T>,
    @Inject(NgControl)
    @Self()
    @Optional()
    protected override ngControl?: NgControl,
  ) {
    super(changeDetectorRef, compareHost, host, ngControl);
  }

  @HostListener('click')
  public clickEvent(): void {
    this.select();
  }
}
