import { lazy } from 'react';
export type { FormListProps } from './FormList';
export const FormList = lazy(() => import('./FormList'));
export const FormListItem = lazy(() => import('./FormListItem'));
