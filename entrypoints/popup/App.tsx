import { useState, useEffect } from 'react';
import styles from './app.module.less';
import { Button, Switch } from 'antd';
import { ALLOWDOMAINLIST } from '@/contants';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import Index from './pages/index/Index';
import ManageList from './pages/manageList/manageList';

function App() {
  return (
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
  );
}

export default App;
