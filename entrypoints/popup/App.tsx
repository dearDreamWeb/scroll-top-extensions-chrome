/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, createContext } from 'react';
import styles from './app.module.less';
import { Button, Switch } from 'antd';
import { ALLOWDOMAINLIST } from '@/contants';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import Index from './pages/index/Index';
import ManageList from './pages/manageList/manageList';
import { Tabs } from 'wxt/browser';
import useMyContext, { AllowListItem } from './hooks/useMyContext';

interface MyContextProps {
  domain: string;
  currentTab: null | Tabs.Tab;
  allowList: AllowListItem[];
  changeAllowList: (list: AllowListItem[]) => void;
  getAllowList: () => Promise<AllowListItem[]>;
}

export const MyContext = createContext<MyContextProps>({
  domain: '',
  currentTab: null,
  allowList: [],
  changeAllowList: (list) => {},
  getAllowList: async () => [],
});

function App() {
  const { domain, currentTab, allowList, changeAllowList, getAllowList } =
    useMyContext();

  return (
    <MyContext.Provider
      value={{ domain, currentTab, allowList, changeAllowList, getAllowList }}
    >
      <div className={styles.appBox}>
        <header className={styles.headerBox}>滚上去</header>
        <main className={styles.appMain}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />}></Route>
              <Route path="/manageList" element={<ManageList />}></Route>
            </Routes>
          </HashRouter>
        </main>
      </div>
    </MyContext.Provider>
  );
}

export default App;
