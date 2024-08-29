import { useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import { Button, Input, Radio, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './importAndExport.module.less';
import { MyContext } from '../../App';
import { copyToClipboard } from '../../utils/utils';
import { AllowListItem } from '../../hooks/useMyContext';
import { ALLOWDOMAINLIST } from '@/contants';

const ImportAndExport = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [modalOpenType, setModalOpenType] = useState<'import' | 'export'>(
    'import'
  );
  const [importType, setImportType] = useState<'merge' | 'cover'>('merge');
  const [textAreaValues, setTextAreaValues] = useState('');
  const contextData = useContext(MyContext);
  const { domain, currentTab, allowList, changeAllowList, getAllowList } =
    contextData;

  useEffect(() => {
    (async () => {
      const type = params.get('type') as any;
      if (type === 'export') {
        const _list = await getAllowList();
        setTextAreaValues(JSON.stringify(_list));
        console.log('_list', _list);
      }
      setModalOpenType(type || 'import');
    })();
  }, []);

  /**
   * 校验导入导出的数据
   * @returns
   */
  const checkedImportData = () => {
    if (!textAreaValues) {
      message.info('无数据');
      return false;
    }
    const values = JSON.parse(textAreaValues);
    if (modalOpenType === 'import') {
      const res = values?.every?.(
        (item: AllowListItem) => item.id && item.createdTime && item.value
      );
      if (!res) {
        message.info('数据格式错误');
        return false;
      }
    }
    return true;
  };

  /**
   * 合并模式导入
   * @param importData
   * @param originData
   */
  const mergeData = async (
    importData: AllowListItem[],
    originData: AllowListItem[]
  ) => {
    const originDataMap: Record<string, AllowListItem> = {};
    originData.forEach((item) => {
      originDataMap[item.value] = item;
    });
    const list = [...originData];
    importData.forEach((item) => {
      if (!originDataMap[item.value]) {
        list.push(item);
      }
    });
    await storage.setItem(ALLOWDOMAINLIST, list);
    changeAllowList(list);
  };

  const submitHandler = async () => {
    try {
      const checkResult = await checkedImportData();
      if (!checkResult) {
        return;
      }
      const values = JSON.parse(textAreaValues);
      if (modalOpenType === 'import') {
        const _list = await getAllowList();
        if (importType === 'merge') {
          mergeData(values, _list);
        } else {
          await storage.setItem(ALLOWDOMAINLIST, values);
          changeAllowList(values);
        }
        message.success('导入成功');
      } else {
        const res = copyToClipboard(textAreaValues);
        if (!res) {
          message.info('复制失败');
          return;
        }
        message.success('复制成功');
      }
    } catch (e) {
      message.info('数据格式错误');
      return;
    }
  };

  return (
    <div className={styles.importAndExportWrap}>
      <header className={styles.headerBox}>
        <div
          className={styles.headerLeftBox}
          onClick={() => navigate('/settings')}
        >
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
      <main className={styles.importAndExportMain}>
        <div className={styles.mainItemBox}>
          <div className={styles.mainItemTitlte}>数据：</div>
          <Input.TextArea
            rows={6}
            value={textAreaValues}
            onChange={(e) => setTextAreaValues(e.target.value)}
          ></Input.TextArea>
        </div>
        {modalOpenType === 'import' && (
          <div className={styles.mainItemBox}>
            <div className={styles.mainItemTitlte}>模式：</div>
            <div className={styles.mainItemSubTitle}>
              <div>覆盖模式：覆盖当前的数据；</div>
              <div>合并模式：和当前数据合并在一起</div>
            </div>
            <Radio.Group
              value={importType}
              onChange={(e) => setImportType(e.target.value)}
            >
              <Radio value="merge">合并模式</Radio>
              <Radio value="cover">覆盖模式</Radio>
            </Radio.Group>
          </div>
        )}
        <Button type="primary" onClick={submitHandler}>
          {modalOpenType === 'import' ? '确定导入' : '复制数据'}
        </Button>
      </main>
    </div>
  );
};

export default ImportAndExport;
