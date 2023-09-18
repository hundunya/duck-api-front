import Footer from '@/components/Footer';
import {LinkOutlined} from '@ant-design/icons';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import {SettingDrawer} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from '@umijs/max';
import {history, Link} from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import {AvatarDropdown, AvatarName} from './components/RightContent/AvatarDropdown';
import {requestConfig} from './requestConfig';
import {getLoginUserUsingGET} from "@/services/duckapi-backend/userController";
import {InitialState} from "@/typings";
import {LOGO} from "@/constants";
import {ConfigProvider} from "antd";
import "./constants/index.less";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const NO_NEED_LOGIN_WHITE_LIST = [loginPath, '/user/register']

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  const state: InitialState = {
    loginUser: undefined,
    settings: defaultSettings as Partial<LayoutSettings>,
  }
  let pathname = history.location.pathname;
  if (pathname.endsWith("/")) {
    pathname = pathname.substring(0, pathname.length - 1);
  }
  if (NO_NEED_LOGIN_WHITE_LIST.includes(pathname)) {
    return state;
  }
  try {
    const res = await getLoginUserUsingGET();
    if (res.data) {
      state.loginUser = res.data;
    }
  } catch (error) {
    history.push(loginPath);
  }
  return state;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  let userAvatar = initialState?.loginUser?.userAvatar;
  if (!userAvatar) {
    userAvatar = LOGO;
  }
  return {
    pageTitleRender: false,
    avatarProps: {
      src: userAvatar,
      title: <AvatarName/>,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      //判断是否为登录或注册页面
      let pathname = location.pathname;
      if (pathname.endsWith("/")) {
        pathname = pathname.substring(0, pathname.length - 1);
        if (NO_NEED_LOGIN_WHITE_LIST.includes(pathname)) {
          history.push(pathname);
          return
        }
      }
      if (NO_NEED_LOGIN_WHITE_LIST.includes(pathname)) {
        return
      }
      // 如果没有登录，重定向到 login
      if (!initialState?.loginUser) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>OpenAPI 文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          <ConfigProvider
            theme={{
              token: {
                colorSplit: "rgba(0, 0, 0, 0.3)",
                // colorBorderBg: "rgba(0, 0, 0, 0.3)",
                colorBorderBg: "red",
              },
              components: {
                Table: {
                  colorBorder: "red"
                }
              }
            }}
          >
            {children}
            {isDev ?
              <SettingDrawer
                disableUrlParams
                enableDarkTheme
                settings={initialState?.settings}
                onSettingChange={(settings) => {
                  setInitialState((preInitialState) => ({
                    ...preInitialState,
                    settings,
                  }));
                }}
              /> : <></>
            }
          </ConfigProvider>
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
