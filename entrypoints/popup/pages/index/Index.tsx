import { useState, useEffect, useContext } from 'react';
import styles from './index.module.less';
import { Button, Switch } from 'antd';
import { ALLOWDOMAINLIST } from '@/contants';
import { useNavigate } from 'react-router-dom';

import { MyContext } from '../../App';
import { AllowListItem } from '../../hooks/useMyContext';
import { getUUid } from '../../utils/utils';

const Index = () => {
  const navigate = useNavigate();
  const { domain, currentTab, allowList, changeAllowList, getAllowList } =
    useContext(MyContext);

  const [switchOpen, setSwitchOpen] = useState(false);

  useEffect(() => {
    getAllowList();
  }, []);

  useEffect(() => {
    setSwitchOpen(allowList.some((item) => item.value === domain));
    if (currentTab?.id) {
      browser.tabs.sendMessage(currentTab.id, { message: 'changeAllow' });
    }
  }, [allowList]);

  const switchClick = async () => {
    const value = !switchOpen;
    if (value) {
      await storage.setItem(ALLOWDOMAINLIST, [
        { id: getUUid(), value: domain, createdTime: +new Date() },
        ...allowList,
      ]);
      getAllowList();
    } else if (allowList.some((item) => item.value === domain)) {
      const list = allowList.filter((item) => item.value !== domain);
      await storage.setItem(ALLOWDOMAINLIST, list);
      changeAllowList(list);
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
