import {PageContainer, ProCard, ProDescriptions, ProDescriptionsActionType} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import {history, useLocation} from "umi";
import {Button, Card, Col, message, Row, Tooltip} from "antd";
import {
    cancelGoldCoinGoodsOrderUsingPOST,
    deleteGoldCoinGoodsOrderUsingPOST, getGoldCoinGoodsOrderQrCodeUsingPOST,
    getGoldCoinGoodsOrderVoByIdUsingGET
} from "@/services/duckapi-backend/goldCoinGoodsOrderController";
import {WECHAT_QRCODE} from "@/constants";

const Index: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0.00);
    const [outTradeNo, setOutTradeNo] = useState<string>("");

    const actionRef = useRef<ProDescriptionsActionType>();

    const location = useLocation();
    const id = Number.parseInt(location.search.replace("?id=", ""));


    /**
     * 加载订单信息
     */
    const loadData = async () => {
        // 查询订单信息
        setLoading(true);
        try {
            const res = await getGoldCoinGoodsOrderVoByIdUsingGET(
                {
                    id: id
                }
            );
            if (res.code === 0) {
                setStatus(res.data?.status ?? 0);
                setTotalAmount(res.data?.totalAmount ?? 0);
                setOutTradeNo(res.data?.outTradeNo ?? "");
                return {
                    success: true,
                    data: res.data
                };
            } else {
                history.push('/order/list');
            }
        } catch (error) {
            message.error('系统错误');
        } finally {
            setLoading(false);
        }
        return {
            success: false,
            data: {},
        };
    };
    /**
     * 支付订单
     */
    const payGoldCoinGoodsOrder = async () => {
        try {
            setDisabled(true);
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
            setDisabled(false);
        }
    };
    /**
     * 取消订单
     */
    const cancelGoldCoinGoodsOrder = async () => {
        // 取消订单
        try {
            setDisabled(true);
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
            setDisabled(false);
        }
    };
    /**
     * 删除订单
     */
    const deleteGoldCoinGoodsOrder = async () => {
        try {
            setLoading(true);
            const res = await deleteGoldCoinGoodsOrderUsingPOST({
                id: id
            })
            if (res.code === 0) {
                message.success("删除成功");
                history.push('/order/list');
            }
        } catch (e) {
            message.error('系统错误');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: '商品名称',
            key: 'name',
            dataIndex: 'name',
            valueType: 'text'
        },
        {
            title: '商品描述',
            key: 'description',
            dataIndex: 'description',
            valueType: 'text'
        },
        {
            title: '金币数量',
            key: 'number',
            dataIndex: 'number',
            valueType: 'digit'
        },
        {
            title: '订单号',
            key: 'outTradeNo',
            dataIndex: 'outTradeNo',
            valueType: 'text'
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
                0: {
                    text: '待支付',
                    status: 'Processing'
                },
                1: {
                    text: '已支付',
                    status: 'Success',
                },
                2: {
                    text: '已取消',
                    status: 'Default',
                },
            },
        },
        {
            title: '实付款',
            key: 'payAmount',
            dataIndex: 'payAmount',
            valueType: 'money',
            render: (_: React.ReactNode, entity: API.GoldCoinGoodsOrderVO) => {
                return `￥ ${entity.payAmount?.toFixed(2)}`;
            }
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            valueType: 'date',
            fieldProps: {
                format: 'YYYY-DD-MM hh:mm:ss',
            },
        },
        {
            title: '操作',
            valueType: 'option',
            render: (_: React.ReactNode, entity: API.GoldCoinGoodsOrderVO) => {
                if (entity.status === 0){
                    return [];
                }
                return [
                    <Button
                        key="delete"
                        danger={true}
                        onClick={deleteGoldCoinGoodsOrder}
                    >
                        删除
                    </Button>
                ];
            }
        },
    ];

    return (
        <PageContainer>
            <Card>
                <ProDescriptions
                    actionRef={actionRef}
                    title="订单信息"
                    request={loadData}
                    columns={columns}
                    loading={loading}
                >
                </ProDescriptions>
            </Card>
            <br/>
            {status === 0 ?
                <Card>
                    <Row
                        justify={"center"}
                        gutter={20}
                    >
                        <Col span={12}>
                            <Button
                                block={true}
                                disabled={disabled}
                                onClick={payGoldCoinGoodsOrder}
                            >
                                支付订单
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                block={true}
                                disabled={disabled}
                                onClick={cancelGoldCoinGoodsOrder}
                            >
                                取消订单
                            </Button>
                        </Col>
                    </Row>
                </Card> : <></>
            }
            <br/>
            <br/>
            <ProCard style={{marginTop: -20}} layout={"center"}>
                <span>
                    本商品为虚拟内容，购买后不支持<strong style={{color: "red"}}>退换</strong>。确认支付表示您已阅读并接受
                    <a target={"_blank"} href={""} rel="noreferrer">用户协议</a>，如付款成功后10分钟后未到账，请联系站长微信：
                    <Tooltip placement="bottom" title={<img src={WECHAT_QRCODE} alt="微信 code_nav" width="120"/>}>
                        <a>ChaoticDuck</a>
                    </Tooltip>
                </span>
            </ProCard>
        </PageContainer>
    );
};

export default Index;
