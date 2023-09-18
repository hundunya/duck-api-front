import React, {useLayoutEffect, useRef, useState} from 'react';
import {GridContent} from '@ant-design/pro-layout';
import {Menu} from 'antd';
import PasswordView from './components/password';
// @ts-ignore
import styles from '../Settings/style.less';
import SecretKeyView from "@/pages/Account/Settings/components/secretKey";

const { Item } = Menu;

type SettingsStateKeys = 'password'|'secretKey';
type SettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: SettingsStateKeys;
};

const Settings: React.FC = () => {
  // 左侧菜单
  const menuMap: Record<string, React.ReactNode> = {
    password: '修改密码',
    secretKey: '密钥设置',
  };

  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: 'password',
  });
  const dom = useRef<HTMLDivElement>();

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = dom.current;
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      setInitConfig({ ...initConfig, mode: mode as SettingsState['mode'] });
    });
  };

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [dom.current]);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  // 菜单选择
  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'password':
        return <PasswordView />;
      case 'secretKey':
        return <SecretKeyView />;
      default:
        return null;
    }
  };

  return (
    <GridContent>
      <div
        className={styles.main}
        ref={(ref) => {
          if (ref) {
            dom.current = ref;
          }
        }}
      >
        <div className={styles.leftMenu}>
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }) => {
              setInitConfig({
                ...initConfig,
                selectKey: key as SettingsStateKeys,
              });
            }}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[initConfig.selectKey]}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  );
};
export default Settings;
