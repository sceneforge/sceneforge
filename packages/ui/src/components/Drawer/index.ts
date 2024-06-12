import { lazy } from 'react';
export type { DrawerControllerProps } from './DrawerController';
export type { DrawerProps } from './Drawer';
export type { UseDrawerProps, ResizableHandler } from './useDrawer';
export const Drawer = lazy(() => import('./Drawer'));
export const DrawerController = lazy(() => import('./DrawerController'));
