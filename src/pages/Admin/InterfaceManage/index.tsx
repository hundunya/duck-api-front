import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {FooterToolbar, PageContainer, ProDescriptions, ProTable,} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Col, Drawer, message, Row} from 'antd';
import React, {useRef, useState} from 'react';
import UpdateForm from './components/UpdateForm';
import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfoByIdsUsingPOST,
  deleteInterfaceInfoUsingPOST,
  listInterfaceInfoVoByPageUsingPOST,
  offlineInterfaceUsingPOST,
  onlineInterfaceUsingPOST,
  updateInterfaceInfoUsingPOST
} from "@/services/duckapi-backend/interfaceInfoController";
import CreateForm from "@/pages/Admin/InterfaceManage/components/CreateForm";
import ReactJson from "react-json-view";

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
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoVO>();
  const [ids, setIds] = useState<number[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param value
   */
  const handleAdd = async (value: API.InterfaceInfoVO) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addInterfaceInfoUsingPOST(value);
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
  const handleUpdate = async (value: API.InterfaceInfoVO, id: number | undefined) => {
    const hide = message.loading('Configuring');
    value.id = id;
    try {
      const res = await updateInterfaceInfoUsingPOST(value);
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
  const handleDelete = async (selectedRow: API.InterfaceInfoVO) => {
    const hide = message.loading('正在删除');
    try {
      const res = await deleteInterfaceInfoUsingPOST({id: selectedRow?.id})
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
      const res = await deleteInterfaceInfoByIdsUsingPOST(ids);
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
   *  发布接口
   * @zh-CN 发布接口
   *
   * @param id
   */
  const handleOnlineInterface = async (id: number | undefined) => {
    const hide = message.loading('正在发布');
    if (!id) {
      message.error('接口不存在，发布失败');
      return false;
    }
    try {
      const res = await onlineInterfaceUsingPOST({id: id})
      const success = res.data;
      if (success) {
        hide();
        return true;
      }
      hide();
      return false;
    } catch (error) {
      hide();
      message.error('发布失败');
      return false;
    }
  };

  /**
   *  下线接口
   * @zh-CN 下线接口
   *
   * @param id
   */
  const handleOfflineInterface = async (id: number | undefined) => {
    const hide = message.loading('正在关闭');
    if (!id) {
      message.error('接口不存在，关闭失败');
      return false;
    }
    try {
      const res = await offlineInterfaceUsingPOST({id: id})
      const success = res.data;
      if (success) {
        hide();
        return true;
      }
      hide();
      return false;
    } catch (error) {
      hide();
      message.error('关闭失败');
      return false;
    }
  };

  const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'index',
      align: "center"
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      align: "center"
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: 'textarea',
      align: "center"
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'textarea',
      align: "center"
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'select',
      valueEnum: {
        GET: 'GET',
        POST: 'POST'
      },
      align: "center"
    },
    {
      title: '单价',
      dataIndex: 'price',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <>
            ￥{record.price}
          </>
        );
      },
      align: "center"
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'textarea',
      render: (_, record) => {
        return (
          <>
            <ReactJson
              name={false}
              src={JSON.parse(record.requestHeader as string)}
              displayDataTypes={false}
              collapsed={true}
              enableClipboard={false}
            />
          </>
        );
      },
      align: "center"
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'textarea',
      render: (_, record) => {
        return (
          <>
            <ReactJson
              name={false}
              // src={JSON.parse('{"name": "滴滴鸭"}')}
              src={JSON.parse(record.responseHeader as string)}
              displayDataTypes={false}
              collapsed={true}
              enableClipboard={false}
            />
          </>
        );
      },
      align: "center"
    },
    {
      title: '请求参数',
      dataIndex: 'requestParam',
      valueType: 'textarea',
      render: (_, record) => {
        return (
          <>
            <ReactJson
              name={false}
              // src={JSON.parse('{"name": "滴滴鸭"}')}
              src={JSON.parse(record.requestParam as string)}
              displayDataTypes={false}
              collapsed={true}
              enableClipboard={false}
            />
          </>
        );
      },
      align: "center"
    },
    {
      title: '响应参数',
      dataIndex: 'responseParam',
      valueType: 'textarea',
      render: (_, record) => {
        return (
          <>
            <ReactJson
              name={false}
              // src={JSON.parse('{"name": "滴滴鸭"}')}
              src={JSON.parse(record.responseParam as string)}
              displayDataTypes={false}
              collapsed={true}
              enableClipboard={false}
            />
          </>
        );
      },
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
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
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
            {record.status === 0 ? <a
                key="online"
                onClick={async () => {
                  const success = await handleOnlineInterface(record.id)
                  if (success) {
                    actionRef.current?.reload?.();
                  }
                }}
              >
                发布
              </a> :
              <a
                key="offline"
                onClick={async () => {
                  const success = await handleOfflineInterface(record.id)
                  if (success) {
                    actionRef.current?.reload?.();
                  }
                }}
              >
                下线
              </a>}
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
      <ProTable<API.InterfaceInfoVO, API.PageParams>
        headerTitle={'接口管理'}
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
          const res = await listInterfaceInfoVoByPageUsingPOST({
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
          <ProDescriptions<API.InterfaceInfoVO>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.InterfaceInfoVO>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;
