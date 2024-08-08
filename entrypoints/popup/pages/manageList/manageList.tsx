import { useState, useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';
import styles from './manageList.module.less';
import { useNavigate } from 'react-router-dom';
import { Button, Empty, Input, Popconfirm, Tooltip } from 'antd';
import { ALLOWDOMAINLIST } from '@/contants';
import { MyContext } from '../../App';

const ManageList = () => {
  const navigate = useNavigate();
  const contextData = useContext(MyContext);
  const { domain, currentTab } = contextData;
  const [allowList, setAllowList] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [showList, setShowList] = useState<string[]>([]);

  const initInfo = async () => {
    const _list = (await storage.getItem<string[]>(ALLOWDOMAINLIST)) || [];
    setAllowList(_list);
    setShowList(_list);
  };

  useEffect(() => {
    initInfo();
  }, []);

  const searchHandler = () => {
    if (!searchValue) {
      setShowList([...allowList]);
      return;
    }
    setShowList((list) => {
      return list.filter((item) => item.includes(searchValue));
    });
  };

  const confirmDelete = async (text: string) => {
    const newList = allowList.filter((item) => item !== text);
    await storage.setItem(ALLOWDOMAINLIST, newList);
    initInfo();
    if (currentTab?.id) {
      browser.tabs.sendMessage(currentTab.id, { message: 'changeAllow' });
    }
  };

  return (
    <div className={styles.manageListWrap}>
      <header className={styles.headerBox}>
        <div className={styles.headerLeftBox} onClick={() => navigate('/')}>
          <Button
            className={styles.backBtn}
            icon={
              <Icon icon="material-symbols-light:arrow-back-ios" type="link" />
            }
          >
            返回
          </Button>
        </div>
        <div className={styles.headerRightBox}>
          总数：<span>{allowList.length || 0}</span>个
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.searchBox}>
          <Input
            placeholder="请输入域名搜索"
            allowClear
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            type="primary"
            className={styles.searchBtn}
            onClick={searchHandler}
          >
            搜索
          </Button>
        </div>
        <div className={styles.listBox}>
          {showList.length ? (
            showList.map((item) => (
              <div key={item} className={styles.listItemBox}>
                <div className={styles.listItemText}>
                  <Tooltip title={item} mouseEnterDelay={0.5}>
                    {item}
                  </Tooltip>
                </div>
                <Popconfirm
                  title="确定要删除吗？"
                  onConfirm={() => confirmDelete(item)}
                  okText="是"
                  cancelText="否"
                >
                  <Icon
                    className={styles.listItemIcon}
                    icon="material-symbols-light:delete"
                  />
                </Popconfirm>
              </div>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageList;
