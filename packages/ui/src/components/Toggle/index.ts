import { lazy } from 'react';
export type { ToggleEvent, ToggleProps, ToggleComponentRef } from './Toggle';
export const Toggle = lazy(() => import('./Toggle'));

