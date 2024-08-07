import { useState, useEffect, useRef } from 'react';
import styles from './contentApp.module.less';
import { ALLOWDOMAINLIST } from '@/contants';

const ContentApp = () => {
  const [visible, setVisible] = useState(false);
  const timer = useRef<null | NodeJS.Timeout>(null);

  const scrollPosition = () => {
    let top = document.documentElement.scrollTop;
    setVisible(top > 0);
  };

  const initAllowInfo = async () => {
    const _list = (await storage.getItem<string[]>(ALLOWDOMAINLIST)) || [];
    console.log('_list', _list, _list.includes(window.location.hostname));
    return _list.includes(window.location.hostname);
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
    const res = await initAllowInfo();
    if (!res) {
      setVisible(false);
      return;
    }
    const bodyDom = document.querySelector('body')!;
    bodyDom.removeEventListener('scroll', scrollHandler);
    timer.current && clearTimeout(timer.current);
    scrollPosition();
    // 监听滚动条滚动事件
    bodyDom.addEventListener('scroll', scrollHandler);
  };

  useEffect(() => {
    init();
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('request', request);
      if (request.message === 'changeAllow') {
        init();
      }
    });
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
      }
    }, 30);
  };

  return (
    <div
      className={styles.scrollTopBox}
      style={{ display: visible ? 'block' : 'none' }}
      onClick={clickBtnHandler}
    >
      Top
    </div>
  );
};
export default ContentApp;
