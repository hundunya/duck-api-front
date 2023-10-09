import Footer from '@/components/Footer';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm,} from '@ant-design/pro-components';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Helmet, history} from '@umijs/max';
import {Form, Input, message, Tabs} from 'antd';
import React, {useState} from 'react';
import Settings from '../../../../config/defaultSettings';
import {userRegisterUsingPOST} from "@/services/duckapi-backend/userController";
import {LOGO} from "@/constants";

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
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
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const {userPassword, checkPassword} = values;
    if (userPassword !== checkPassword){
      message.error("两次输入的密码不一致");
      return;
    }
    try {
      // 注册
      const res = await userRegisterUsingPOST({
        ...values
      });
      if (res.data && res.data > 0) {
        const defaultRegisterSuccessMessage = '注册成功！';
        message.success(defaultRegisterSuccessMessage);
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/user/login');
        return;
      }
    } catch (error) {
      const defaultRegisterFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(defaultRegisterFailureMessage);
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
            autoRegister: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
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
                label: '注册',
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
              <Form.Item
                name="checkPassword"
                validateTrigger={"onBlur"}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    message: '确认密码过短！',
                  },
                  {
                    max: 20,
                    message: '确认密码过长！',
                  }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder={'请输入确认密码'}
                />
              </Form.Item>
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <a
              style={{
                float: 'right',
                marginBottom: '16px',
              }}
              href={'/user/login'}
            >
              已有账号？前往登录
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
