import {ActionType, EditableProTable, ProColumns, ProForm, ProFormInstance,} from '@ant-design/pro-components';
import '@umijs/max';
import {ConfigProvider, Input, InputNumber, Modal, Select} from 'antd';
import React, {useRef, useState} from 'react';

export type BaseFormProps = {
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoVO) => Promise<boolean>;
  visible: boolean;
  values?: API.InterfaceInfoVO;
  title?: string;
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
  width?: number;
};
const BaseForm: React.FC<BaseFormProps> = (props) => {
  const {onCancel, onSubmit, visible, values, title, formRef, width} = props;
  const requestHeaderActionRef = useRef<ActionType>();
  const responseHeaderActionRef = useRef<ActionType>();
  const requestParamActionRef = useRef<ActionType>();
  const responseParamActionRef = useRef<ActionType>();

  const [requestHeaderEditId, setRequestHeaderEditId] = useState<React.Key>();
  const [responseHeaderEditId, setResponseHeaderEditId] = useState<React.Key>();
  const [requestParamEditId, setRequestParamEditId] = useState<React.Key>();
  const [responseParamEditId, setResponseParamEditId] = useState<React.Key>();

  type HeadersType = {
    id: React.Key;
    name: string;
    content: string;
  };

  type ParamsType = {
    id: React.Key;
    name: string;
    require?: boolean;
    type: string;
    description: string;
  };

  const valueType = [
    {value: 'string', label: 'string'},
    {value: 'byte', label: 'byte'},
    {value: 'short', label: 'short'},
    {value: 'int', label: 'int'},
    {value: 'long', label: 'long'},
    {value: 'boolean', label: 'boolean'},
    {value: 'object', label: 'object'},
  ];

  const requestHeaderColumns: ProColumns<HeadersType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: ({
        rules: [
          {
            required: true,
            validator: (_, value) => {
              if (!value || value === '') {
                return Promise.reject('输入不能为空');
              }
              const requestHeader: HeadersType[] = formRef.current?.getFieldValue('requestHeader');
              if (!requestHeader) {
                return Promise.resolve();
              }
              for (const item of requestHeader) {
                if (item.name === value && item.id !== requestHeaderEditId) {
                  return Promise.reject('请求头重复');
                }
              }
              return Promise.resolve();
            },
          }
        ]
      }),
      renderFormItem: () => {
        return (
          <>
            <Input
              maxLength={20}
              placeholder={'请输入请求头名称'}
            />
          </>
        );
      },
      render: (_, record) => {
        return (
          <>
            <Input
              value={record.name}
              disabled
              style={{
                color: '#000'
              }}
            />
          </>
        );
      }
    },
    {
      title: '内容',
      dataIndex: 'content',
      formItemProps: ({
        rules: [
          {
            required: true,
            validator: (_, value) => {
              if (!value || value === '') {
                return Promise.reject('输入不能为空');
              }
              return Promise.resolve();
            },
          }
        ]
      }),
      renderFormItem: () => {
        return (
          <>
            <Input.TextArea
              maxLength={512}
              placeholder={'请输入请求头内容'}
            />
          </>
        );
      },
      render: (_, record) => {
        return (
          <>
            <Input.TextArea
              value={record.content}
              disabled
              style={{
                color: '#000'
              }}
            />
          </>
        );
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => {
        return [
          <a
            key={"edit"}
            onClick={() => {
              if (requestHeaderEditId !== undefined) {
                return;
              }
              requestHeaderActionRef.current?.startEditable(record.id);
              setRequestHeaderEditId(record.id);
            }}
          >
            编辑
          </a>,
          <a
            key={"delete"}
            onClick={() => {
              let requestHeader: HeadersType[] = formRef.current?.getFieldValue('requestHeader');
              requestHeader = requestHeader.filter(item => item.name !== record.name)
              formRef.current?.setFieldValue('requestHeader', requestHeader);
            }}
          >
            删除
          </a>
        ];
      }
    },
  ];

  const responseHeaderColumns: ProColumns<HeadersType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: ({
        rules: [
          {
            required: true,
            validator: (_, value) => {
              if (!value || value === '') {
                return Promise.reject('输入不能为空');
              }
              const requestHeader: HeadersType[] = formRef.current?.getFieldValue('responseHeader');
              if (!requestHeader) {
                return Promise.resolve();
              }
              for (const item of requestHeader) {
                if (item.name === value && item.id !== responseHeaderEditId) {
                  return Promise.reject('响应头重复');
                }
              }
              return Promise.resolve();
            },
          }
        ]
      }),
      renderFormItem: () => {
        return (
          <>
            <Input
              maxLength={20}
              placeholder={'请输入响应头名称'}
            />
          </>
        );
      },
      render: (_, record) => {
        return (
          <>
            <Input
              value={record.name}
              disabled
              style={{
                color: '#000'
              }}
            />
          </>
        );
      }
    },
    {
      title: '内容',
      dataIndex: 'content',
      formItemProps: ({
        rules: [
          {
            required: true,
            validator: (_, value) => {
              if (!value || value === '') {
                return Promise.reject('输入不能为空');
              }
              return Promise.resolve();
            },
          }
        ]
      }),
      renderFormItem: () => {
        return (
          <>
            <Input.TextArea
              maxLength={512}
              placeholder={'请输入响应头内容'}
            />
          </>
        );
      },
      render: (_, record) => {
        return (
          <>
            <Input.TextArea
              value={record.content}
              disabled
              style={{
                color: '#000'
              }}
            />
          </>
        );
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => {
        return [
          <a
            key={"edit"}
            onClick={() => {
              if (responseHeaderEditId !== undefined) {
                return;
              }
              responseHeaderActionRef.current?.startEditable(record.id);
              setResponseHeaderEditId(record.id);
            }}
          >
            编辑
          </a>,
          <a
            key={"delete"}
            onClick={() => {
              let responseHeader: HeadersType[] = formRef.current?.getFieldValue('responseHeader');
              responseHeader = responseHeader.filter(item => item.name !== record.name)
              formRef.current?.setFieldValue('responseHeader', responseHeader);
            }}
          >
            删除
          </a>
        ];
      }
    },
  ];

  const requestParamColumns: ProColumns<ParamsType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: ({
        rules: [
          {
            required: true,
            validator: (_, value) => {
              if (!value || value === '') {
                return Promise.reject('输入不能为空');
              }
              const requestParam: HeadersType[] = formRef.current?.getFieldValue('requestParam');
              if (!requestParam) {
                return Promise.resolve();
              }
              for (const item of requestParam) {
                if (item.name === value && item.id !== requestParamEditId) {
                  return Promise.reject('请求参数重复');
                }
              }
              return Promise.resolve();
            },
          }
        ]
      }),
      renderFormItem: () => {
        return (
          <>
            <Input
              maxLength={20}
              placeholder={'请输入请求参数名称'}
            />
          </>
        );
      },
      render: (_, record) => {
        return (
          <>
            <Input
              value={record.name}
              disabled
              style={{
                color: '#000'
              }}
            />
          </>
        );
      }
    },
    {
      title: '是否必需',
      dataIndex: 'require',
      renderFormItem: (schema, config) => {
        const record = config.record;
        return (
          <>
            <Select
              value={record?.require}
              options={[
                {value: true, label: '是'},
                {value: false, label: '否'}
              ]}
            />
          </>
        );
      },
      render: (_, record) => {
        return (
          <>
            <Input
              value={record.require ? '是' : '否'}
              disabled
              style={{
                color: '#000'
              }}
            />
          </>
        );
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      renderFormItem: () => {
        return (
          <>
            <Select
              options={valueType}
            />
          </>
        );
      },
      render: (_, record) => {
        return (
          <>
            <Input
              value={record.type}
              disabled
              style={{
                color: '#000'
              }}
            />
          </>
        );
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      formItemProps: ({
        rules: [
          {
            required: true,
            validator: (_, value) => {
              if (!value || value === '') {
                return Promise.reject('输入不能为空');
              }
              return Promise.resolve();
            },
          }
        ]
      }),
      renderFormItem: () => {
        return (
          <>
            <Input
              maxLength={50}
              placeholder={'请输入请求参数描述'}
            />
          </>
        );
      },
      render: (_, record) => {
        return (
          <>
            <Input
              value={record.description}
              disabled
              style={{
                color: '#000'
              }}
            />
          </>
        );
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => {
        return [
          <a
            key={"edit"}
            onClick={() => {
              if (requestParamEditId !== undefined) {
                return;
              }
              requestParamActionRef.current?.startEditable(record.id);
              setRequestParamEditId(record.id);
            }}
          >
            编辑
          </a>,
          <a
            key={"delete"}
            onClick={() => {
              let requestParam: ParamsType[] = formRef.current?.getFieldValue('requestParam');
              requestParam = requestParam.filter(item => item.name !== record.name)
              formRef.current?.setFieldValue('requestParam', requestParam);
            }}
          >
            删除
          </a>
        ];
      }
    },
  ];

  const responseParamColumns: ProColumns<ParamsType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: ({
        rules: [
          {
            required: true,
            validator: (_, value) => {
              if (!value || value === '') {
                return Promise.reject('输入不能为空');
              }
              const responseParam: HeadersType[] = formRef.current?.getFieldValue('responseParam');
              if (!responseParam) {
                return Promise.resolve();
              }
              for (const item of responseParam) {
                if (item.name === value && item.id !== responseParamEditId) {
                  return Promise.reject('响应参数重复');
                }
              }
              return Promise.resolve();
            },
          }
        ]
      }),
      renderFormItem: () => {
        return (
          <>
            <Input
              maxLength={20}
              placeholder={'请输入响应参数名称'}
            />
          </>
        );
      },
      render: (_, record) => {
        return (
          <>
            <Input
              value={record.name}
              disabled
              style={{
                color: '#000'
              }}
            />
          </>
        );
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      renderFormItem: () => {
        return (
          <>
            <Select
              options={valueType}
            />
          </>
        );
      },
      render: (_, record) => {
        return (
          <>
            <Input
              value={record.type}
              disabled
              style={{
                color: '#000'
              }}
            />
          </>
        );
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      formItemProps: ({
        rules: [
          {
            required: true,
            validator: (_, value) => {
              if (!value || value === '') {
                return Promise.reject('输入不能为空');
              }
              return Promise.resolve();
            },
          }
        ]
      }),
      renderFormItem: () => {
        return (
          <>
            <Input
              maxLength={50}
              placeholder={'请输入响应参数描述'}
            />
          </>
        );
      },
      render: (_, record) => {
        return (
          <>
            <Input
              value={record.description}
              disabled
              style={{
                color: '#000'
              }}
            />
          </>
        );
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => {
        return [
          <a
            key={"edit"}
            onClick={() => {
              if (responseParamEditId !== undefined) {
                return;
              }
              responseParamActionRef.current?.startEditable(record.id);
              setResponseParamEditId(record.id);
            }}
          >
            编辑
          </a>,
          <a
            key={"delete"}
            onClick={() => {
              let responseParam = formRef.current?.getFieldValue('responseParam');
              responseParam = responseParam.filter((item: ParamsType) => item.name !== record.name)
              formRef.current?.setFieldValue('responseParam', responseParam);
            }}
          >
            删除
          </a>
        ];
      }
    },
  ];

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
            const form = await formRef?.current?.validateFieldsReturnFormatValue?.();

            const requestHeader: any = [];
            const responseHeader: any = [];
            const requestParam: any = [];
            const responseParam: any = [];

            if (form.requestHeader) {
              form.requestHeader.map(
                (item: any) => requestHeader.push({
                  name: item.name,
                  content: item.content
                })
              );
            }

            if (form.responseHeader) {
              form.responseHeader.map(
                (item: any) => responseHeader.push({
                  name: item.name,
                  content: item.content
                })
              );
            }

            if (form.requestParam) {
              form.requestParam.map(
                (item: any) => requestParam.push({
                  name: item.name,
                  require: item.require,
                  type: item.type,
                  description: item.description
                })
              );
            }

            if (form.responseParam) {
              form.responseParam.map(
                (item: any) => responseParam.push({
                  name: item.name,
                  type: item.type,
                  description: item.description
                })
              );
            }

            const value: Partial<API.InterfaceInfoVO> = {
              name: form.name,
              description: form.description,
              url: form.url,
              method: form.method,
              price: form.price,
              requestHeader: JSON.stringify(requestHeader),
              responseHeader: JSON.stringify(responseHeader),
              requestParam: JSON.stringify(requestParam),
              responseParam: JSON.stringify(responseParam)
            };
            const success = await onSubmit(value);
            if (success) {
              formRef?.current?.resetFields?.();
            }
          }}
          initialValues={values ? values : formRef.current?.getFieldsValue()}
        >
          <ProForm.Item
            label={"接口名称"}
            name={"name"}
            rules={[
              {
                required: true,
                message: '接口名称不能为空'
              },
              {
                max: 20,
                message: '接口名称不能超过20个字符'
              },
            ]}
          >
            <Input
              maxLength={20}
              placeholder={"请输入接口名称"}
              showCount
            />
          </ProForm.Item>
          <ProForm.Item
            label={"接口描述"}
            name={"description"}
            rules={[
              {
                required: true,
                message: '接口描述不能为空'
              },
              {
                max: 50,
                message: '接口描述不能超过50个字符'
              },
            ]}
          >
            <Input
              maxLength={50}
              placeholder={"请输入接口描述"}
              showCount
            />
          </ProForm.Item>
          <ProForm.Item
            label={"接口地址"}
            name={"url"}
            rules={[
              {
                required: true,
                message: '接口地址不能为空'
              },
              {
                max: 512,
                message: '接口地址不能超过512个字符'
              },
            ]}
          >
            <Input
              maxLength={512}
              placeholder={"请输入接口地址"}
            />
          </ProForm.Item>
          <ProForm.Item
            label={"请求方法"}
            name={"method"}
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (!value || value === '') {
                    return Promise.reject('请求方法不能为空');
                  }
                  const METHOD_LIST = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
                  if (!METHOD_LIST.includes(value)) {
                    return Promise.reject('请输入正确的请求方法');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Select
              style={{
                width: '80px'
              }}
              options={[
                {value: 'GET', label: 'GET'},
                {value: 'POST', label: 'POST'},
                {value: 'PUT', label: 'PUT'},
                {value: 'DELETE', label: 'DELETE'},
                {value: 'PATCH', label: 'PATCH'}
              ]}
            />
          </ProForm.Item>
          <ProForm.Item
            label={"单价（金币）"}
            name={"price"}
            rules={[
              {
                required: true,
                message: '接口单价不能为空'
              }
            ]}
          >
            <InputNumber
              placeholder={"请输入接口单价"}
              min={1}
              precision={0}
              controls={false}
              style={{
                width: '125px'
              }}
            />
          </ProForm.Item>
          <ProForm.Item
            label={"请求头"}
            name={"requestHeader"}
          >
            <EditableProTable<HeadersType>
              rowKey={"id"}
              actionRef={requestHeaderActionRef}
              showHeader={false}
              toolBarRender={false}
              columns={requestHeaderColumns}
              recordCreatorProps={{
                newRecordType: 'cache',
                record: () => {
                  return {
                    id: Date.now(),
                    name: '',
                    content: ''
                  }
                },
                creatorButtonText: '添加请求头',
              }}
              maxLength={10}
              editable={{
                type: 'single',
                actionRender: (row, config, defaultDoms) => {
                  return [defaultDoms.save, defaultDoms.cancel];
                },
                onSave: async () => {
                  setRequestHeaderEditId(undefined);
                },
                onCancel: async () => {
                  setRequestHeaderEditId(undefined);
                }
              }}
            />
          </ProForm.Item>
          <ProForm.Item
            label={"响应头"}
            name={"responseHeader"}
          >
            <EditableProTable<HeadersType>
              rowKey={"id"}
              actionRef={responseHeaderActionRef}
              showHeader={false}
              toolBarRender={false}
              columns={responseHeaderColumns}
              recordCreatorProps={{
                newRecordType: 'cache',
                record: () => {
                  return {
                    id: Date.now(),
                    name: '',
                    content: ''
                  }
                },
                creatorButtonText: '添加响应头',
              }}
              maxLength={10}
              editable={{
                type: 'single',
                actionRender: (row, config, defaultDoms) => {
                  return [defaultDoms.save, defaultDoms.cancel];
                },
                onSave: async () => {
                  setResponseHeaderEditId(undefined);
                },
                onCancel: async () => {
                  setResponseHeaderEditId(undefined);
                }
              }}
            />
          </ProForm.Item>
          <ProForm.Item
            label={"请求参数"}
            name={"requestParam"}
          >
            <EditableProTable<ParamsType>
              rowKey={"id"}
              actionRef={requestParamActionRef}
              showHeader={false}
              toolBarRender={false}
              columns={requestParamColumns}
              recordCreatorProps={{
                newRecordType: 'cache',
                record: () => {
                  return {
                    id: Date.now(),
                    name: '',
                    require: false,
                    type: 'string',
                    description: ''
                  }
                },
                creatorButtonText: '添加请求参数',
              }}
              maxLength={10}
              editable={{
                type: 'single',
                actionRender: (row, config, defaultDoms) => {
                  return [defaultDoms.save, defaultDoms.cancel];
                },
                onSave: async () => {
                  setRequestParamEditId(undefined);
                },
                onCancel: async () => {
                  setRequestParamEditId(undefined);
                }
              }}
            />
          </ProForm.Item>
          <ProForm.Item
            label={"响应参数"}
            name={"responseParam"}
          >
            <EditableProTable<ParamsType>
              rowKey={"id"}
              actionRef={responseParamActionRef}
              showHeader={false}
              toolBarRender={false}
              columns={responseParamColumns}
              recordCreatorProps={{
                newRecordType: 'cache',
                record: () => {
                  return {
                    id: Date.now(),
                    name: '',
                    type: 'string',
                    description: '',
                  }
                },
                creatorButtonText: '添加响应参数',
              }}
              maxLength={10}
              editable={{
                type: 'single',
                actionRender: (row, config, defaultDoms) => {
                  return [defaultDoms.save, defaultDoms.cancel];
                },
                onSave: async () => {
                  setResponseParamEditId(undefined);
                },
                onCancel: async () => {
                  setResponseParamEditId(undefined);
                }
              }}
            />
          </ProForm.Item>
        </ProForm>
      </ConfigProvider>
    </Modal>
  );
};
export default BaseForm;
