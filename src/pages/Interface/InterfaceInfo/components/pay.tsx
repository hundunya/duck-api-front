import React, {useEffect, useState} from 'react';
import {Button, Col, Divider, Image, message, QRCode, Result, Row, Space} from 'antd';
import {ModalForm, ProCard} from "@ant-design/pro-components";
import {CompatClient, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {ScanOutlined} from "@ant-design/icons";
import {ALIPAY_LOGO} from "@/constants";
import {cancelOrderUsingPOST} from "@/services/duckapi-backend/alipayController";

export type PayProps = {
  // 支付二维码
  qrCode: string;
  // 交易订单号
  outTradeNo: string;
  showPay: boolean;
  onOpenChange: (visible: boolean) => void;
  totalAmount: number;
  getPayResult: (success: boolean) => void;
};

const PayView: React.FC<PayProps> = (props) => {
  const { qrCode, outTradeNo, showPay, onOpenChange, totalAmount, getPayResult } = props;

  const [success, setSuccess] = useState(false);
  const [toPay, setToPay] = useState(false);

  let stompClient: CompatClient;

  useEffect(() => {
    if (showPay) {
      setSuccess(false);
      setToPay(true);
      // 订阅支付结果
      const socket = new SockJS(process.env.NODE_ENV === "production" ? "https://duck-api-backend.hundunya.cn/api/duck/api": "http://localhost:8101/api/duck/api");
      stompClient = Stomp.over(socket);
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
                  getPayResult(success);
                  setToPay(false);
                  // 2.取消订单支付结果订阅
                  stompClient.unsubscribe("/pay/" + outTradeNo);
                  // 3.断开连接
                  stompClient.disconnect();
                } else {
                  // 订单支付失败
                  setSuccess(false);
                }
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
      }
    }
  }, [showPay]);

  /**
   * 取消订单
   */
  const handleCancelOrder = async () => {
    try {
      const res = await cancelOrderUsingPOST({
        outTradeNo: outTradeNo
      });
      if (res?.data){
        console.log("取消订单成功");
      }
    } catch (e) {
      console.log(e);
      console.log("系统错误");
    }
  }

  return (
    <>
      <ModalForm
        open={showPay}
        onOpenChange={async (visible) => {
          if (toPay && !showPay){
            // 订单未支付并且是关闭窗口操作
            // 取消订单
            await handleCancelOrder();
          }
          onOpenChange(visible);
          if (!visible && stompClient) {
            // 取消订单支付结果订阅
            stompClient.unsubscribe("/pay/" + outTradeNo);
            // 断开连接
            stompClient.disconnect();
          }
          getPayResult(success);
        }}
        submitter={false}
        width={"320px"}
      >
        {success ?
          <Result
            status={success ? "success":"error"}
            title={success ? "支付成功！":"支付失败！"}
            extra={[
              <Button
                type="primary"
                key="close"
                onClick={() => {
                  onOpenChange(false);
                  getPayResult(success);
                }}
              >
                关闭
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
                ￥{ totalAmount.toFixed(2) }
              </div>
            </Row>
            <Row
              justify={"center"}
            >
              <QRCode value={qrCode}/>
            </Row>
            <Divider />
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
      </ModalForm>
    </>
  );
}

export default PayView;
