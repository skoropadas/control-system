import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  Input,
  Optional,
  Self
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {FlControlHost} from '../../control-system/control-host';
import {FL_CONTROL_HOST} from '../../tokens/control-host';
import {FlCompareHost} from '../../classes/compare-host';
import {FlCompareFunction} from '../../types/compare-fn';
import {FL_DEFAULT_COMPARE} from '../../constants/defaults';
import {FL_SELECTOR_BEHAVIOUR} from '../../tokens/selector-behavour';
import {FlSelectorBehaviour} from '../../enums/selector-behaviour';
import {FlOrientation} from '../../types/orientation';

@Component({
  selector: 'fl-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: FL_CONTROL_HOST,
    useExisting: RadioGroupComponent
  }, {
    provide: FlCompareHost,
    useExisting: RadioGroupComponent
  },
    {
      provide: FL_SELECTOR_BEHAVIOUR,
      useValue: FlSelectorBehaviour.RadioButton
    }
  ]
})
export class RadioGroupComponent<T> extends FlControlHost<T> implements FlCompareHost<T> {
  /** Uses to compare two values (usefull to compare two objects, for example by id) */
  @Input()
  public compareFn: FlCompareFunction<T> = FL_DEFAULT_COMPARE;

  @Input()
  @HostBinding('attr.data-fl-orientation')
  public orientation: FlOrientation = 'vertical';

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    @Inject(NgControl)
    @Self()
    @Optional()
    protected override ngControl?: NgControl
  ) {
    super(changeDetectorRef, undefined, ngControl);
  }
}
