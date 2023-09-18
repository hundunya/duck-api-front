import Footer from '@/components/Footer';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProForm, ProFormCheckbox, ProFormText,} from '@ant-design/pro-components';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Helmet, history, useModel} from '@umijs/max';
import {Form, Input, message, Tabs} from 'antd';
import React, {useState} from 'react';
import Settings from '../../../../config/defaultSettings';
import {userLoginUsingPOST} from "@/services/duckapi-backend/userController";
import {flushSync} from "react-dom";
import {LOGO} from "@/constants";
import defaultSettings from "../../../../config/defaultSettings";
import {Settings as LayoutSettings} from "@ant-design/pro-layout";

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPOST({
        ...values
      });
      const user = res?.data?.user;
      const token = res?.data?.token;
      if (user && token) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        sessionStorage.setItem("token", token);
        flushSync(() => {
          setInitialState({
            loginUser: user,
            settings: defaultSettings as Partial<LayoutSettings>,
          });
        })
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
            margin: '0 auto'
          }}
          logo={<img alt="logo" src={LOGO} />}
          title="Duck API"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            style={{
              marginTop: 32,
              marginBottom: 16
            }}
            items={[
              {
                key: 'account',
                label: '登录',
              }
            ]}
          />

          {type === 'account' && (
            <>
              <Form.Item
                name="userAccount"
                validateTrigger={"onBlur"}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                  {
                    min: 4,
                    message: '账号过短！',
                  },
                  {
                    max: 20,
                    message: '账号过长！',
                  }
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder={'请输入账号'}
                />
              </Form.Item>
              <Form.Item
                name="userPassword"
                validateTrigger={"onBlur"}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    message: '密码过短！',
                  },
                  {
                    max: 20,
                    message: '密码过长！',
                  }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder={'请输入密码'}
                />
              </Form.Item>
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right'
              }}
              href={'/user/register'}
            >
              注册账号
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
