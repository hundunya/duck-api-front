import {Button, Card, Col, Image, message, QRCode, Result, Row, Space, Tooltip} from 'antd';
import React, {useEffect, useState} from "react";
import {PageContainer, ProCard} from "@ant-design/pro-components";
import {useLocation} from "@@/exports";
import {ALIPAY_LOGO, FIVE_MINUTES, WECHAT_QRCODE} from "@/constants";
import {ScanOutlined} from "@ant-design/icons";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {Timeout} from "ahooks/lib/useRequest/src/types";
import {history} from "umi";

const Mall: React.FC = () => {
    // 支付二维码
    const [qrCode, setQRCode] = useState<string>('https://qr.alipay.com/bax05107d7qzjuu9n2eu005c');
    const [totalAmount, setTotalAmount] = useState<number>(0.00);
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState<string>("");

    const location = useLocation();

    let timer: Timeout;

    // let stompClient: CompatClient;

    useEffect(() => {
        const state = location.state as { qrCode: string, outTradeNo: string, totalAmount: number, redirect: string };
        if (state) {
            setQRCode(state.qrCode);
            setTotalAmount(state.totalAmount);
            setRedirect(state.redirect);
            const outTradeNo = state.outTradeNo;

            // 订阅支付结果
            const socket = new SockJS(process.env.NODE_ENV === "production" ? "https://duck-api-backend.hundunya.cn/api/duck/api" : "http://localhost:8101/api/duck/api");
            const stompClient = Stomp.over(socket);
            if (stompClient) {
                stompClient.connect(
                    {},
                    () => {
                        console.log("===========connect success===========");
                        // 订阅订单支付消息
                        stompClient.subscribe(
                            "/pay/" + outTradeNo,
                            async (res) => {
                                // 1.获取支付结果
                                const msg: API.BaseResponseboolean = JSON.parse(res.body);
                                const success = msg.data;
                                if (success) {
                                    setSuccess(true);
                                    // 2.取消订单支付结果订阅
                                    stompClient.unsubscribe("/pay/" + outTradeNo);
                                    // 3.断开连接
                                    stompClient.disconnect();
                                } else {
                                    // 订单支付失败
                                    setSuccess(false);
                                }
                                clearInterval(timer);
                            },
                            {
                                id: "sub-pay-" + outTradeNo,
                            }
                        );
                    },
                    async (error: any) => {
                        console.log("error");
                        console.log(error);
                        message.error("系统错误")
                    }
                );

                // 5分钟后自动取消订阅
                if (!success) {
                    timer = setInterval(() => {
                        if (stompClient) {
                            // 1.取消订单支付结果订阅
                            stompClient.unsubscribe("/pay/" + outTradeNo);
                            // 2.断开连接
                            stompClient.disconnect();
                        }
                    }, FIVE_MINUTES);
                }
            }
        } else {
            history.push('/');
        }
    }, []);

    return (
        <PageContainer>
            <Card>
                {success ?
                    <Result
                        status={"success"}
                        title={"支付成功！"}
                        extra={[
                            <Button
                                type="primary"
                                key="close"
                                onClick={() => {
                                    history.push(redirect || '/');
                                }}
                            >
                                返回
                            </Button>,
                        ]}
                    /> :
                    <ProCard
                        headStyle={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}
                        headerBordered={true}
                        title={(
                            <Row
                                align={"middle"}
                            >
                                <Space>
                                    <div>
                                        <Image
                                            src={ALIPAY_LOGO}
                                            preview={false}
                                            width={"28px"}
                                        />
                                    </div>
                                    <div>
                                        支付宝扫码支付
                                    </div>
                                </Space>
                            </Row>
                        )}
                    >
                        <Row
                            justify={"center"}
                        >
                            <div
                                style={{
                                    fontSize: '28px'
                                }}
                            >
                                ￥{totalAmount.toFixed(2)}
                            </div>
                        </Row>
                        <Row
                            justify={"center"}
                        >
                            <QRCode value={qrCode}/>
                        </Row>
                        <br/>
                        <Row
                            justify={"center"}
                            align={"middle"}
                        >
                            <Space>
                                <Col>
                                    <ScanOutlined
                                        style={{
                                            color: '#1890ff',
                                            fontSize: '48px',
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Row
                                        style={{
                                            fontSize: '13px'
                                        }}
                                    >
                                        请使用支付宝扫一扫
                                    </Row>
                                    <Row
                                        style={{
                                            fontSize: '13px'
                                        }}
                                    >
                                        扫描二维码完成支付
                                    </Row>
                                </Col>
                            </Space>
                        </Row>
                    </ProCard>
                }
            </Card>
            <br/><br/>
            <ProCard style={{marginTop: -20}} layout={"center"}>
        <span>
          本商品为虚拟内容，购买后不支持
          <strong style={{color: "red"}}>退换</strong>。确认支付表示您已阅读并接受
          <a
              target={"_blank"}
              href={""}
              rel="noreferrer">
            用户协议
          </a>
          ，如付款成功后10分钟后未到账，请联系站长微信：
          <Tooltip placement="bottom" title={<img src={WECHAT_QRCODE} alt="微信 code_nav" width="120"/>}>
            <a>ChaoticDuck</a>
          </Tooltip>
            </span>
            </ProCard>
        </PageContainer>
    );
}

export default Mall;
