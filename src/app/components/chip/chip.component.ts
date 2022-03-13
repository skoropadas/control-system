import {ChangeDetectorRef, Component, HostListener, Inject, Optional, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {FlControlSelector} from '../../control-system/control-selector';
import {FlCompareHost} from '../../classes/compare-host';
import {FL_CONTROL_HOST} from '../../tokens/control-host';
import {FlBaseControlHost} from '../../interfaces/base-control-host';
import {FL_SELECTOR_BEHAVIOUR} from '../../tokens/selector-behavour';
import {FlSelectorBehaviour} from '../../enums/selector-behaviour';

@Component({
  selector: 'fl-chip',
  template: `
    <ng-content></ng-content>`,
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent<T> extends FlControlSelector<T> {
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
    @Inject(FL_SELECTOR_BEHAVIOUR)
    @Optional()
    private selectorBehaviour?: FlSelectorBehaviour,
  ) {
    super(changeDetectorRef, compareHost, host, ngControl);
  }

  @HostListener('click')
  public clickEvent(): void {
    this.selectorBehaviour === FlSelectorBehaviour.RadioButton
      ? this.select()
      : this.toggle();
  }
}
