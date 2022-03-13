import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public items: string[] = ['Apple', 'Orange', 'Kiwi', 'Banana'];
  public opened: boolean = false;

  public checkboxGroupModel: string[] | null = null;
  public radioGroupModel: string | null = null;
  public chipCheckboxModel: string[] | null = null;
  public chipRadioModel: string[] | null = null;
  public comboboxModel: string | null = null;
}
