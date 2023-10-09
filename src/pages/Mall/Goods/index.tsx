import {Button, Card, Col, Divider, message, Row} from 'antd';
import React, {useEffect, useState} from "react";
import {CheckCard, PageContainer} from "@ant-design/pro-components";
import PurseIcon from "@/components/Icon/PurseIcon";
import GoldCoinIcon from "@/components/Icon/GoldCoinIcon";
import {useModel} from "@@/exports";
import {listGoldCoinGoodsVoByPageUsingPOST} from "@/services/duckapi-backend/goldCoinGoodsController";
import {history} from "umi";
import {createGoldCoinGoodsOrderUsingPOST} from "@/services/duckapi-backend/goldCoinGoodsOrderController";

const Mall: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const [totalAmount, setTotalAmount] = useState<number>();
  const [goldCoinGoodsId, setGoldCoinGoodsId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [goldCoinGoodsList, setGoldCoinGoodsList] = useState<Array<API.GoldCoinGoods>>([]);

  /**
   * 获取金币商品列表
   */
  const getGoldCoinGoodsList = async () => {
    try {
      const res = await listGoldCoinGoodsVoByPageUsingPOST({});
      if (res.data) {
        setGoldCoinGoodsList(res.data.records ?? []);
      }
    } catch (e) {
      console.log("===================================")
      console.log(e)
      console.log("===================================")
    }
  }

  /**
   * 创建订单
   * @param id
   */
  const createGoldCoinGoodsOrder = async (id: number) => {
    if (id <= 0) {
      message.error("商品不存在或已经下架");
      return;
    }
    const hide = message.loading("订单创建中")
    try {
      const res = await createGoldCoinGoodsOrderUsingPOST({
        goldCoinGoodsId: id
      });
      if (res.data) {
        hide();
        // 创建订单成功
        // 跳转页面
        history.push(
          '/pay',
          {
            qrCode: res.data.qrCode as string,
            outTradeNo: res.data.outTradeNo as string,
            totalAmount: res.data.totalAmount as number,
            redirect: history.location.pathname
          }
        )
      }
    } catch (e) {
      console.log("===================================")
      console.log(e)
      console.log("===================================")
    }
  }

  useEffect(() => {
    getGoldCoinGoodsList();
  }, []);

  return (
    <PageContainer>
      <Card>
        <Card title={"我的钱包"}>
          <Row>
            <Col
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              金币余额：{initialState?.loginUser?.goldCoinBalance}&nbsp;
              <GoldCoinIcon/>
            </Col>
          </Row>
        </Card>
        <br/>
        <Card
          title={(
            <div>
              金币商城&nbsp;
              <PurseIcon/>
            </div>
          )}
        >
          <CheckCard.Group
            onChange={(value) => {
              // alert(value)
              if (value === undefined) {
                setTotalAmount(undefined);
                setGoldCoinGoodsId(undefined);
              } else {
                const index = (value as number);
                setGoldCoinGoodsId(goldCoinGoodsList[index].id);
                setTotalAmount(goldCoinGoodsList[index].price);
              }
            }}
          >
            {goldCoinGoodsList.map((item, index) => {
              return (
                <>
                  <CheckCard
                    key={item.id}
                    style={{
                      width: 220,
                      height: 330
                    }}
                    title={(
                      <strong>
                        <PurseIcon/>
                        &nbsp;{item.name}
                      </strong>
                    )}
                    description={(
                      <>
                        <Row>
                          <Col>
                            {item.description}
                          </Col>
                        </Row>
                        <Divider/>
                        <Row
                          align={"middle"}
                          justify={"center"}
                        >
                          <Col>
                            <GoldCoinIcon size={168}/>
                          </Col>
                        </Row>
                      </>
                    )}
                    value={index}
                    extra={(
                      <h3
                        style={{
                          color: 'red',
                          fontSize: 18
                        }}
                      >
                        ￥ {item.price}
                      </h3>
                    )}
                  />
                </>
              );
            })}
          </CheckCard.Group>
        </Card>
        <br/>
        <Card>
          <Row
            justify={"end"}
            gutter={20}
          >
            <Col
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'red'
              }}
            >
              ￥ {totalAmount?.toFixed(2) ?? "0.00"}
            </Col>
            <Col>
              <Button
                type={"primary"}
                loading={loading}
                disabled={goldCoinGoodsId === undefined}
                onClick={async () => {
                  if (goldCoinGoodsId === undefined){
                    message.error("请选择商品后支付");
                    return;
                  }
                  // 生成订单
                  setLoading(true);
                  await createGoldCoinGoodsOrder(goldCoinGoodsId);
                  setLoading(false);
                }}
              >
                支付
              </Button>
            </Col>
          </Row>
        </Card>
      </Card>
    </PageContainer>
  );
}

export default Mall;
