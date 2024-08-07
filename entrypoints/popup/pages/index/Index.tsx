import { useState, useEffect } from 'react';
import styles from './index.module.less';
import { Button, Switch } from 'antd';
import { ALLOWDOMAINLIST } from '@/contants';
import { Navigate, useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [switchOpen, setSwitchOpen] = useState(false);
  const [domain, setDomain] = useState('');
  const [allowList, setAllowList] = useState<string[]>([]);

  const initTabInfo = async () => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const currentTab = tabs[0]; // 获取当前活动标签页
    const url = new URL(currentTab.url!); // 解析 URL
    setDomain(url.hostname);
  };

  const initInfo = async () => {
    const _list = (await storage.getItem<string[]>(ALLOWDOMAINLIST)) || [];
    setAllowList(_list);
  };

  useEffect(() => {
    initTabInfo();
    initInfo();
  }, []);

  useEffect(() => {
    setSwitchOpen(allowList.includes(domain));
  }, [allowList]);

  const switchClick = async () => {
    const value = !switchOpen;
    if (value) {
      await storage.setItem(ALLOWDOMAINLIST, [...allowList, domain]);
      initInfo();
    } else if (allowList.includes(domain)) {
      const list = allowList.filter((item) => item !== domain);
      await storage.setItem(ALLOWDOMAINLIST, list);
      setAllowList(list);
    }
    setSwitchOpen(value);
  };

  return (
    <div className={styles.indexWrap}>
      <div className={styles.switchWrap}>
        <div className={styles.switchBox}>
          <span className={styles.grayColor}>允许在此网站运行</span>
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            checked={switchOpen}
            onClick={switchClick}
          />
        </div>
        <div className={styles.manualBox}>
          <span className={styles.grayColor}>{domain}</span>{' '}
          <Button
            className={styles.manualBtn}
            type="link"
            onClick={() => navigate('/manageList')}
          >
            手动操作
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
