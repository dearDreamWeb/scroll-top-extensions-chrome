import { Icon } from '@iconify/react';
import {} from 'react';
import styles from './header.module.less';
import logoIcon from '../../../../assets/icon.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.headerBox}>
      滚上去
      <img src={logoIcon} width={28} height={28} />
      <Icon
        icon="material-symbols-light:settings"
        className={styles.settingsIcon}
        onClick={() => navigate('/settings')}
      />
    </header>
  );
};

export default Header;
