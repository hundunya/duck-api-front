import '@umijs/max';
import React from 'react';
import {GithubOutlined, WechatOutlined} from "@ant-design/icons";
import {Col, Layout, Row, Tooltip} from "antd";
import {WECHAT_QRCODE} from "@/constants";

const Footer: React.FC = () => {
    const defaultMessage = '滴滴鸭工作室出品';
    const currentYear = new Date().getFullYear();
    return (
        <Layout.Footer>
            <Row
                justify={"center"}
                gutter={20}
            >
                <Col>
                    <a
                        target={'_blank'}
                        href={"https://github.com/hundunya/duck-api-backend"}
                        rel="noreferrer"
                    >
                        <GithubOutlined/>
                        &nbsp;支持项目
                    </a>
                </Col>
                <Col>
                    <Tooltip
                        placement="bottom"
                        title={
                            <img src={WECHAT_QRCODE} alt="微信 code_nav" width="120"/>
                        }
                    >
                        <a>
                            <WechatOutlined />
                            &nbsp;ChaoticDuck
                        </a>
                    </Tooltip>
                </Col>
            </Row>
            <br/>
            <Row justify={"center"}>
                <Col>
                    &copy;{`${currentYear} ${defaultMessage} | `}
                    <a target={'_blank'} href={"https://beian.miit.gov.cn/"} rel="noreferrer">蜀ICP备2022013582号-1</a>
                </Col>
            </Row>
        </Layout.Footer>
    );
};
export default Footer;
