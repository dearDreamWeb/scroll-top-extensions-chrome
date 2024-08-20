import { useState, useEffect, useRef } from 'react';
import styles from './contentApp.module.less';
import { ALLOWDOMAINLIST, CONFIGSETTINGS } from '@/contants';
import { AllowListItem } from '../popup/hooks/useMyContext';
import { ConfigSettings } from '../popup/pages/index/Index';
// material-symbols-light:rocket
const ContentApp = () => {
  const [visible, setVisible] = useState(false);
  const timer = useRef<null | NodeJS.Timeout>(null);
  const [config, setConfig] = useState<ConfigSettings>({
    styleType: 1,
    text: '滚',
  });

  const scrollPosition = () => {
    let top = document.documentElement.scrollTop;
    setVisible(top > 0);
  };

  const initAllowInfo = async () => {
    const _list =
      (await storage.getItem<AllowListItem[]>(ALLOWDOMAINLIST)) || [];
    return _list.some((item) => item.value === window.location.hostname);
  };

  const initConfigInfo = async () => {
    const res = await storage.getItem<ConfigSettings>(CONFIGSETTINGS);
    if (!res) {
      return;
    }
    setConfig(res);
  };

  const scrollHandler = () => {
    if (timer.current) return;
    timer.current = setTimeout(() => {
      scrollPosition();
      timer.current && clearTimeout(timer.current);
      timer.current = null;
    }, 500);
  };

  const init = async () => {
    await initConfigInfo();
    const res = await initAllowInfo();
    if (!res) {
      setVisible(false);
      return;
    }

    document.removeEventListener('scroll', scrollHandler);
    scrollPosition();
    // 监听滚动条滚动事件
    document.addEventListener('scroll', scrollHandler);
  };

  useEffect(() => {
    init();
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('request', request);
      if (
        request.message === 'changeAllow' ||
        request.message === 'changeConfig'
      ) {
        init();
      }
    });
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const clickBtnHandler = () => {
    let scrollH = document.scrollingElement!.scrollTop;
    let timer: null | NodeJS.Timeout = null;
    timer && clearInterval(timer);
    timer = setInterval(() => {
      if (scrollH >= 1) {
        let speed = 0;
        if (scrollH >= 100) {
          speed = scrollH / 8;
        } else {
          speed = scrollH / 4;
        }
        scrollH -= speed;
        document.scrollingElement!.scrollTop = scrollH;
      } else {
        timer && clearInterval(timer);
        timer = null;
        document.scrollingElement!.scrollTop = 0;
      }
    }, 30);
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

  return (
    <div
      className={`${styles.scrollTopBox} ${styles[previewStyle]}`}
      style={{ display: visible ? 'block' : 'none' }}
      onClick={clickBtnHandler}
    >
      {config.styleType !== 3 ? config.text : ''}
    </div>
  );
};
export default ContentApp;
