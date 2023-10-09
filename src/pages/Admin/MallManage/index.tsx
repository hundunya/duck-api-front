import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {FooterToolbar, PageContainer, ProDescriptions, ProTable,} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Col, Drawer, message, Row} from 'antd';
import React, {useRef, useState} from 'react';
import UpdateForm from './components/UpdateForm';
import {
  addGoldCoinGoodsUsingPOST,
  deleteGoldCoinGoodsByIdsUsingPOST,
  deleteGoldCoinGoodsUsingPOST,
  listGoldCoinGoodsVoByPageUsingPOST,
  updateGoldCoinGoodsUsingPOST
} from "@/services/duckapi-backend/goldCoinGoodsController";
import CreateForm from "@/pages/Admin/MallManage/components/CreateForm";

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.GoldCoinGoodsVO>();
  const [ids, setIds] = useState<number[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param value
   */
  const handleAdd = async (value: API.GoldCoinGoodsVO) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addGoldCoinGoodsUsingPOST(value);
      if (res.code === 0) {
        handleModalOpen(false);
        actionRef?.current?.reload?.();
        hide();
        message.success('添加成功');
        return true;
      }
      hide();
      return false;
    } catch (error) {
      hide();
      message.error('添加失败');
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param value
   * @param id
   */
  const handleUpdate = async (value: API.GoldCoinGoodsVO, id: number | undefined) => {
    const hide = message.loading('正在更新');
    value.id = id;
    try {
      const res = await updateGoldCoinGoodsUsingPOST(value);
      const success = res.data;
      if (success) {
        handleUpdateModalOpen(false);
        setCurrentRow(undefined);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        hide();
        message.success('更新成功');
        return true;
      }
      hide();
      return false;
    } catch (error) {
      hide();
      message.error('更新失败');
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除
   *
   * @param selectedRow
   */
  const handleDelete = async (selectedRow: API.GoldCoinGoodsVO) => {
    const hide = message.loading('正在删除');
    try {
      const res = await deleteGoldCoinGoodsUsingPOST({id: selectedRow?.id})
      const success = res.data;
      if (success) {
        hide();
        message.success('删除成功');
        return true;
      }
      hide();
      return false;
    } catch (error) {
      hide();
      message.error('删除失败');
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 批量删除
   *
   * @param ids
   */
  const handleBatchDelete = async (ids: number[]) => {
    const hide = message.loading('正在删除');
    if (!ids) return true;
    try {
      const res = await deleteGoldCoinGoodsByIdsUsingPOST(ids);
      const success = res.data;
      if (success) {
        hide();
        message.success('删除成功');
        return true;
      }
      hide();
      return false;
    } catch (error) {
      hide();
      message.error('删除失败');
      return false;
    }
  };

  const columns: ProColumns<API.GoldCoinGoodsVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'index',
      align: "center"
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      valueType: 'text',
      align: "center"
    },
    {
      title: '商品描述',
      dataIndex: 'description',
      valueType: 'textarea',
      align: "center"
    },
    {
      title: '金币数量',
      dataIndex: 'number',
      valueType: 'text',
      align: "center"
    },
    {
      title: '价格（元）',
      dataIndex: 'price',
      valueType: 'text',
      hideInSearch: true,
      align: "center"
    },
    {
      title: '创建者',
      dataIndex: 'createUser',
      valueType: 'text',
      hideInForm: true,
      align: "center"
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      align: "center"
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => (
        <Row
          justify={"center"}
        >
          <Col
            span={6}
          >
            <a
              key="update"
              onClick={() => {
                handleUpdateModalOpen(true);
                setCurrentRow(record);
              }}
            >
              修改
            </a>
          </Col>
          <Col span={1}/>
          <Col
            span={6}
          >
            <a
              key="delete"
              onClick={() => {
                handleDelete(record).then(success => {
                  if (success) {
                    actionRef?.current?.reload?.();
                  }
                })
              }}
            >
              删除
            </a>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <PageContainer
      className={"interface-info"}
    >
      <ProTable<API.GoldCoinGoodsVO, API.PageParams>
        headerTitle={'商品管理'}
        actionRef={actionRef}
        rowKey="id"
        scroll={{x: "max-content"}}
        loading={loading}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          defaultPageSize: 10
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={async (params) => {
          setLoading(true);
          const res = await listGoldCoinGoodsVoByPageUsingPOST({
            ...params
          })
          setLoading(false);
          if (res.data) {
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
        }}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          onChange: (key) => {
            const ids: number[] = key as number[];
            setIds(ids);
          },
        }}
        bordered={true}
      />
      {ids?.length > 0 && (
        <FooterToolbar>
          <Button
            onClick={async () => {
              const success = await handleBatchDelete(ids);
              setIds([]);
              if (success) {
                actionRef.current?.reloadAndRest?.();
              }
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

      <CreateForm
        onClose={() => {
          handleModalOpen(false);
        }}
        onSubmit={handleAdd}
        visible={createModalOpen}
      />
      <UpdateForm
        onSubmit={handleUpdate}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.GoldCoinGoodsVO>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.GoldCoinGoodsVO>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;
