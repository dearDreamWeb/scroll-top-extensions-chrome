import {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  LegacyRef,
} from 'react';
import styles from './index.module.less';
import { Button, Input, InputRef, Radio, Switch, message } from 'antd';
import { ALLOWDOMAINLIST, CONFIGSETTINGS } from '@/contants';
import { useNavigate } from 'react-router-dom';

import { MyContext } from '../../App';
import { AllowListItem } from '../../hooks/useMyContext';
import { getUUid } from '../../utils/utils';

export interface ConfigSettings {
  styleType: number;
  text: string;
}

const Index = () => {
  const navigate = useNavigate();
  const { domain, currentTab, allowList, changeAllowList, getAllowList } =
    useContext(MyContext);

  const [switchOpen, setSwitchOpen] = useState(false);
  const [config, setConfig] = useState<ConfigSettings>({
    styleType: 3,
    text: '滚',
  });
  const textInputRef = useRef<InputRef>(null);

  const init = async () => {
    const res = await storage.getItem<ConfigSettings>(CONFIGSETTINGS);
    if (!res) {
      return;
    }
    setConfig(res);
  };

  useEffect(() => {
    init();
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

  const previewStyle = useMemo(() => {
    switch (config.styleType) {
      case 1:
        return 'style1';
      case 2:
        return 'style2';
      case 3:
        return 'style3';
      default:
        return 'style1';
    }
  }, [config]);

  /**
   * 修改配置
   * @param key
   * @param value
   */
  const changeConfig = async (key: keyof ConfigSettings, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig({ ...config, [key]: value });
    await storage.setItem(CONFIGSETTINGS, newConfig);
    message.success('修改成功');
    if (currentTab?.id) {
      browser.tabs.sendMessage(currentTab.id, { message: 'changeConfig' });
    }
  };

  const modifyBtnClick = () => {
    const value = textInputRef.current?.input?.value;
    if (value === config.text) {
      return;
    }
    changeConfig('text', textInputRef.current?.input?.value);
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
      <div className={styles.configWrap}>
        <div className={styles.configTitle}>配置项</div>
        <div className={styles.configStyleWrap}>
          <div className={styles.configSubTitle}>图标样式</div>
          <Radio.Group
            onChange={(e) => changeConfig('styleType', e.target.value)}
            value={config.styleType}
          >
            <Radio value={1}>简约</Radio>
            <Radio value={2}>暗黑</Radio>
            <Radio value={3}>朋克</Radio>
          </Radio.Group>
          <div className={styles.previewWrap}>
            <span>预览：</span>
            <div className={styles.previewBox}>
              <div className={styles[previewStyle]}>
                {config.styleType !== 3 ? config.text : ''}
              </div>
            </div>
          </div>
        </div>
        {config.styleType !== 3 && (
          <div className={styles.configTextWrap}>
            <div className={styles.configSubTitle}>文案样式</div>
            <div className={styles.configInputBox}>
              <Input ref={textInputRef} defaultValue={config.text} />
              <Button
                type="primary"
                className={styles.modifyBtn}
                onClick={modifyBtnClick}
              >
                修改
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
