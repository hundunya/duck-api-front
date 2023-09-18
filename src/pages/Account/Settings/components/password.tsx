import React, {useRef} from 'react';
import {Col, Input, message} from 'antd';
import {ProForm, ProFormInstance} from "@ant-design/pro-components";
import {updateMyPasswordUsingPOST} from "@/services/duckapi-backend/userController";

const PasswordView: React.FC = () => {
  const formRef = useRef<ProFormInstance<API.UserUpdatePasswordRequest>>();

  const handleFinish = async (values: API.UserUpdatePasswordRequest) => {
    try {
      // 登录
      const res = await updateMyPasswordUsingPOST({
        ...values
      });
      if (res?.data) {
        formRef.current?.resetFields();
        const defaultSuccessMessage = '修改成功';
        message.success(defaultSuccessMessage);
      }
    } catch (error) {
      const defaultFailureMessage = '修改失败，请重试！';
      console.log(error);
      message.error(defaultFailureMessage);
    }
  };
  return (
    <ProForm<API.UserUpdatePasswordRequest>
      onFinish={handleFinish}
      formRef={formRef}
      submitter={{
        searchConfig: {
          submitText: '修改'
        },
        resetButtonProps: {
          style: {
            display: 'none'
          }
        }
      }}
      autoFocusFirstInput={false}
    >
      <Col
        span={8}
      >
        <ProForm.Item
          name="oldUserPassword"
          label="旧密码"
          rules={[
            {
              required: true,
              message: '请输入旧密码'
            }
          ]}
        >
          <Input.Password
            placeholder={'请输入旧密码'}
            maxLength={20}
          />
        </ProForm.Item>
      </Col>
      <Col
        span={8}
      >
        <ProForm.Item
          name="newUserPassword"
          label="新密码"
          rules={[
            {
              required: true,
              message: '请输入新密码'
            }
          ]}
        >
          <Input.Password
            placeholder={'请输入新密码'}
            maxLength={20}
          />
        </ProForm.Item>
      </Col>
      <Col
        span={8}
      >
        <ProForm.Item
          name="checkUserPassword"
          label="确认密码"
          rules={[
            {
              required: true,
              message: '请再次输入新密码'
            }
          ]}
        >
          <Input.Password
            placeholder={'请再次输入新密码'}
            maxLength={20}
          />
        </ProForm.Item>
      </Col>
    </ProForm>
  );
};

export default PasswordView;
