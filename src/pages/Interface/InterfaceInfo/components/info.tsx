import {ModalForm, PageContainer, ProCard, ProDescriptions, ProForm, ProFormInstance} from '@ant-design/pro-components';
import React, {useEffect, useRef, useState} from 'react';
import {
  getInterfaceInfoVoByIdUsingGET,
  getInterfaceLeftNumUsingGET,
  invokeInterfaceUsingPOST
} from "@/services/duckapi-backend/interfaceInfoController";
import {Button, Col, ConfigProvider, Divider, InputNumber, message, Radio, Row, Space, Table} from "antd";
import ReactCodeMirror from "@uiw/react-codemirror";
import {ColumnsType} from "antd/es/table";
import {ProDescriptionsItemProps} from "@ant-design/pro-descriptions";
import {useModel} from "@@/exports";

export type InterfaceInfoProps = {
  onFinish: (invokeCount: number) => Promise<boolean>;
  interfaceId: number;
  paySuccess: boolean;
};

type HeadersType = {
  id: React.Key;
  name: string;
  content: string;
};

type ParamsType = {
  id: React.Key;
  name: string;
  require?: boolean | string;
  type: string;
  description: string;
};

type InterfaceInfoVO = {
  name: string;
  description: string;
  url: string;
  method: string;
  requestHeader: HeadersType[];
  responseHeader: HeadersType[];
  requestParam: ParamsType[];
  responseParam: ParamsType[];
};

const InfoView: React.FC<InterfaceInfoProps> = (props) => {
  const interfaceInfoColumns: ProDescriptionsItemProps<InterfaceInfoVO>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text'
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: 'text'
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'text'
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'select',
      valueEnum: {
        GET: 'GET',
        POST: 'POST'
      }
    }
  ];
  const headerInfoColumns: ColumnsType<HeadersType> = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '内容',
      dataIndex: 'content',
    }
  ];
  const requestParamInfoColumns: ColumnsType<ParamsType> = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '必需',
      dataIndex: 'require',
      render: value => {
        switch (value) {
          case true:
            return "是";
          case false:
            return "否";
          default:
            return "参数错误";
        }
      }

    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '描述',
      dataIndex: 'description',
    }
  ];
  const responseParamInfoColumns: ColumnsType<ParamsType> = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '描述',
      dataIndex: 'description',
    }
  ];

  const [dataSource, setDataSource] = useState<InterfaceInfoVO>();
  const [loading, setLoading] = useState<boolean>(false);
  const [invokeParam, setInvokeParam] = useState<string>('');
  const [invokeResult, setInvokeResult] = useState<any>();
  const [leftNum, setLeftNum] = useState<number>(0);
  const [num, setNum] = useState<number>(20);
  const [inputNum, setInputNum] = useState<number>(0);
  const [customNum, setCustomNum] = useState<boolean>(false);

  const actionRef = useRef<API.InterfaceInfoVO>();
  const formRef = useRef<ProFormInstance>();

  const { initialState } = useModel('@@initialState');

  const { onFinish, interfaceId, paySuccess } = props;

  /**
   * 加载接口信息
   */
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getInterfaceInfoVoByIdUsingGET(
        {
          id: interfaceId
        }
      );
      setLoading(false);
      return res?.data ?? {};
    } catch (error) {
      setLoading(false);
      message.error('系统错误');
      return {};
    }
  };
  /**
   * 验证参数JSON格式
   */
  const verifyJson = async (invokeParam: string) => {
    if (!invokeParam) {
      return true;
    }
    try {
      JSON.stringify(JSON.parse(invokeParam));
      return true;
    } catch (error) {
      message.error('参数格式错误，请重新输入');
      return false;
    }
  };

  useEffect(() => {
    if (!initialState?.loginUser) {
      return;
    }
    loadData().then(data => {
      let requestHeader: HeadersType[] = [];
      let responseHeader: HeadersType[] = [];
      let requestParam: ParamsType[] = [];
      let responseParam: ParamsType[] = [];
      if (data?.requestHeader) {
        requestHeader = JSON.parse(data?.requestHeader);
        requestHeader.map((item, index) => item.id = index);
      }
      if (data?.responseHeader) {
        responseHeader = JSON.parse(data?.responseHeader);
        responseHeader.map((item, index) => item.id = index);
      }
      if (data?.requestParam) {
        requestParam = JSON.parse(data?.requestParam);
        requestParam.map((item, index) => item.id = index);
      }
      if (data?.responseParam) {
        responseParam = JSON.parse(data?.responseParam);
        responseParam.map((item, index) => item.id = index);
      }
      const value = {
        name: data?.name ?? '',
        description: data?.description ?? '',
        url: data?.url ?? '',
        method: data?.method ?? '',
        requestHeader: requestHeader,
        responseHeader: responseHeader,
        requestParam: requestParam,
        responseParam: responseParam,
      }
      setLeftNum(data?.leftNum ?? 0)
      setDataSource(value);
    }, async () => {
      message.error("获取接口信息失败");
    });
  }, []);

  //轮询剩余调用次数
  useEffect(() => {
    if (!initialState?.loginUser) {
      return;
    }
    getInterfaceLeftNumUsingGET(
      {
        interfaceId: interfaceId
      }
    ).then(res => {
      if (dataSource && res.data !== undefined) {
        setLeftNum(res.data);
      }
    },(error) => {
      console.log("===================================")
      console.log(error)
      console.log("===================================")
    })
  }, [invokeResult, paySuccess]);

  return (
    <PageContainer>
      <Row>
        <Col
          span={11}
        >
          <ProCard>
            <ProDescriptions
              actionRef={actionRef}
              loading={loading}
              title={'接口信息'}
              columns={interfaceInfoColumns}
              column={1}
              // 展示边框
              bordered={true}
              size={"small"}
              dataSource={dataSource}
            />
          </ProCard>
        </Col>
      </Row>
      <Divider/>
      <Row>
        <Col
          span={11}
        >
          <ProCard
            title={(<div style={{fontWeight: 'bold'}}>请求头</div>)}
            className={"interface-info"}
          >
            <ConfigProvider
              renderEmpty={() => (<>无请求头</>)}
            >
              <Table
                columns={headerInfoColumns}
                dataSource={dataSource?.requestHeader}
                bordered
                loading={loading}
                pagination={false}
              />
            </ConfigProvider>
          </ProCard>
        </Col>
        <Divider type={"vertical"}/>
        <Col
          span={11}
        >
          <ProCard
            title={(<div style={{fontWeight: 'bold'}}>响应头</div>)}
            className={"interface-info"}
          >
            <ConfigProvider
              renderEmpty={() => (<>无响应头</>)}
            >
              <Table
                columns={headerInfoColumns}
                dataSource={dataSource?.responseHeader}
                bordered
                loading={loading}
                pagination={false}
              />
            </ConfigProvider>
          </ProCard>
        </Col>
      </Row>
      <Divider/>
      <Row>
        <Col
          span={11}
        >
          <ProCard
            title={(<div style={{fontWeight: 'bold'}}>请求参数</div>)}
            className={"interface-info"}
          >
            <ConfigProvider
              renderEmpty={() => (<>无请求参数</>)}
            >
              <Table
                columns={requestParamInfoColumns}
                dataSource={dataSource?.requestParam}
                bordered
                loading={loading}
                pagination={false}
              />
            </ConfigProvider>
          </ProCard>
        </Col>
        <Divider type={"vertical"}/>
        <Col
          span={11}
        >
          <ProCard
            title={(<div style={{fontWeight: 'bold'}}>响应参数</div>)}
            className={"interface-info"}
          >
            <ConfigProvider
              renderEmpty={() => (<>无响应参数</>)}
            >
              <Table
                columns={responseParamInfoColumns}
                dataSource={dataSource?.responseParam}
                bordered
                loading={loading}
                pagination={false}
              />
            </ConfigProvider>
          </ProCard>
        </Col>
      </Row>
      <Divider/>
      <ProCard
        title={dataSource?.name}
        subTitle={dataSource?.url}
        extra={
          <Space>
            <div>
              剩余调用次数: {leftNum}
            </div>
            <Divider type={"vertical"}/>
            <ModalForm<{
              invokeNum: string;
            }>
              title="购买调用次数"
              formRef={formRef}
              trigger={
                <Button type="primary">
                  购买次数
                </Button>
              }
              submitter={{
                searchConfig: {
                  submitText: "支付"
                }
              }}
              onFinish={async (values) => {
                let num = values.invokeNum;
                if (typeof num === "string") {
                  const regexp = /[^\d.]/g;
                  num = num.replace(regexp, '')
                }
                const invokeNum = Math.round(Number.parseInt(num));
                return await onFinish(invokeNum);
              }}
            >
              <ProForm.Item
                name={"invokeNum"}
                initialValue={num}
              >
                <Space
                  direction={"vertical"}
                >
                  <Radio.Group
                    onChange={(event) => {
                      setCustomNum(false);
                      setNum(Number.parseInt(event.target.value));
                    }}
                    style={{marginTop: 16}}
                    value={customNum ? undefined : num + ""}
                  >
                    <Space>
                      <Radio.Button value="10">10</Radio.Button>
                      <Radio.Button value="20">20</Radio.Button>
                      <Radio.Button value="50">50</Radio.Button>
                      <Radio.Button value="100">100</Radio.Button>
                    </Space>
                  </Radio.Group>
                  <InputNumber
                    defaultValue={0}
                    onClick={() => {
                      if (!customNum) {
                        formRef.current?.setFieldValue("invokeNum", inputNum);
                      }
                      setCustomNum(true);
                    }}
                    placeholder={"自定义次数"}
                    controls={false}
                    min={0}
                    max={1000}
                    style={{
                      width: "100px"
                    }}
                    precision={0}
                    onChange={(value) => {
                      setInputNum(Math.round(value ?? 0));
                      formRef.current?.setFieldValue("invokeNum", inputNum);
                    }}
                  />
                </Space>
              </ProForm.Item>
            </ModalForm>
            <Button
              type={"primary"}
              onClick={async () => {
                const success = await verifyJson(invokeParam);
                if (success) {
                  const res = await invokeInterfaceUsingPOST({
                    id: interfaceId,
                    param: invokeParam
                  });
                  if (res.code === 0) {
                    setInvokeResult(res.data);
                  }else {
                    setInvokeResult(res);
                  }
                }
              }}
              disabled={leftNum <= 0}
            >
              调试
            </Button>
          </Space>
        }
      >
        <ReactCodeMirror
          minHeight={'150px'}
          onChange={(value) => {
            setInvokeParam(value);
          }}
        />
      </ProCard>
      <Divider/>
      <ProCard
        title={'调用结果'}
      >
        <ReactCodeMirror
          value={JSON.stringify(invokeResult)}
          minHeight={'150px'}
        />
      </ProCard>
    </PageContainer>
  );
};

export default InfoView;
