import React, {useEffect, useState} from 'react';
import {List, message, Row} from 'antd';
import {CopyOutlined} from "@ant-design/icons";
import {
  getAccessKeyUsingPOST,
  getSecretKeyUsingPOST,
  updateMyKeyUsingPOST
} from "@/services/duckapi-backend/userController";
import "./secretKey.less";

type Unpacked<T> = T extends (infer U)[] ? U : T;

const SecretKeyView: React.FC = () => {
    const [accessKey, setAccessKey] = useState<string>();
    const [secretKey, setSecretKey] = useState<string>("******");
    const [showSecretKey, setShowSecretKey] = useState<boolean>(false);

    /**
     * 获取accessKey
     */
    const getAccessKey = async () => {
        try {
            const res = await getAccessKeyUsingPOST();
            if (res?.data) {
                setAccessKey(res?.data);
            }
        } catch (error) {
            const defaultFailureMessage = '获取accessKey失败，请重试！';
            console.log(error);
            message.error(defaultFailureMessage);
        }
    }

    /**
     * 获取secretKey
     */
    const getSecretKey = async () => {
        try {
            const res = await getSecretKeyUsingPOST();
            if (res?.data) {
                setSecretKey(res?.data);
            }
        } catch (error) {
            const defaultFailureMessage = '获取secretKey失败，请重试！';
            console.log(error);
            message.error(defaultFailureMessage);
        }
    }

  /**
   * 更换密钥
   */
  const updateMyKey = async () => {
    try {
      const res = await updateMyKeyUsingPOST();
      if (res?.data) {
        await getAccessKey();
        if (showSecretKey){
          await getSecretKey();
        }
      }
    } catch (error) {
      const defaultFailureMessage = '获取secretKey失败，请重试！';
      console.log(error);
      message.error(defaultFailureMessage);
    }
  }

    useEffect(() => {
        getAccessKey();
    }, []);

    const getData = () => [
        {
            title: '查看密钥',
            description: (
                <>
                    <Row>
                        accessKey：{accessKey}
                        <CopyOutlined
                            onClick={() => {
                                navigator.clipboard.writeText(accessKey as string).then(async () => {
                                  message.success("复制成功");
                                },async () => {
                                  message.error("复制失败");
                                });
                            }}
                        />
                    </Row>
                    <Row>
                        secretKey：{secretKey}
                        {showSecretKey ? <CopyOutlined
                            onClick={() => {
                              navigator.clipboard.writeText(secretKey as string).then(async () => {
                                message.success("复制成功");
                              },async () => {
                                message.error("复制失败");
                              });
                            }}
                        /> : <></>}
                    </Row>
                </>
            ),
            actions: [
              <a
                key="view"
                onClick={async () => {
                  getSecretKey().then(() => {
                    setShowSecretKey(true);
                  })
                }}
              >
                查看
              </a>
            ],
        },
        {
            title: '更换密钥',
            actions: [
              <a
                key="replace"
                onClick={updateMyKey}
              >
                更换
              </a>
            ],
        },
    ];

    const data = getData();
    return (
        <>
            <List<Unpacked<typeof data>>
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item actions={item.actions}>
                        <List.Item.Meta title={item.title} description={item.description} />
                    </List.Item>
                )}
            />
        </>
    );
};

export default SecretKeyView;
