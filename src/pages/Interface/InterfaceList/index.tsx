import {PageContainer, ProList} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {listInterfaceInfoVoByPageUsingPOST} from "@/services/duckapi-backend/interfaceInfoController";
import {message} from "antd";

const Index: React.FC = () => {
    const [dataSource, setDataSource] = useState<API.InterfaceInfoVO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    /**
     * 加载数据
     * @param current 当前页数
     * @param pageSize 每页条数
     */
    const loadData = async (current = 1, pageSize = 5) => {
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
                setCurrent(current);
                setTotal(res?.data?.total ?? 0);
            }
        } catch (error) {
            message.error('系统错误');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(current);
    }, [current]);

    return (
        <PageContainer>
            <ProList<API.InterfaceInfoVO>
                pagination={{
                    current: current,
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 15, 20],
                    total: total,
                    onChange: async (current, pageSize) => {
                        await loadData(current, pageSize);
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
                                href={`/interface-info?id=${record.id}`}
                                key={record.id}
                            >
                                {record.name}
                            </a>
                        )
                    },
                    description: {
                        dataIndex: 'description',
                    },
                    actions: {
                        render: (_, record) => [
                            <a
                                href={`/interface-info?id=${record.id}`}
                                key={record.id}
                            >
                                查看
                            </a>,
                        ],
                    },
                }}
            />
        </PageContainer>
    );
};

export default Index;
