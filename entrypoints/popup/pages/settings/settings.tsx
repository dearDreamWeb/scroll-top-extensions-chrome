import { useState } from 'react';
import styles from './settings.module.less';
import { Button, Input, Modal, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.settingsWrap}>
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
      <main className={styles.settingsMain}>
        <Button
          className={styles.settingsItem}
          icon={
            <Icon
              className={styles.settingsBtnIcon}
              icon="material-symbols-light:download-2-rounded"
            />
          }
          onClick={() => navigate('/importAndExport?type=import')}
        >
          导入
        </Button>
        <Button
          className={styles.settingsItem}
          icon={
            <Icon
              className={styles.settingsBtnIcon}
              icon="material-symbols-light:upload-2-rounded"
            />
          }
          onClick={() => navigate('/importAndExport?type=export')}
        >
          导出
        </Button>
      </main>
    </div>
  );
};

export default Settings;
