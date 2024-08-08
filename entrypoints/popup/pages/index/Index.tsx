import { useState, useEffect, useContext } from 'react';
import styles from './index.module.less';
import { Button, message, Switch } from 'antd';
import { ALLOWDOMAINLIST } from '@/contants';
import { Navigate, useNavigate } from 'react-router-dom';
import { Tabs } from 'wxt/browser';
import { MyContext } from '../../App';

const Index = () => {
  const navigate = useNavigate();
  const contextData = useContext(MyContext);
  const { domain, currentTab } = contextData;
  const [switchOpen, setSwitchOpen] = useState(false);
  const [allowList, setAllowList] = useState<string[]>([]);

  const initInfo = async () => {
    const _list = (await storage.getItem<string[]>(ALLOWDOMAINLIST)) || [];
    setAllowList(_list);
  };

  useEffect(() => {
    initInfo();
  }, []);

  useEffect(() => {
    setSwitchOpen(allowList.includes(domain));
    if (currentTab?.id) {
      browser.tabs.sendMessage(currentTab.id, { message: 'changeAllow' });
    }
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
      <div>配置项</div>
    </div>
  );
};

export default Index;
