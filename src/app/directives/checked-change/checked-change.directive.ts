import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: 'input[flChecked], input[flCheckedChange]',
})
export class CheckedChangeDirective {
  @Input()
  public set flChecked(checked: null | boolean) {
    this.updateProperty('checked', checked || false);
    this.updateProperty('indeterminate', checked === null);
  }

  @Output()
  public readonly flCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
    private readonly renderer: Renderer2
  ) {
    this.updateProperty('checked', false);
  }

  @HostListener('change', ['$event.target'])
  public onChange({ checked }: HTMLInputElement): void {
    this.updateProperty('indeterminate', false);
    this.flCheckedChange.emit(checked);
  }

  private updateProperty(
    property: 'checked' | 'indeterminate',
    value: boolean
  ): void {
    this.renderer.setProperty(this.elementRef.nativeElement, property, value);
  }
}
