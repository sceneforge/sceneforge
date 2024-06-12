import { lazy } from 'react';
export type { ViewProps } from './View';
export const View = lazy(() => import('./View'));
