import { Suspense } from 'react';
import { TabList } from './TabList';
import styles from './TabPanel.module.css';
import { useTabPanel } from './TabPanelProvider';

export const TabPanel = () => {
  const { tabs } = useTabPanel();

  const TabComponent = tabs.find(tab => tab.active)?.component ?? (() => null);

  return (
    <main className={styles.wrapper}>
      <TabList />
      <div role="tabpanel">
        <Suspense fallback={<div>Loading...</div>}>
          <TabComponent />
        </Suspense>
      </div>
    </main>
  )
}