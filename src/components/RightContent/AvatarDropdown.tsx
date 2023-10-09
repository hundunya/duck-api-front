import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {history, useModel} from '@umijs/max';
import {message} from 'antd';
import type {MenuInfo} from 'rc-menu/lib/interface';
import React, {useCallback} from 'react';
import {flushSync} from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import {userLogoutUsingPOST} from "@/services/duckapi-backend/userController";
import {NO_NEED_LOGIN_WHITE_LIST} from "@/constants";

export type GlobalHeaderRightProps = {
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};
  return <span className="anticon">{loginUser? loginUser.userName : "游客"}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ children }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    try {
      const res = await userLogoutUsingPOST();
      if (res.data) {
        flushSync(() => {
          setInitialState((s) => ({...s, loginUser: undefined}));
          let pathname = history.location.pathname;
          if (pathname.endsWith("/")) {
            pathname = pathname.substring(0, pathname.length - 1);
          }
          if (!NO_NEED_LOGIN_WHITE_LIST.includes(pathname)){
            history.push("/");
          }
          message.success("退出登录成功");
        });
      }
    } catch (e) {
      message.error("系统异常");
    }
  };

  const onMenuClick = useCallback(
    async (event: MenuInfo) => {
      const { key } = event;
      switch (key) {
        // 退出登录
        case 'logout':
          await loginOut();
          break;
        // 个人中心
        case 'center':
          history.push('/account/center');
          break;
        // 个人设置
        case 'settings':
          history.push('/account/settings');
          break;
        // 用户登录
        case 'login':
          history.push('/user/login');
          break;
        // 用户注册
        case 'register':
          history.push('/user/register');
          break;
        default:
          message.info("功能开发中。。。");
      }
    },
    [setInitialState],
  );

  const { loginUser } = initialState ?? {};

  let menuItems = [
    ...([]),
    {
      key: 'center',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  if (!loginUser || !loginUser.userName) {
    menuItems = [
      ...([]),
      {
        key: 'login',
        icon: <></>,
        label: '用户登录',
      },
      {
        key: 'register',
        icon: <></>,
        label: '用户注册',
      },
    ];
  }

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
