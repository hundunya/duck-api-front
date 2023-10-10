import {PageContainer, ProCard} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {
    listInterfaceInfoVoByNameOrDescriptionUsingPOST,
    listInterfaceInfoVoByPageUsingPOST
} from "@/services/duckapi-backend/interfaceInfoController";
import {Badge, Button, Image, Input, List, message, Space, Spin} from "antd";
import {history} from "umi";
import {LOGO} from "@/constants";

const Index: React.FC = () => {
    const [dataSource, setDataSource] = useState<API.InterfaceInfoVO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);
    const [value, setValue] = useState<string>("");

    /**
     * 加载数据
     */
    const loadData = async () => {
        setLoading(true);
        try {
            const res = await listInterfaceInfoVoByPageUsingPOST(
                {
                    current: current,
                    pageSize: pageSize,
                    status: 1
                }
            );
            if (res.code === 0) {
                setDataSource(res?.data?.records ?? []);
                setTotal(res?.data?.total ?? 0);
            }
        } catch (error) {
            message.error('系统错误');
        } finally {
            setLoading(false);
        }
    };
    /**
     * 查询接口信息
     */
    const query = async () => {
        try {
            setLoading(true);
            const res = await listInterfaceInfoVoByNameOrDescriptionUsingPOST({
                name: value,
                description: value,
                current: current,
                pageSize: pageSize
            });
            if (res.code === 0) {
                setDataSource(res?.data?.records ?? []);
                setTotal(res?.data?.total ?? 0);
            }
        } catch (e) {
            message.error('系统错误');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [current, pageSize]);

    return (
        <PageContainer>
            <ProCard
                style={{
                    height: 120
                }}
                layout="center"
                hoverable
            >
                <Space.Compact>
                    <Input
                        placeholder={"未找到心仪的接口？试试搜索吧"}
                        style={{
                            width: 480,
                            height: 40
                        }}
                        onChange={(event) => {
                            setValue(event.target.value ?? "");
                        }}
                    />
                    <Button
                        type={"primary"}
                        style={{
                            width: 75,
                            height: 40
                        }}
                        onClick={query}
                    >
                        搜索
                    </Button>
                </Space.Compact>
            </ProCard>
            <br/>
            <Spin spinning={loading}>
                <List
                    pagination={{
                        current: current,
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: [5, 10, 15, 20],
                        total: total,
                        onChange: async (current, pageSize) => {
                            setCurrent(current);
                            setPageSize(pageSize);
                        },
                    }}
                    grid={{
                        gutter: 20,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 4,
                        xl: 5,
                        xxl: 6
                    }}
                    dataSource={dataSource}
                    renderItem={(item, index) => (
                        <List.Item>
                            <ProCard
                                key={index}
                                bordered
                                hoverable
                                direction="column"
                                style={{height: 270}}
                            >
                                <ProCard
                                    layout="center"
                                    onClick={() => {
                                        history.push(`/interface/info?id=${item.id}`);
                                    }}
                                >
                                    <Badge
                                        count={item.totalNum}
                                        overflowCount={999999999}
                                        color='#eb4d4b'
                                    >
                                        <Image
                                            style={{
                                                width: 80,
                                                borderRadius: 8,
                                                marginLeft: 10
                                            }}
                                            src={LOGO}
                                            fallback={LOGO}
                                            alt={item.name}
                                            preview={false}
                                        />
                                        {/*<Image style={{width: 80, borderRadius: 8, marginLeft: 10}}*/}
                                        {/*       // src={item?.avatarUrl ?? "https://img.qimuu.icu/typory/logo.gif"}*/}
                                        {/*       // src={"https://img.qimuu.icu/typory/logo.gif"}*/}
                                        {/*       // fallback={"https://img.qimuu.icu/typory/logo.gif"}*/}
                                        {/*       // alt={item.name}*/}
                                        {/*       // preview={false}*/}
                                        {/*/>*/}
                                    </Badge>
                                </ProCard>
                                <ProCard
                                    onClick={() => {
                                        history.push(`/interface/info?id=${item.id}`)
                                    }}
                                    layout="center"
                                    style={{
                                        marginTop: -10,
                                        fontSize: 16
                                    }}
                                >
                                    {item.name}
                                </ProCard>
                                <ProCard
                                    onClick={() => {
                                        history.push(`/interface/info?id=${item.id}`)
                                    }}
                                    layout="center"
                                    style={{
                                        marginTop: -18,
                                        fontSize: 14
                                    }}
                                >
                                    {!item.description ? "暂无接口描述" : item.description.length > 15 ? item.description.slice(0, 15) + '...' : item.description}
                                </ProCard>
                            </ProCard>
                        </List.Item>
                    )}
                />
            </Spin>
        </PageContainer>
    );
};

export default Index;
