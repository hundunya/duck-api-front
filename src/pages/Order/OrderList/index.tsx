import {ActionType, PageContainer, ProForm, ProFormText, ProList} from '@ant-design/pro-components';
import React, {useEffect, useRef, useState} from 'react';
import {Badge, Button, Card, Col, message, Row, Select, Space} from "antd";
import {
  cancelGoldCoinGoodsOrderUsingPOST,
  deleteGoldCoinGoodsOrderUsingPOST,
  getGoldCoinGoodsOrderQrCodeUsingPOST,
  listGoldCoinGoodsOrderVoByPageUsingPOST
} from "@/services/duckapi-backend/goldCoinGoodsOrderController";
import {history} from "@@/core/history";

const Index: React.FC = () => {
  const [dataSource, setDataSource] = useState<API.GoldCoinGoodsOrderVO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [param] = useState<API.GoldCoinGoodsOrderQueryRequest>({current: current, pageSize: pageSize});
  const [total, setTotal] = useState<number>(0);
  const [disabledIndex, setDisabledIndex] = useState<number>(-1);
  const actionRef = useRef<ActionType>();

  /**
   * 删除订单
   * @param id 订单ID
   * @param index 订单下标
   */
  const deleteGoldCoinGoodsOrder = async (id: number, index: number) => {
    try {
      setDisabledIndex(index);
      const res = await deleteGoldCoinGoodsOrderUsingPOST({
        id: id
      });
      if (res.code === 0) {
        message.success("删除成功");
        actionRef.current?.reload();
      }
    } catch (error) {
      message.error('系统错误');
    } finally {
      setDisabledIndex(-1);
    }
  };
  /**
   * 加载数据
   * @param params 查询参数
   */
  const loadData = async (params: Record<string, any> & {
    pageSize?: number;
    current?: number;
    keyword?: string;
  }) => {
    setLoading(true);
    const res = await listGoldCoinGoodsOrderVoByPageUsingPOST({
      ...params
    })
    setLoading(false);
    if (res.data) {
      setTotal(res.data.total ?? 0);
      return {
        data: res.data.records,
        success: true,
        total: res.data.total
      }
    }
    return {
      data: [],
      success: false,
      total: 0
    }
  };
  /**
   * 取消订单
   * @param id 订单ID
   * @param index 订单下标
   */
  const cancelGoldCoinGoodsOrder = async (id: number, index: number) => {
    // 取消订单
    try {
      setDisabledIndex(index);
      const res = await cancelGoldCoinGoodsOrderUsingPOST({
        id: id
      });
      if (res.code === 0){
        message.success('取消订单成功');
        actionRef.current?.reload();
      }
    } catch (e) {
      message.error('系统错误');
    } finally {
      setDisabledIndex(-1);
    }
  };
  /**
   * 支付订单
   */
  const payGoldCoinGoodsOrder = async (id: number, index: number, outTradeNo: string, totalAmount: number) => {
    try {
      setDisabledIndex(index);
      const res = await getGoldCoinGoodsOrderQrCodeUsingPOST({
        id: id
      });
      if (res.code === 0){
        // 获取二维码成功
        history.push(
            '/pay',
            {
              qrCode: res.data as string,
              outTradeNo: outTradeNo,
              totalAmount: totalAmount,
              redirect: history.location.pathname
            }
        )
      }
    } catch (e) {
      message.error('系统错误');
    } finally {
      setDisabledIndex(-1);
    }
  };

  useEffect(() => {
    loadData(param).then(async (res) => {
      setDataSource(res.data ?? []);
    },async (error) => {
      console.log(error);
      message.error("加载数据失败");
    });
  }, [current, pageSize]);


  return (
    <PageContainer>
      <Card>
        <ProForm<API.GoldCoinGoodsOrderQueryRequest>
            grid
            layout={"horizontal"}
            onFinish={async (values) => {
              param.name = values.name;
              param.description = values.description;
              param.outTradeNo = values.outTradeNo;
              param.status = values.status;
              param.current = current;
              param.pageSize = pageSize;

              loadData(param).then(async (res) => {
                setDataSource(res.data ?? []);
              },async (error) => {
                console.log(error);
                message.error("加载数据失败");
              });
            }}
            submitter={{
              searchConfig: {
                submitText: '查询'
              }
            }}
        >
          <ProFormText colProps={{span: 6}} width="sm" name={"name"} label="订单名称" />
          <ProFormText colProps={{span: 6}} width="sm" name={"description"} label="订单描述" />
          <ProFormText colProps={{span: 6}} width="sm" name={"outTradeNo"} label="订单号" />
          <ProForm.Item
              name={"status"}
              label={"订单状态"}
          >
            <Select
                style={{ width: 120 }}
                allowClear={true}
                options={[
                  { value: 0, label: '待支付' },
                  { value: 1, label: '已支付' },
                  { value: 2, label: '已取消' },
                ]}
            />
          </ProForm.Item>
        </ProForm>
      </Card>
      <br/>
      <ProList<API.GoldCoinGoodsOrderVO>
        actionRef={actionRef}
        headerTitle={(
          <div
            style={{
              fontWeight: 'bold',
              fontSize: 20
            }}
          >
            订单记录
          </div>
        )}
        pagination={{
          current: current,
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          total: total,
          onChange: (page, pageSize) => {
            param.current = page;
            param.pageSize = pageSize;
            setPageSize(pageSize);
            setCurrent(page);
          },
        }}
        loading={loading}
        rowKey="id"
        dataSource={dataSource}
        onDataSourceChange={setDataSource}
        metas={{
          title: {
            dataIndex: 'name',
            render: (_, record) => (
              <a
                href={`/order/info?id=${record.id}`}
                key={record.id}
                style={{
                  fontWeight: 'bold',
                  fontSize: 18
                }}
              >
                {record.name}
              </a>
            )
          },
          description: {
            dataIndex: 'description',
            valueType: 'text',
            render: (_, entity, index) => {

              return (
                <div
                  key={index}
                  style={{
                    color: 'black'
                  }}
                >
                  <Row>
                    <Col>
                      订单号：
                    </Col>
                    <Col>
                      {entity.outTradeNo}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      订单描述：
                    </Col>
                    <Col>
                      {entity.description}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      创建时间：
                    </Col>
                    <Col>
                      {entity.createTime}
                    </Col>
                  </Row>
                </div>
              );
            }
          },
          content: {
            render: (_, entity, index) => {
              let status: readonly ["processing", "success", "default"] = ["processing", "success", "default"];
              let statusText: string;
              switch (entity.status) {
                case 0:
                  statusText = "待支付";
                  break;
                case 1:
                  statusText = "已支付";
                  break;
                default:
                  statusText = "已取消";
              }

              return (
                <div key={index}>
                  <Row>
                    <Col>
                      状态：
                      <Badge status={status[entity.status ?? 2]} text={statusText} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      实付款：
                    </Col>
                    <Col>
                      ￥{entity.payAmount?.toFixed(2)}
                    </Col>
                  </Row>
                </div>
              );
            }
          },
          actions: {
            render: (_, record, index) => {
              const id = record.id ?? -1;
              const outTradeNo = record.outTradeNo ?? "";
              const totalAmount = record.totalAmount ?? 0;

              return (
                <Space>
                  <Button
                    href={`/order/info?id=${record.id}`}
                    key={"view"}
                  >
                    查看
                  </Button>
                  {
                    record.status === 0 ?
                      <Button
                        key={"pay"}
                        disabled={disabledIndex === index}
                        onClick={async () => {
                          await payGoldCoinGoodsOrder(id, index, outTradeNo, totalAmount);
                        }}
                      >
                        支付
                      </Button> : <></>
                  }
                  {
                    record.status === 0 ?
                      <Button
                        key={"cancel"}
                        disabled={disabledIndex === index}
                        onClick={async () => {
                          await cancelGoldCoinGoodsOrder(id, index);
                        }}
                      >
                        取消
                      </Button> : <></>
                  }
                  {
                    record.status !== 0 ?
                      <Button
                        key={"delete"}
                        danger={true}
                        disabled={disabledIndex === index}
                        onClick={async () => {
                          await deleteGoldCoinGoodsOrder(id, index);
                        }}
                      >
                        删除
                      </Button> : <></>
                  }
                </Space>
              );
            },
          },
        }}
        // request={loadData}
      />
    </PageContainer>
  );
};

export default Index;
