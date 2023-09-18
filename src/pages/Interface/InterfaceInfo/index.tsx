import {PageContainer} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {message} from "antd";
import InfoView from "@/pages/Interface/InterfaceInfo/components/info";
import PayView from "@/pages/Interface/InterfaceInfo/components/pay";
import {payOrderUsingPOST} from "@/services/duckapi-backend/alipayController";
import {useLocation} from "umi";

const Index: React.FC = () => {
  // 支付二维码
  const [qrCode, setQRCode] = useState<string>('https://qr.alipay.com/bax05107d7qzjuu9n2eu005c');
  const [showPay, setShowPay] = useState<boolean>(false);
  const [outTradeNo, setOutTradeNo] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0.00);
  const [success, setSuccess] = useState<boolean>(false);

  const location = useLocation();
  const interfaceId = location.search.replace("?id=","");

  /**
   * 购买接口调用次数
   */
  const purchaseInvokeCount = async (invokeCount: number) => {
    try {
      const res = await payOrderUsingPOST(
        {
          interfaceId: Number.parseInt(interfaceId),
          invokeCount: invokeCount
        }
      );
      if (res.data) {
        setQRCode(res?.data?.qrCode);
        setOutTradeNo(res?.data?.outTradeNo);
        setTotalAmount(res?.data?.totalAmount)
        // 展示支付页面
        setShowPay(true);
        return true;
      }
    } catch (error) {
      message.error('系统错误');
    }
    return false;
  };

  return (
    <PageContainer>
      <InfoView
        onFinish={purchaseInvokeCount}
        interfaceId={Number.parseInt(interfaceId)}
        // 页面会根据success的变化更新剩余调用次数
        paySuccess={success}
      />
      <PayView
        qrCode={qrCode}
        outTradeNo={outTradeNo}
        showPay={showPay}
        onOpenChange={setShowPay}
        totalAmount={totalAmount}
        getPayResult={setSuccess}
      />
    </PageContainer>
  );
};

export default Index;
