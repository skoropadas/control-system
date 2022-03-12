import { InjectionToken } from '@angular/core';
import { FlControlHost } from '../control-system/control-host';
import { ComponentType } from '../types/component-type';

export const FL_CONTROL_HOST: InjectionToken<
  ComponentType<FlControlHost<unknown>>
> = new InjectionToken<ComponentType<FlControlHost<unknown>>>(
  'FL_CONTROL_HOST'
);
