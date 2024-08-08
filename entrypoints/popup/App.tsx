import { useState, useEffect, createContext } from 'react';
import styles from './app.module.less';
import { Button, Switch } from 'antd';
import { ALLOWDOMAINLIST } from '@/contants';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import Index from './pages/index/Index';
import ManageList from './pages/manageList/manageList';
import { Tabs } from 'wxt/browser';

interface MyContextProps {
  domain: string;
  currentTab: null | Tabs.Tab;
}

export const MyContext = createContext<MyContextProps>({
  domain: '',
  currentTab: null,
});

function App() {
  const [domain, setDomain] = useState('');
  const [currentTab, setCurrentTab] = useState<Tabs.Tab | null>(null);
  // const [allowList, setAllowList] = useState<string[]>([]);

  const initTabInfo = async () => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const currentTab = tabs[0]; // 获取当前活动标签页
    const url = new URL(currentTab.url!); // 解析 URL
    setCurrentTab(currentTab);
    setDomain(url.hostname);
  };

  useEffect(() => {
    initTabInfo();
  }, []);

  return (
    <MyContext.Provider value={{ domain, currentTab }}>
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
