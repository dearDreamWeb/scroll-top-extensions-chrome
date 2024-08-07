import { useState, useEffect } from 'react';
import styles from './app.module.less';
import { Button, Switch } from 'antd';

function App() {
  const [count, setCount] = useState(0);
  const [switchOpen, setSwitchOpen] = useState(false);
  const [domain, setDomain] = useState('');

  const initTabInfo = async () => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const currentTab = tabs[0]; // 获取当前活动标签页
    const url = new URL(currentTab.url!); // 解析 URL
    setDomain(url.hostname);
  };

  useEffect(() => {
    initTabInfo();
  }, []);

  return (
    <div className={styles.appBox}>
      <header className={styles.headerBox}>滚上去</header>
      <main className={styles.appMain}>
        <div className={styles.switchWrap}>
          <div className={styles.switchBox}>
            <span className={styles.grayColor}>允许在此网站运行</span>
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              checked={switchOpen}
              onClick={() => setSwitchOpen(!switchOpen)}
            />
          </div>
          <div className={styles.manualBox}>
            <span className={styles.grayColor}>{domain}</span>{' '}
            <Button className={styles.manualBtn} type="link">
              手动操作
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
