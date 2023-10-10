import {PageContainer, ProCard, ProDescriptions} from '@ant-design/pro-components';
import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "umi";
import {ProDescriptionsItemProps} from "@ant-design/pro-descriptions";
import {ColumnsType} from "antd/es/table";
import {history, useModel} from "@@/exports";
import {Button, Col, ConfigProvider, Divider, message, Row, Space, Table} from "antd";
import {
  getInterfaceInfoVoByIdUsingGET,
  invokeInterfaceUsingPOST
} from "@/services/duckapi-backend/interfaceInfoController";
import ReactCodeMirror from "@uiw/react-codemirror";
import {getLoginUserUsingGET} from "@/services/duckapi-backend/userController";
import {flushSync} from "react-dom";
import defaultSettings from "../../../../config/defaultSettings";
import {Settings as LayoutSettings} from "@ant-design/pro-layout";

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

const Index: React.FC = () => {
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
  const [goldCoinBalance, setGoldCoinBalance] = useState<number>(0);

  const actionRef = useRef<API.InterfaceInfoVO>();

  const {initialState, setInitialState} = useModel('@@initialState');

  const location = useLocation();
  const interfaceId = Number.parseInt(location.search.replace("?id=",""));


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
   * 获取金币余额
   */
  const getGoldCoinBalance = async () => {
    if (!initialState?.loginUser) {
      return;
    }
    try {
      const res = await getLoginUserUsingGET();
      flushSync(() => {
        setInitialState({
          loginUser: res.data,
          settings: defaultSettings as Partial<LayoutSettings>,
        });
        setGoldCoinBalance(res.data?.goldCoinBalance ?? 0);
      })
    } catch (e) {
      console.log("===================================")
      console.log(e)
      console.log("===================================")
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
    loadData().then(async (data) => {
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
      await getGoldCoinBalance();
      setDataSource(value);
    }, async () => {
      message.error("获取接口信息失败");
    });
  }, []);

  //轮询剩余调用次数
  useEffect(() => {
    if (initialState?.loginUser){
      getGoldCoinBalance();
    }
  }, [invokeResult]);

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

      {/*接口调用部分*/}
      {initialState?.loginUser ?
        <>
          <Divider/>
          <ProCard
            title={dataSource?.name}
            subTitle={dataSource?.url}
            extra={
              <Space>
                <div>
                  金币余额: {goldCoinBalance}
                </div>
                <Divider type={"vertical"}/>
                <Button
                  type={"primary"}
                  onClick={() => {
                    history.push("/mall");
                  }}
                >
                  购买金币
                </Button>
                <Button
                  type={"primary"}
                  onClick={async () => {
                    const success = await verifyJson(invokeParam);
                    if (success) {
                      const res = await invokeInterfaceUsingPOST({
                        id: interfaceId,
                        param: invokeParam
                      });
                      console.log(res)
                      if (res.code === 0) {
                        setInvokeResult(res.data);
                      } else {
                        setInvokeResult(res);
                      }
                    }
                  }}
                  disabled={goldCoinBalance <= 0}
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
              value={typeof invokeResult === "string" ? invokeResult:JSON.stringify(invokeResult)}
              minHeight={'150px'}
            />
          </ProCard>
        </> : <></>
      }
    </PageContainer>
  );
};

export default Index;
