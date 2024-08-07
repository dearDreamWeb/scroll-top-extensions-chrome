import { useState, useEffect } from 'react';
import styles from './contentApp.module.less';

const ContentApp = () => {
  useEffect(() => {
    console.log(22222222);
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
    <div className={styles.scrollTopBox} onClick={clickBtnHandler}>
      Top
    </div>
  );
};
export default ContentApp;
