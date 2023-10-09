import {ProForm, ProFormInstance,} from '@ant-design/pro-components';
import '@umijs/max';
import {ConfigProvider, Input, InputNumber, Modal} from 'antd';
import React from 'react';

export type BaseFormProps = {
  onCancel: () => void;
  onSubmit: (values: API.GoldCoinGoodsVO) => Promise<boolean>;
  visible: boolean;
  values?: API.GoldCoinGoodsVO;
  title?: string;
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
  width?: number;
};
const BaseForm: React.FC<BaseFormProps> = (props) => {
  const {onCancel, onSubmit, visible, values, title, formRef, width} = props;

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={() => {
        onCancel();
        const value = formRef.current?.getFieldsValue();
        formRef.current?.resetFields();
        formRef.current?.setFieldsValue(value);
      }}
      footer={[]}
      width={width ? width : 960}
    >
      <ConfigProvider
        renderEmpty={() => (<></>)}
      >
        <ProForm
          formRef={formRef}
          onFinish={async () => {
            const value = await formRef?.current?.validateFieldsReturnFormatValue?.();
            const success = await onSubmit(value);
            if (success) {
              formRef?.current?.resetFields?.();
            }
          }}
          initialValues={values ? values : formRef.current?.getFieldsValue()}
        >
          <ProForm.Item
            label={"商品名称"}
            name={"name"}
            rules={[
              {
                required: true,
                message: '商品名称不能为空'
              },
              {
                max: 20,
                message: '商品名称不能超过20个字符'
              },
            ]}
          >
            <Input
              maxLength={20}
              placeholder={"请输入商品名称"}
              showCount
            />
          </ProForm.Item>
          <ProForm.Item
            label={"商品描述"}
            name={"description"}
            rules={[
              {
                required: true,
                message: '商品描述不能为空'
              },
              {
                max: 50,
                message: '商品描述不能超过50个字符'
              },
            ]}
          >
            <Input
              maxLength={50}
              placeholder={"请输入商品描述"}
              showCount
            />
          </ProForm.Item>
          <ProForm.Item
            label={"金币数量"}
            name={"number"}
            rules={[
              {
                required: true,
                message: '金币数量不能为空'
              }
            ]}
          >
            <InputNumber
              placeholder={"请输入金币数量"}
              min={1}
              precision={0}
              style={{
                width: '125px'
              }}
            />
          </ProForm.Item>
          <ProForm.Item
            label={"价格"}
            name={"price"}
            rules={[
              {
                required: true,
                message: '商品单价不能为空'
              }
            ]}
          >
            <InputNumber
              placeholder={"请输入商品单价"}
              min={0}
              precision={2}
              controls={false}
              style={{
                width: '125px'
              }}
            />
          </ProForm.Item>
        </ProForm>
      </ConfigProvider>
    </Modal>
  );
};
export default BaseForm;
