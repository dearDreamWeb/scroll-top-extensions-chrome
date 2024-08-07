import {} from 'react';
import { Icon } from '@iconify/react';
import styles from './manageList.module.less';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const ManageList = () => {
  const navigate = useNavigate();
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
      </header>
      manageList
    </div>
  );
};

export default ManageList;
