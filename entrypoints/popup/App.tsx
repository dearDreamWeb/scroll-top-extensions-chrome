/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, createContext } from 'react';
import styles from './app.module.less';
import { Button, Switch } from 'antd';
import { ALLOWDOMAINLIST } from '@/contants';
import { HashRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Index from './pages/index/Index';
import ManageList from './pages/manageList/manageList';
import Settings from './pages/settings/settings';
import ImportAndExport from './pages/importAndExport/importAndExport';
import { Tabs } from 'wxt/browser';
import useMyContext, { AllowListItem } from './hooks/useMyContext';
import logoIcon from '../../assets/icon.png';
import { Icon } from '@iconify/react';
import Header from './commponents/header/header';

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
      <HashRouter>
        <div className={styles.appBox}>
          <Header />
          <main className={styles.appMain}>
            <Routes>
              <Route path="/" element={<Index />}></Route>
              <Route path="/manageList" element={<ManageList />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
              <Route
                path="/importAndExport"
                element={<ImportAndExport />}
              ></Route>
            </Routes>
          </main>
        </div>
      </HashRouter>
    </MyContext.Provider>
  );
}

export default App;
